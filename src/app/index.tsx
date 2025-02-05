import { Header } from '@/components/header';
import { Dashboard } from '@/components/dashboard';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Toaster } from '@/components/ui/toaster';

export const App: React.FC = () => (
	<SidebarProvider>
		<AppSidebar />

		<SidebarInset>
			<Header />
			<Dashboard />
		</SidebarInset>
		<Toaster />
	</SidebarProvider>
);
