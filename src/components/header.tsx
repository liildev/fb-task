import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger, useSidebar } from './ui/sidebar';
import { useToast } from '@/hooks/use-toast';

const TOAST_TITLE = 'Dashboard saqlandi';
const TOAST_DESCRIPTION = 'Sizning dashboard muvaffaqiyatli saqlandi.';

export const Header: React.FC = () => {
	const { toast } = useToast();
	const { isMobile, setOpen, setOpenMobile } = useSidebar();

	/* Dashboardni saqlash funksiyasi	 */
	const handleSave = (): void => {
		toast({
			title: TOAST_TITLE,
			description: TOAST_DESCRIPTION,
		});

		if(isMobile) setOpenMobile(false);
		setOpen(false);
	};

	return (
		<header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b'>
			<div className='flex items-center gap-2 px-4 w-full'>
				<SidebarTrigger className='-ml-1' />

				<Separator orientation='vertical' className='mr-2 h-6' />

				<Input placeholder='Qidiruv...' className='max-w-lg' />

				<Button className='ml-auto' onClick={handleSave}>
					<Download className='sm:hidden' />
					<span className='sm:block hidden'>Dashboardni Saqlash</span>
				</Button>
			</div>
		</header>
	);
};
