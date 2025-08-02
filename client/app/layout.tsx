import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/theme';
import StoreProvider from '@/app/StoreProvider';
import React from 'react';
import './globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto',
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`bg-gray-50/80 ${roboto.variable} antialiased mx-auto max-w-3xl`}>
                <AppRouterCacheProvider>
                    <ThemeProvider theme={theme}>
                        <StoreProvider>{children}</StoreProvider>
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
