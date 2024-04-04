import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import Layout from '@/components/layout/Layout'

import { Raleway, Roboto } from 'next/font/google'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
 
export default function App({ Component, pageProps }: AppProps) {


  return (
    <SessionProvider session={pageProps.session}>
      
      <Layout>
     
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )

}
