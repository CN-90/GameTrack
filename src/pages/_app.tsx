import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import Layout from '@/components/layout/Layout'

import { Raleway, Roboto } from 'next/font/google'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
 
// If loading a variable font, you don't need to specify the font weight
// const raleway = Raleway({ subsets: ['latin'] })
// const roboto = Roboto({
//   weight: ['400', '500', '700'],
//   style: ['normal', 'italic'],
//   subsets: ['latin'],
//   display: 'swap',
// })

export default function App({ Component, pageProps }: AppProps) {


  return (
    <SessionProvider session={pageProps.session}>
      
      <Layout>
     
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )

}
