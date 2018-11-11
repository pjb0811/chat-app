import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'mobx-react';
import { initStore } from '../mobx/Store';
import getPageContext from '../lib/getPageContext';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import { DragDropContext, HTML5Backend } from 'react-dnd-component';
// import { toJS } from 'mobx';

class CustomApp extends App {
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: {
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : null)
      }
    };
  }

  constructor(props) {
    super(props);
    this.store = initStore(this.props.pageProps);
    this.pageContext = getPageContext();
  }

  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

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
