import { ReactNode } from "react";
import { Comfortaa as FontHeader, Montserrat as FontBody } from "next/font/google";

import { cn } from "@/lib/utils";

import { ThemeProvider } from "@/components/theme-provider";

import "@/frontend/global.css";

const fontHeader = FontHeader({ subsets: ["latin"], variable: "--font-header" });
const fontBody = FontBody({ subsets: ["latin"], variable: "--font-body" });

const RootLayout = ({ children }: { children: ReactNode }) => {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={cn("font-body flex h-screen flex-col antialiased", fontHeader.variable, fontBody.variable)}>
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
					<header>Header Goes Here</header>

					<main>{children}</main>

					<footer className="mt-auto">Footer Goes Here</footer>
				</ThemeProvider>
			</body>
		</html>
	);
};

export default RootLayout;
