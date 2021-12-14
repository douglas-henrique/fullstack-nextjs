import Document, { Html, Head, NextScript, Main } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700;900&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <div id="modal-element" />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
