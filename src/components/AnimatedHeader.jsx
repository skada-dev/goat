// components/AnimatedText.js
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const AnimatedText = ({ text, className }) => {
	const controls = useAnimation();
	const { ref, inView } = useInView({
		triggerOnce: false, // Allow repeat animations
		threshold: 0.1,
	});

	useEffect(() => {
		if (inView) {
			controls.start("visible");
		} else {
			controls.start("hidden"); // Reset animation when out of view
		}
	}, [controls, inView]);

	const wordVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: (i) => ({
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				delay: i * 0.15,
			},
		}),
	};

	return (
		<h2 ref={ref} className={`${className} text-animate`}>
			{text.split(" ").map((word, index) => (
				<motion.span
					key={index}
					custom={index}
					initial="hidden"
					animate={controls}
					variants={wordVariants}
					style={{ display: "inline-block", marginRight: "0.3em" }}
				>
					{word}
				</motion.span>
			))}
		</h2>
	);
};

export default AnimatedText;
