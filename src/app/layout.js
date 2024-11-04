import localFont from "next/font/local";
import "./globals.css";
import { Bebas_Neue, Cinzel, Lora, Open_Sans } from "next/font/google";


const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});

const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

const openSans = Open_Sans({
	weights: [400, 700],
	subsets: ["latin"],
});

const cinzel = Cinzel({
	weights: [400, 700],
	subsets: ["latin"],
});

const lora = Lora({
	weights: [400, 700],
	subsets: ["latin"],
});


export const metadata = {
	title: "Goatseus Maximus",
	description: "Goatseus Maximus on Ethereum",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={`${openSans.className} ${lora.className} antialiased`}
			>
				<div className={cinzel.className}>
						{children}
				</div>
			</body>
		</html>
	);
}
