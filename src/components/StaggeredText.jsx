// StaggeredText.js
import { motion } from 'framer-motion';

export default function StaggeredText({ text, className }) {
  // Split the text into an array of letters
  const letters = text.split("");

  // Animation Variants
  const containerVariants = {
    initial: { opacity: 1 },
    animate: {
      transition: {
        staggerChildren: 0.05, // Delay each letter by 0.05s
      },
    },
  };

  const letterVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 500, damping: 30 },
    },
  };

  return (
    <motion.div
      className={`flex space-x-1 ${className}`} // Adjust spacing as needed
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={letterVariants} className="text-4xl font-bold">
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
}
