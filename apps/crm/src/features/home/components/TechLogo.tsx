import { motion } from "motion/react";
import { useState } from "react";

interface TechLogoProps {
	icon: React.ReactNode;
	name: string;
	delay?: number;
}

export function TechLogo({ icon, name, delay = 0 }: TechLogoProps) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, delay }}
			whileHover={{ scale: 1.05 }}
			onHoverStart={() => setIsHovered(true)}
			onHoverEnd={() => setIsHovered(false)}
			className="flex flex-col items-center justify-center gap-2 relative"
		>
			<div className="w-20 h-20 flex items-center justify-center">{icon}</div>
			<motion.span
				initial={{ opacity: 0, y: -5 }}
				animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -5 }}
				transition={{ duration: 0.2 }}
				className="text-white text-sm font-medium absolute -bottom-6 whitespace-nowrap"
			>
				{name}
			</motion.span>
		</motion.div>
	);
}
