import Document, { Head, Html, Main, NextScript } from 'next/document'

const GTAG_ID = process.env.NEXT_PUBLIC_GTAG_ID

class MyDocument extends Document {
  render() {
    // noinspection HtmlRequiredTitleElement
    return (
      <Html lang='en'>
        <Head>
          <link
            href='https://fonts.googleapis.com/css2?family=Inter&family=Lora&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <noscript>
            <iframe
              title='GTM'
              src={`https://www.googletagmanager.com/ns.html?id=${GTAG_ID}`}
              height='0'
              width='0'
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
