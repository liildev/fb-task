import { ChevronRight, Box } from 'lucide-react';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '../ui/collapsible';
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	useSidebar,
} from '../ui/sidebar';
import { Card } from '../ui/card';

export const Menu = () => {
	const { toggleSidebar, isMobile } = useSidebar();

	const handleDragStart = (
		e: React.DragEvent<HTMLDivElement>,
		blockType: string
	) => {
		if (isMobile) {
			toggleSidebar();
		}
		e.dataTransfer.setData('blockType', blockType);
	};

	const items = [
		{
			title: 'Default',
			type: 'default',
			icon: Box,
			isActive: true,
		},
	];

	return (
		<SidebarGroup>
			<SidebarGroupLabel>Instrumentlar paneli</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => (
					<Collapsible
						key={item.title}
						asChild
						defaultOpen={item.isActive}
						className='group/collapsible'
					>
						<SidebarMenuItem>
							<CollapsibleTrigger asChild>
								<SidebarMenuButton tooltip={item.title}>
									{item.icon && <item.icon />}
									<span>{item.title}</span>
									<ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
								</SidebarMenuButton>
							</CollapsibleTrigger>
							<CollapsibleContent>
								<SidebarMenuSub>
									<SidebarMenuSubItem>
										<SidebarMenuSubButton asChild>
											<Card
												key={item.type}
												draggable
												className='cursor-pointer shadow-none'
												onDragStart={(e) => handleDragStart(e, item.type)}
											>
												Block
											</Card>
										</SidebarMenuSubButton>
									</SidebarMenuSubItem>
								</SidebarMenuSub>
							</CollapsibleContent>
						</SidebarMenuItem>
					</Collapsible>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
};
