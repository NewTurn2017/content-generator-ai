import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ClientProviders } from './prividers/ClientProviders'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Best AI Test Platform',
  description:
    'My Best AI Test Platform is a platform that allows you to test your AI models.',
  icons: {
    icon: [
      {
        url: '/logo.svg',
        href: '/logo.svg',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <ClientProviders>
        <html lang='en'>
          <body className={inter.className}>{children}</body>
        </html>
      </ClientProviders>
    </ClerkProvider>
  )
}
