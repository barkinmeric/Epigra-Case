import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Rick and Morty Characters",
	description: "Rick and Morty Characters",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<nav className="m-8 flex justify-center">
					<Link href="/characters" className="text-center text-4xl font-bold">
						Rick and Morty Characters
					</Link>
				</nav>
				{children}
			</body>
		</html>
	);
}
