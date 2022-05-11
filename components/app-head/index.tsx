import React from 'react'
import Head from 'next/head'
import Script from 'next/script'

const AppHead: React.FC<{
  title?: string
  description?: string
}> = ({ title, description }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={description || process.env.NEXT_PUBLIC_SITE_DESCRIPTION}
        />
      </Head>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
                `}
      </Script>
    </>
  )
}

export default AppHead
