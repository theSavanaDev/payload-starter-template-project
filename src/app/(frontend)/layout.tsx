import { ReactNode } from "react";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";

import { ThemeProvider } from "@/components/theme-provider";

import "@/frontend/global.css";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={cn("flex h-screen flex-col font-sans antialiased", fontSans.variable)}>
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
					<header>Header Goes Here</header>

					<main>{children}</main>

					<footer className="mt-auto">Footer Goes Here</footer>
				</ThemeProvider>
			</body>
		</html>
	);
}
