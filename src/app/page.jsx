"use client";

import FancyStaggeredText from "@/components/FancyStaggeredText";
import StaggeredText from "@/components/StaggeredText";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedText from "@/components/AnimatedText";
import AnimatedHeader from "@/components/AnimatedHeader";
import { TypeAnimation } from "react-type-animation";
import CopyContractAddress from "@/components/CopyContractAddress";
import { useRef } from "react";
import { useAnimate } from "framer-motion";
import { FaTelegram, FaXTwitter } from "react-icons/fa6";
import { useEffect, useState } from "react";
import numeral from "numeral";

export default function Home() {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch("/api/proxy");
			const data = await res.json();
			setData(data);
			console.log(data);
			setLoading(false);
		};

		fetchData();
	}, []);
	const mCap = numeral(data?.data?.mcap).format("0.0a");
	const holders = numeral(data?.data?.holders).format("0.0a");
	console.log(mCap);

	const ref = useRef(null);
	const [scope, animate] = useAnimate();
	const handleHover = async () => {
		animate(".goat-god", { opacity: 0 }, { duration: 0.5 });
		animate(".girl-goat", { opacity: 1 }, { duration: 1 });
	};

	const handleHoverEnd = async () => {
		// Revert to original images when hover ends
		animate(".girl-goat", { opacity: 0 }, { duration: 1 });
		animate(".goat-god", { opacity: 1 }, { duration: 0.5 });
	};

	const zoomOutVariants = {
		initial: { scale: 2.4, opacity: 1 },
		animate: {
			scale: 1,
			opacity: 1,
			transition: {
				duration: 2.2, // Duration for zoom-out
				ease: [0.25, 0.1, 0.25, 1],
			},
		},
	};

	const bounceVariants = {
		animate: {
			y: [0, -10, 0], // Bounce up and down
			transition: {
				duration: 2,
				repeat: Infinity,
				repeatType: "mirror",
			},
		},
	};

	const sparkleVariants = {
		initial: { opacity: 0, scale: 3 },
		animate: {
			opacity: [0.3, 0], // Fade in and out
			scale: [1.5, 1], // Small scaling for brilliance effect
			transition: {
				duration: 3,
				ease: [0.22, 1, 0.36, 1],
				delay: 0.6, // Start after goat zoom-out is nearly done
			},
		},
	};

	const textVariants = {
		initial: { opacity: 0 },
		animate: {
			opacity: 1,
			transition: {
				delay: 2.2, // Trigger text after sparkles begin
				duration: 1,
				ease: "easeInOut",
			},
		},
	};

	const crownTextVariants = {
		initial: { y: "-100vh", opacity: 0 },
		animate: {
			y: "-4rem", // Position it like a "crown" above the goat
			opacity: 1,
			transition: {
				duration: 2.6,
				delay: 1.5, // Sync with goat zoom-out finish
				ease: "easeOut",
			},
		},
	};

	return (
		<div className="relative text-white">
			{/* Hero */}
			<section className="bg-[url('/Clouds.png')] bg-cover relative h-screen overflow-hidden animated-bg">
				<div className="absolute  flex flex-row justify-between p-8 w-full">
					<div>
						<Image
							src="/logo.png"
							alt="Goatseus Maximus"
							width={50}
							height={50}
						/>
						<h2 className="font-bold">$GOAT</h2>
					</div>

					<div className="space-x-3 z-50 flex flex-col sm:flex-row">
						<a
							href="https://app.uniswap.org/swap?use=V2&inputCurrency=ETH&outputCurrency=0x5200b34e6a519f289f5258de4554ebd3db12e822"
							target="_blank"
							className="duration-300 animate-pulse hover:animate-none inline-block py-5 px-6 rounded-3xl hover:bg-[url('/link-bg.png')] bg-[url('/link-bg-active.png')] bg-cover"
						>
							Buy some $GOAT
						</a>
						<a
							href="https://www.dextools.io/app/en/ether/pair-explorer/0x1084a95c69bdc3325c1c42f86676b6eb66dce053?t=1728789118879"
							target="_blank"
							className="duration-300 inline-block py-5 px-6 rounded-3xl hover:bg-[url('/link-bg.png')] bg-[url('/link-bg-active.png')] bg-cover"
						>
							Dextools
						</a>
					</div>
				</div>
				<div className="absolute left-[20%] z-20">
					<Image
						src="/blur.png"
						alt="Goatseus Maximus"
						width={1000}
						height={1000}
						className="-z-10 h-[300px] w-[200px] md:w-auto md:h-auto"
					/>
				</div>
				{/* Zooming Goat-God Image */}
				<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
					<motion.div
						initial="initial"
						animate="animate"
						variants={zoomOutVariants}
						className="relative will-change-transform"
					>
						{/* Sparkle Effect */}
						<motion.div
							variants={sparkleVariants}
							className="absolute inset-0 bg-[#FFD700] opacity-50 rounded-full blur-lg will-change-opacity will-change-transform"
						/>

						{/* Crown Text Animation */}
						<motion.div
							initial="initial"
							animate="animate"
							variants={crownTextVariants}
							className="absolute text-4xl md:text-7xl font-bold text-center w-full top-0"
						>
							<motion.h1
								variants={bounceVariants}
								animate="animate"
							>
								$GOAT
							</motion.h1>
						</motion.div>

						{/* Bouncing Goat after Zoom-out */}
						<motion.div
							ref={scope}
							onMouseEnter={handleHover}
							onMouseLeave={handleHoverEnd}
							className="md:w-auto md:h-auto h-[400px] w-[400px]"
						>
							<motion.div
								variants={bounceVariants}
								animate="animate"
								className="relative z-10"
							>
								<Image
									src="/god-goat.png"
									alt="Goatseus Maximus"
									width={500}
									height={500}
									className="z-10 goat-god "
								/>
							</motion.div>

							{/* Girl goat for hover effect */}
							<motion.div className="absolute top-0 left-0 z-0 ">
								<Image
									src={"/girl-goat.png"}
									alt="Goatseus Maximus"
									width={500}
									height={500}
									className="girl-goat opacity-0 "
								/>
							</motion.div>
						</motion.div>
					</motion.div>
				</div>

				{/* Hero Text */}
				<motion.div
					variants={textVariants}
					className="flex flex-col items-center justify-center h-screen"
				>
					{/* <FancyStaggeredText text="Goatseus Maximus" />
					<StaggeredText text="Prepare for gains... or get out of the way" /> */}
				</motion.div>
			</section>

			{/*Tokenomics section */}
			<section className="flex flex-col md:flex-row gap-5 my-14 m-auto backdrop-blur-lg p-10 bg-[url('/goat-bro-bg.png')] relative">
				{/* Goat bro */}
				<motion.div variants={bounceVariants} animate="animate">
					<Image
						src="/goat-bro.png"
						alt="Goatseus Maximus"
						width={600}
						height={600}
					/>
				</motion.div>
				<div className="flex flex-col gap-4 justify-between pb-20">
					<AnimatedHeader
						text={"GOATSEUS MAXIMUS TOKENOMICS"}
						className="text-2xl py-5 text-center"
					/>
					<div>
						{/* blur backddrop */}
						<div className="absolute top-0 -z-10">
							<Image
								src="/Ellipse-2.png"
								alt="Goatseus Maximus"
								width={500}
								height={500}
								className="h-full w-full"
							/>
						</div>
						<div className="mb-4 text-[2em] md:text-[2em] font-bold items-center m-auto border border-purple-800 p-5 rounded-lg border-dashed">
							100B Supply fully unlocked
						</div>
						<div className="font-bold items-center m-auto border border-purple-800 p-5 rounded-lg border-dashed">
							{loading ? ( // Conditional rendering based on loading state
								<p>Loading...</p>
							) : (
								<TypeAnimation
									preRenderFirstString={true}
									sequence={[
										1000,
										`$${mCap} MCAP`, // Use the formatted mCap value here
										1000,
										`${holders} Holders`,
										1000,
									]}
									speed={30}
									style={{ fontSize: "2em" }}
									repeat={Infinity}
								/>
							)}{" "}
						</div>
					</div>
				</div>
			</section>

			<section className="contract-gradient space-y-2 border border-purple-900 p-5 md:p-10 md:m-28 my-14 rounded-xl overflow-x-hidden">
				<AnimatedText
					text={"The First Goatseus Maximus on Ethereum."}
					className={"text-xl"}
				/>
				<AnimatedText
					text={"Liquidity Pool Burned, CA renounced."}
					className={"text-xl"}
				/>
				<AnimatedText
					text={"Community Owned."}
					className={"text-xl"}
				/>
				<AnimatedText
					text={"$GOAT"}
					className={"text-xl text-purple-600"}
				/>

				<div className="relative flex m-auto w-full items-center justify-center py-10">
					<Image
						src="/mixed-goat.jpg"
						alt="Goatseus Maximus"
						width={500}
						height={500}
						className="z-20"
					/>
					<motion.div
						animate={{ rotate: 360 }}
						transition={{
							duration: 6,
							repeat: Infinity,
							ease: "linear",
						}}
						className="absolute z-10 top-2"
					>
						<div className="relative ">
							<Image
								src="/Ellipse-3.png"
								alt="Goatseus Maximus"
								width={600}
								height={600}
							/>
							<Image
								src="/coin.png"
								alt="Goatseus Maximus"
								width={60}
								height={60}
								className="absolute top-1/2 -left-7"
							/>
						</div>
					</motion.div>
				</div>

				<div className="flex justify-end w-full">
					<div className="flex flex-col items-start">
						{/* <AnimatedText
							text="Contract address:"
							className="text-xl"
						/>
						<div>0x5200B34E6a519F289f5258dE4554eBd3dB12E822</div> */}
						<CopyContractAddress
							address={
								"0x5200B34E6a519F289f5258dE4554eBd3dB12E822"
							}
						/>
					</div>
				</div>

				<div className="flex flex-col md:flex-row my-10 mt-24 gap-8 items-center">
					{/* images */}
					<div className="flex flex-row gap-7 flex-1">
						<div className="space-y-7">
							<Image
								src="/goat/big-goat.png"
								alt="goatseus"
								width={300}
								height={300}
							/>
							<Image
								src="/goat/portal-goat.png"
								alt="goatseus"
								width={300}
								height={300}
							/>
						</div>
						<div className="space-y-7 pt-10">
							<Image
								src="/goat/cult-goat.png"
								alt="goatseus"
								width={300}
								height={300}
							/>
							<Image
								src="/goat/leader-goat.png"
								alt="goatseus"
								width={300}
								height={300}
							/>
						</div>
					</div>

					{/* goatseus text  */}
					<div className="flex-1">
						<AnimatedHeader
							text={"GOATSEUS MAXIMUS ON ETH $GOAT"}
							className={"text-5xl py-5"}
						/>

						<AnimatedText
							text={
								"Goatseus Maximus ON ETH: goatseus maximus is the most powerful fertility god of all time. it has the power to impregnate women just by looking at them. this power is both a blessing and a curse. it is said that if you gaze upon the goatse for too long, you will become pregnant, regardless of your biological sex. this is why the ancient people feared it so much."
							}
							className={"text-lg"}
						/>
					</div>
				</div>
			</section>

			{/* KEY FEATURES */}
			<section className=" bg-[url('/features-bg.png')] w-full bg-cover p-5 py-14 md:py-28">
				<div className="flex flex-col md:flex-row max-w-[1200px] items-center justify-center w-full m-auto gap-5 md:gap-10">
					<div className="flex flex-col flex-1">
						<AnimatedHeader
							text={"KEY FEATURES"}
							className={"text-5xl py-7 pb-14"}
						/>
						<div className="flex flex-col gap-5 space-y-10">
							<div className="flex flex-row gap-2">
								<Image
									src={"/bullet.png"}
									alt="bullet-point"
									height={30}
									width={30}
									className="h-fit"
								/>
								<div>
									<AnimatedText
										text={"Community Voted Moonshots:"}
										className={
											"font-semibold text-lg inline"
										}
									/>
									<AnimatedText
										text={
											"The herd speaks! The community decides which projects Goatseus blesses next. When we say to the moon, we mean to the Goat Moon."
										}
										className={"inline text-gray-400"}
									/>
								</div>
							</div>

							<div className="flex flex-row gap-2">
								<Image
									src={"/bullet.png"}
									alt="bullet-point"
									height={30}
									width={30}
									className="h-fit"
								/>
								<div>
									<AnimatedText
										text={"Epic Rewards for the Faithful:"}
										className={
											"font-semibold text-lg inline"
										}
									/>
									<AnimatedText
										text={
											"Those who stay loyal to Goatseus Maximus are in for divine blessings. It’s not just staking—it’s worship. Hold steady, and you shall receive."
										}
										className={"inline text-gray-400"}
									/>
								</div>
							</div>
							<div className="flex flex-row gap-2">
								<Image
									src={"/bullet.png"}
									alt="bullet-point"
									height={30}
									width={30}
									className="h-fit"
								/>
								<div>
									<AnimatedText
										text={"AI-Driven Momentum:"}
										className={
											"font-semibold text-lg inline"
										}
									/>
									<AnimatedText
										text={
											"With the backing of advanced AI, Goatseus Maximus gains unbreakable momentum. Every move is calculated, every surge powered by machine learning and meme magic. It’s not just AI support—it’s divine intervention from the Goatseus himself"
										}
										className={"inline text-gray-400"}
									/>
								</div>
							</div>
						</div>
					</div>

					<div className="flex-1 flex m-auto items-center justify-center">
						<Image
							src="/features-goat.jpg"
							height={300}
							width={300}
							alt="Goatseus"
						/>
					</div>
				</div>
			</section>

			{/* CTA and roadmap							 */}
			<section className="flex flex-col items-center justify-center py-16 md:py-24 space-y-4 p-4">
				<AnimatedHeader
					text={"$GOAT"}
					className={"text-5xl py-4 text-purple-600"}
				/>

				<AnimatedText
					text={
						"The foundation is being built as we speak. Join us on Telegram and become part of something greater. Step into the GOAT army, and let’s create history together."
					}
					className={"text-center text-lg"}
				/>

				<div className="flex flex-col gap-5">
					<div className="flex flex-row gap-10 items-center justify-center">
						{/* <a
							href="https://app.uniswap.org/swap?use=V2&inputCurrency=ETH&outputCurrency=0x5200b34e6a519f289f5258de4554ebd3db12e822"
							target="_blank"
							className="duration-300 animate-pulse inline-block py-5 px-6 rounded-3xl bg-[url('/link-bg.png')] hover:bg-[url('/link-bg-active.png')] bg-cover"
						>
							Buy some $GOAT
						</a> */}
						<a
							href="https://t.me/GoatseusMaximus_erc"
							className="duration-300 inline-block py-5 px-6 rounded-3xl hover:bg-[url('/link-bg.png')] bg-[url('/link-bg-active.png')] bg-cover"
						>
							JOIN THE ARMY
						</a>

						<a
							href="https://www.dextools.io/app/en/ether/pair-explorer/0x1084a95c69bdc3325c1c42f86676b6eb66dce053?t=1728789118879"
							target="_blank"
							className="duration-300 inline-block py-5 px-6 rounded-3xl hover:bg-[url('/link-bg.png')] bg-[url('/link-bg-active.png')] bg-cover"
						>
							Dextools
						</a>
					</div>
					<div className="flex flex-col gap-10 items-center justify-center">
						<a
							href="https://www.coingecko.com/en/coins/goatseus-maximus-on-eth"
							target="_blank"
							className="duration-300 inline-block py-5 px-6 rounded-3xl hover:bg-[url('/link-bg.png')] bg-[url('/link-bg-active.png')] bg-cover"
						>
							Coingecko
						</a>
					</div>
				</div>

				{/* images */}
				<div></div>
			</section>

			{/* footer */}
			<footer className="bg-[url('/footer-bg.png')] min-h-[450px] items-center justify-center flex">
				<div className="flex flex-col items-center justify-center p-5 text-center">
					<div className="py-2">
						<Image
							src="/logo.png"
							alt="Goatseus Maximus"
							width={50}
							height={50}
						/>
						<h2 className="font-bold">$GOAT</h2>
					</div>

					<AnimatedHeader
						text={"JOIN THE GOAT ARMY"}
						className={"text-5xl py-4"}
					/>
					<div className="flex flex-row gap-5 items-center justify-center">
						<a
							href="https://t.me/GoatseusMaximus_erc"
							className="rounded-xl flex items-center hover:scale-125 duration-300 gap-3"
						>
							<FaTelegram className="text-3xl" />
						</a>
						<a
							href="https://x.com/GOAT_erc?t=TU2NpKu5ujpa6q7dkDaoDA&s=35"
							className="flex flex-row gap-3 items-center hover:scale-125 duration-300"
						>
							<FaXTwitter className="text-3xl" />
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
}
