import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

export const metadata: Metadata = {
  title: 'Glance | HTML Template | Home Page 01',
  description: 'Glance e-commerce template'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <link
          rel='shortcut icon'
          href='/images/favicon.png'
          type='image/x-icon'
        />
        <link rel='icon' href='/images/favicon.png' type='image/x-icon' />
        <link href='css/all.min.css' rel='stylesheet' />
        <link href='css/bootstrap.min.css' rel='stylesheet' />
        <link href='css/slick.css' rel='stylesheet' />
        <link href='css/slick-theme.css' rel='stylesheet' />
        <link href='css/swiper-bundle.min.css' rel='stylesheet' />
        <link href='css/style.css' rel='stylesheet' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
        />
      </head>
      <body>
        <div className='page-wrapper home1'>{children}</div>
      </body>
    </html>
  );
}
