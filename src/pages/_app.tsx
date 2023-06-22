import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import Layout from '@/components/layout/Layout'

import { Raleway, Roboto } from 'next/font/google'
 
// If loading a variable font, you don't need to specify the font weight
const raleway = Raleway({ subsets: ['latin'] })
const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export default function App({ Component, pageProps }: AppProps) {


  return (
    <SessionProvider session={pageProps.session}>
      
      <Layout font={raleway}>
      <style jsx global>{`
        h1,h2,h3,h4,h5,h6 {
          font-family: ${roboto.style.fontFamily};
        }
        p {
          font-family: ${raleway.style.fontFamily};
        }
      `}</style>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )

}
