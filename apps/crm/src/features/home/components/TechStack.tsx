import { TechLogo } from "./TechLogo";
import { AISDKLogo } from "./logos/AISDKLogo";
import { BiomeLogo } from "./logos/BiomeLogo";
import { HuskyLogo } from "./logos/HuskyLogo";
import { MotionLogo } from "./logos/MotionLogo";
import { PlaywrightLogo } from "./logos/PlaywrightLogo";
import { PnpmLogo } from "./logos/PnpmLogo";
import { RadixLogo } from "./logos/RadixLogo";
import { ReactHookFormLogo } from "./logos/ReactHookFormLogo";
import { ReactLogo } from "./logos/ReactLogo";
import { ShadcnLogo } from "./logos/ShadcnLogo";
import { StorybookLogo } from "./logos/StorybookLogo";
import { TailwindLogo } from "./logos/TailwindLogo";
import { TanStackLogo } from "./logos/TanStackLogo";
import { TurborepoLogo } from "./logos/TurborepoLogo";
import { TypeScriptLogo } from "./logos/TypeScriptLogo";
import { ViteLogo } from "./logos/ViteLogo";
import { VitestLogo } from "./logos/VitestLogo";
import { ZodLogo } from "./logos/ZodLogo";
import { ZustandLogo } from "./logos/ZustandLogo";

const technologies = [
	{ icon: <ViteLogo />, name: "Vite" },
	{ icon: <ReactLogo />, name: "React" },
	{ icon: <TailwindLogo />, name: "Tailwind CSS" },
	{ icon: <HuskyLogo />, name: "Husky" },
	{ icon: <VitestLogo />, name: "Vitest" },
	{ icon: <ShadcnLogo />, name: "shadcn/ui" },
	{ icon: <MotionLogo />, name: "Motion" },
	{ icon: <TanStackLogo />, name: "TanStack" },
	{ icon: <StorybookLogo />, name: "Storybook" },
	{ icon: <PlaywrightLogo />, name: "Playwright" },
	{ icon: <RadixLogo />, name: "Radix UI" },
	{ icon: <TypeScriptLogo />, name: "TypeScript" },
	{ icon: <ZodLogo />, name: "Zod" },
	{ icon: <TurborepoLogo />, name: "Turborepo" },
	{ icon: <AISDKLogo />, name: "Vercel AI SDK" },
	{ icon: <ZustandLogo />, name: "Zustand" },
	{ icon: <ReactHookFormLogo />, name: "React Hook Form" },
	{ icon: <BiomeLogo />, name: "Biome" },
	{ icon: <PnpmLogo />, name: "pnpm" },
];

export function TechStack() {
	return (
		<div className="flex flex-wrap justify-center items-center gap-10 max-w-5xl mx-auto pb-8">
			{technologies.map((tech, index) => (
				<TechLogo
					key={tech.name}
					icon={tech.icon}
					name={tech.name}
					delay={index * 0.03}
				/>
			))}
		</div>
	);
}
