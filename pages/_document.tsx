import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { SheetsRegistry } from 'jss';

type Props = {
  pageContext: {
    sheetsRegistry: SheetsRegistry;
  };
};

/**
 * DOM 설정 관련 컴포넌트
 * @export
 * @class CustomDocument
 * @extends {Document<Props>}
 */
export default class CustomDocument extends Document<Props> {
  /**
   * props 초기 설정
   * @desc material-ui 컨텍스트 확인 후 props 초기화
   * @static
   * @param {{renderPage: (callback: (component: any) => any) => any;}} ctx
   * @returns
   */
  static async getInitialProps(ctx: {
  renderPage: (callback: (component: any) => any) => any;
  }) {
    let pageContext;
    const page = ctx.renderPage((Component: React.ComponentType) => {
      const WrappedComponent = (props: any) => {
        pageContext = props.pageContext;
        return <Component {...props} />;
      };
      return WrappedComponent;
    });

    return {
      ...page,
      pageContext
    };
  }

  /**
   * 렌더링
   * @desc meta 설정 및 style 설정
   * @returns {Component}
   */
  render() {
    const { pageContext } = this.props;

    return (
      <html>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          <style
            id="jss-server-side"
            dangerouslySetInnerHTML={{
              __html: pageContext.sheetsRegistry.toString()
            }}
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          <link href="/static/styles/index.css" rel="stylesheet" />
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="/static/favicon.ico"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
