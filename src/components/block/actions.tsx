import { HTMLAttributes } from 'react';
import { ChevronRight, Upload, X } from 'lucide-react';
import { Button, ButtonProps, buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';

export const UploadBtn = ({ ...props }: ButtonProps) => (
	<Button variant='outline' size='icon' {...props}>
		<Upload />
	</Button>
);

export const ResizeHandler = ({ ...props }: HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn(
			'absolute bottom-1 right-1 z-10 cursor-se-resize',
			buttonVariants({ variant: 'ghost', size: 'icon' })
		)}
		{...props}
	>
		<ChevronRight className='transform rotate-45' />
	</div>
);

export const Remover = ({ ...props }: ButtonProps) => (
	<Button
		size='icon'
		variant='ghost'
		className='absolute top-1 right-1 z-10'
		{...props}
	>
		<X />
	</Button>
);
