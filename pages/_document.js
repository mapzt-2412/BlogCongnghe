import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head >
            <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0'/>
            <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}