import { CircleCheck, CircleX } from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = "system" } = useTheme();

	return (
		<Sonner
      duration={1500}
			theme={theme as ToasterProps["theme"]}
			className="toaster group bg-background"
			icons={{
				success: <CircleCheck className="text-green-500" />,
				error: <CircleX className="text-red-600 mr-1" />,
			}}
			{...props}
		/>
	);
};

export { Toaster };
