// FancyStaggeredText.js
import { motion } from 'framer-motion';


export default function FancyStaggeredText({ text }) {
  const letters = text.split("");

  // Container animation variant with stagger effect
  const containerVariants = {
    initial: { opacity: 1 },
    animate: {
      transition: {
        staggerChildren: 0.08, // Adjust for faster or slower stagger
      },
    },
  };

  // Letter animation variant with color cycling workaround
  const letterVariants = {
    initial: { opacity: 0, y: 50, scale: 0.8, rotate: -10 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1.2,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 20,
        duration: 0.8,
        ease: "easeInOut",
      },
    },
    colorCycle: {
      color: ["#FF006E", "#8338EC", "#3A86FF", "#FB5607", "#FFBE0B"],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="flex space-x-1" // Adjust spacing if needed
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          initial="initial"
          animate={["animate", "colorCycle"]}
          style={{ display: "inline-block" }}
          className="text-4xl font-extrabold"
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
}
