// components/CopyContractAddress.js
"use client";

import { useState } from "react";
import { FiCopy, FiCheckCircle } from "react-icons/fi";
import AnimatedText from "./AnimatedHeader";

export default function CopyContractAddress({ address }) {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(address);
		setCopied(true);

		// Reset copied state after 2 seconds
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="flex flex-col p-4 md:p-6 border border-gray-300 rounded-lg w-full max-w-md mx-auto space-y-2 md:space-y-4">
			<div className="flex flex-col md:flex-row md:justify-between items-center space-y-2 md:space-y-0">
				<AnimatedText text={"Contract Address:"} className="text-base md:text-lg font-semibold uppercase" />
				
				<button
					onClick={handleCopy}
					className="flex items-center space-x-1 p-2 rounded hover:bg-gray-800 transition-all duration-200"
				>
					{copied ? (
						<FiCheckCircle className="text-purple-500 text-lg md:text-xl" />
					) : (
						<FiCopy className="text-gray-100 hover:text-gray-300 text-lg md:text-xl" />
					)}
					<span className="text-xs md:text-sm font-medium text-gray-100">
						{copied ? "Copied!" : "Copy"}
					</span>
				</button>
			</div>

			<div className="font-mono text-xs sm:text-sm md:text-base text-gray-100 mt-2 break-all">
				{address}
			</div>
		</div>
	);
}
