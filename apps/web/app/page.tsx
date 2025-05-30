import {SidebarProvider, SidebarTrigger} from '@workspace/ui/components/sidebar'
import {AppSidebar} from '@/components/app-sidebar'
import {Titles} from '@/components/titles'
import projects from '@/public/projects.json'

export default function Page() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="flex flex-col mt-8">
				<SidebarTrigger className="hover:cursor-pointer"/>
				<Titles />
			</main>
		</SidebarProvider>
	)
}
