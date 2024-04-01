import type { Metadata } from "next";
import { Flex } from "@chakra-ui/react";
import { Header } from "./Header";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Header />
			{children}
		</>
	);
}
