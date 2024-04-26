import type { Metadata } from "next";
import localFont from 'next/font/local'
import { Plus_Jakarta_Sans } from 'next/font/google'
import "./globals.css";
import SessionWrapper from "@/components/wrappers/SessionWrapper";
import QueryProviders from "@/components/wrappers/QueryProviders";
import { ThemeProvider } from "@/components/wrappers/ThemeProvider";
import BottomNavigation from "@/components/BottomNavigation";
import TopNavigation from "@/components/TopNavigation";

const jakarta = Plus_Jakarta_Sans({
    weight: "variable",
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: "SENDAI - Jujutsu Gambling Addicts",
    description: "This is a fantasy stock market simulator where you can cope throughout your investments.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
            <body className={jakarta.className + " text-white bg-zinc-900 tracking-[-0.04px] flex flex-col h-svh select-none"}>
                <SessionWrapper>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        disableTransitionOnChange>
                        <QueryProviders>
                            <TopNavigation />
                            <main className="flex flex-1 h-full w-full items-center justify-center overflow-scroll">
                                {children}
                            </main>
                            <BottomNavigation />
                        </QueryProviders>
                    </ThemeProvider>
                </SessionWrapper>
            </body>
        </html>
    );
}
