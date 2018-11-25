import React from 'react';
import App, { Container, DefaultAppIProps, AppProps } from 'next/app';
import { Provider } from 'mobx-react';
import { initStore } from '../mobx/Store';
import getPageContext from '../lib/getPageContext';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import { DragDropContext, HTML5Backend } from 'react-dnd-component';
import { SheetsRegistry, GenerateClassName } from 'jss';
import { Theme } from '@material-ui/core';
import 'babel-polyfill';

type PageContext = {
  theme: Theme;
  sheetsManager: Map<any, any>;
  sheetsRegistry: SheetsRegistry;
  generateClassName: GenerateClassName<any>;
};

/**
 * 앱 전체 페이지 설정 컴포넌트
 * @desc mobx 설정
 * @desc material-ui 설정
 * @desc react-dnd 관련 컨텍스트 설정
 * @desc IE 지원을 위한 babel-polyfill 설정
 * @class CustomApp
 * @extends {(App<DefaultAppIProps & AppProps<Record<string, string | string[] | undefined>>>)}
 */
class CustomApp extends App<
  DefaultAppIProps & AppProps<Record<string, string | string[] | undefined>>
  > {
  static async getInitialProps(params: { Component: any; ctx: {} }) {
    const { Component, ctx } = params;

    return {
      pageProps: {
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : null)
      }
    };
  }

  store: {};
  pageContext: PageContext;

  /**
   * 커스텀앱 인스턴스 설정
   * @param {(DefaultAppIProps & AppProps<Record<string, string | string[] | undefined>>)} props
   * @desc mobx 스토어 및 material-ui 컨텍스트 초기화
   */
  constructor(
    props: DefaultAppIProps &
    AppProps<Record<string, string | string[] | undefined>>
  ) {
    super(props);
    this.store = initStore(this.props.pageProps);
    this.pageContext = getPageContext() as PageContext;
  }

  /**
   * 컴포넌트 마운트 이후
   * @desc material-ui 서버 사이드 렌더링 관련 요소가 있을 경우 스타일 요소 제거
   */
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  /**
   * 렌더링
   * @desc mobx 및 material-ui, react-dnd provider 설정
   * @returns {Component}
   */
  render() {
    const { Component, pageProps, router } = this.props;

    return (
      <Container>
        <Provider {...this.store}>
          <JssProvider
            registry={this.pageContext.sheetsRegistry}
            generateClassName={this.pageContext.generateClassName}
          >
            <MuiThemeProvider
              theme={this.pageContext.theme}
              sheetsManager={this.pageContext.sheetsManager}
            >
              <CssBaseline />
              <Component
                pageContext={this.pageContext}
                {...pageProps}
                router={{ ...router }}
              />
            </MuiThemeProvider>
          </JssProvider>
        </Provider>
      </Container>
    );
  }
}

export default DragDropContext(HTML5Backend)(CustomApp);
