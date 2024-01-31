import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { HintProps } from "@/types";

export const Hint = ({
	label,
	children,
	side,
	sideOffset,
	align,
	alignOffset,
}: HintProps) => {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={100}>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent
					className='text-white bg-black border-black'
					side={side}
					align={align}
					sideOffset={sideOffset}
					alignOffset={alignOffset}
				>
					<p className='font-semibold capitalize'>
						{label}
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
