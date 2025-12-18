import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
			>
				<main className="flex-1">{children}</main>
				<Toaster position="top-center" expand={true} closeButton />
			</body>
		</html>
	);
}
