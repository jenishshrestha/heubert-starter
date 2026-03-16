import { motion } from "motion/react";
import { HeubertLogo } from "./components/logos/HeubertLogo";
import { TechStack } from "./components/TechStack";

export function HomePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8 dark">
      <div className="container mx-auto max-w-7xl">
        {/* Heubert Logo and Text */}
        <div className="flex flex-col items-center mb-16">
          <div className="w-[200px] mb-6">
            <HeubertLogo />
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-foreground text-xl md:text-2xl font-light tracking-wide text-center"
          >
            The React + AI Stack for 2026
          </motion.h1>
        </div>

        {/* Tech Stack Grid */}
        <TechStack />
      </div>
    </div>
  );
}
