"use client";

import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";
import { Actions } from "@/components/actions";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { Menu } from "lucide-react";

import { useRenameModal } from "@/store/use-rename-modal";
import { cn } from "@/lib/utils";
import { CanvasProps } from "@/types";

import { poppins } from "@/fonts";

const TabSeparator = () => {
	return <div className='text-neutral-300 px-1.5'>|</div>;
};

export const Info = ({ canvasId }: CanvasProps) => {
	const { onOpen } = useRenameModal();

	const data = useQuery(api.canvas.get, {
		id: canvasId as Id<"canvas">,
	});

	if (!data) {
		return <InfoSkeleton />;
	}

	return (
		<div className='absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md'>
			<Hint label='Go to Home' side='bottom' sideOffset={10}>
				<Button
					asChild
					variant='canvasBoard'
					className='px-2'
				>
					<Link href='/'>
						<Image
							src='/logo.svg'
							alt='Canvas logo'
							height={40}
							width={40}
						/>
						<span
							className={cn(
								"font-semibold text-xl ml-2 text-black",
								poppins.className
							)}
						>
							Canvas
						</span>
					</Link>
				</Button>
			</Hint>

			<TabSeparator />

			<Hint label='Edit Title' side='bottom' sideOffset={10}>
				<Button
					variant='canvasBoard'
					className='text-base font-normal px-2'
					onClick={() => onOpen(data._id, data.title)}
				>
					{data.title}
				</Button>
			</Hint>

			<TabSeparator />

			<Actions
				id={data._id}
				title={data.title}
				side='bottom'
				sideOffset={10}
			>
				<div>
					<Hint
						label='Main Menu'
						side='bottom'
						sideOffset={10}
					>
						<Button size='icon' variant='canvasBoard'>
							<Menu />
						</Button>
					</Hint>
				</div>
			</Actions>
		</div>
	);
};

export const InfoSkeleton = () => {
	return (
		<div className='absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]' />
	);
};
