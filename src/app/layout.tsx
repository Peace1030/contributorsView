import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";

const inter = Open_Sans({ subsets: ["greek"] });

export const metadata: Metadata = {
	title: "Pro Dev App",
	description: "Top contributors in Github",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${inter.className}`}
				style={{ backgroundColor: "#F7F7F7", padding: "35px" }}>
				<ChakraProvider>{children}</ChakraProvider>
			</body>
		</html>
	);
}
