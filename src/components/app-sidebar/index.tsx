import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from '@/components/ui/sidebar';
import { Menu } from './menu';
import { Top } from './top';
import { User } from './user';

export const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
	return (
		<Sidebar collapsible='icon' {...props}>
			<SidebarHeader>
				<Top />
			</SidebarHeader>
			<SidebarContent>
				<Menu />
			</SidebarContent>
			<SidebarFooter>
				<User />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
