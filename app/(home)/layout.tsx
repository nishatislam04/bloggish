import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Footer } from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Bloggish - Modern Blogging Platform",
	description:
		"Discover amazing articles, stories, and insights on Bloggish. A modern blogging platform for sharing ideas with the world.",
	keywords: [
		"blog",
		"articles",
		"stories",
		"technology",
		"design",
		"business",
		"lifestyle",
	],
	authors: [{ name: "Bloggish Team" }],
	creator: "Bloggish",
	publisher: "Bloggish",
	formatDetection: {
		email: false,
		telephone: false,
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://bloggish.com",
		siteName: "Bloggish",
		title: "Bloggish - Modern Blogging Platform",
		description:
			"Discover amazing articles, stories, and insights on Bloggish.",
	},
	twitter: {
		card: "summary_large_image",
		title: "Bloggish - Modern Blogging Platform",
		description:
			"Discover amazing articles, stories, and insights on Bloggish.",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
			>
				<Header />
				<main className="flex-1">{children}</main>
				<Toaster position="top-center" expand={true} closeButton />
				<Footer />
			</body>
		</html>
	);
}
