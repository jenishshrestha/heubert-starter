import { motion } from "motion/react";

interface TechLogoProps {
  icon: React.ReactNode;
  name: string;
  delay?: number;
}

export function TechLogo({ icon, name, delay = 0 }: TechLogoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.05 }}
      className="flex flex-col items-center justify-center gap-2 relative group"
      role="img"
      aria-label={name}
      tabIndex={0}
    >
      <div className="w-20 h-20 flex items-center justify-center">{icon}</div>
      <motion.span
        initial={{ opacity: 0, y: -5 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="text-white text-sm font-medium absolute -bottom-6 whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity"
      >
        {name}
      </motion.span>
    </motion.div>
  );
}
