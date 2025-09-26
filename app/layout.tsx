import Navbar from '@/component/nav';
import Script from 'next/script';
import {UserProvider} from "./context/UserContext"

export const metadata = {
  title: 'DealHunter',
  description: 'best deals in one pleace.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossOrigin="anonymous"
        />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.0/css/all.min.css"
          integrity="sha512-papNMv4+1RkVQmMRsYf4WrUuQThzXKrrfKgj3+I2IYRB7hv1qRkCeOs5OaZL9L+2kZjIR+YBlY+lYUc+QtLJ3Q=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

 {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GGKS5P4XYX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GGKS5P4XYX');
          `}
        </Script>
      </head>
      <body>
         <UserProvider>
        <header>
            <Navbar/>
        </header>
        {children}

        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-MrcW6ZMFYk8+zMdS8nwwj3LrZ4U5Fh2yFZnt0W3aZlI5UOzP+I1lwLZEOslYg+eZ"
          crossOrigin="anonymous"
        />

      </UserProvider>
      </body>
    </html>
  );
}
