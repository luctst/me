import {SidebarProvider, SidebarTrigger} from '@workspace/ui/components/sidebar'
import {AppSidebar} from '@/components/app-sidebar'

export default function Page() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarTrigger />
			<main></main>
		</SidebarProvider>
	)
}
