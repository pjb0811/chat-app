import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { SheetsRegistry } from 'jss';

type Props = {
  pageContext: {
    sheetsRegistry: SheetsRegistry;
  };
};

export default class CustomDocument extends Document<Props> {
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
