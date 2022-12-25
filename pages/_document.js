import Document, { Head, Html, Main, NextScript } from "next/document";

class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="robots" content="noindex" />
          <link
            href="/favicon/favicon-16x16.png"
            rel="icon"
            sizes="16x16"
            type="image/png"
          />
          <link
            href="/favicon/favicon-32x32.png"
            rel="icon"
            sizes="32x32"
            type="image/png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
