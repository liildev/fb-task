import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '../ui/sidebar';

export const Top = () => (
	<SidebarMenu>
		<SidebarMenuItem>
			<SidebarMenuButton
				size='lg'
				className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-default'
			>
				<div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-white border p-1'>
					<img
						height={24}
						width={24}
						src='https://www.fido-biznes.uz/wp-content/uploads/2023/09/cropped-favicon-180x180.png'
						alt='Fido'
					/>
				</div>
				<span className='font-semibold'>Fido-Biznes</span>
			</SidebarMenuButton>
		</SidebarMenuItem>
	</SidebarMenu>
);
