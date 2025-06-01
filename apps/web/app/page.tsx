import {SidebarProvider, SidebarTrigger} from '@workspace/ui/components/sidebar'
import {AppSidebar} from '@/components/app-sidebar'
import {Home} from '@/components/home'

export default function Page() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="flex flex-col mt-8 w-full">
				<SidebarTrigger className="hover:cursor-pointer"/>
				<Home />
			</main>
		</SidebarProvider>
	)
}
