import { headers } from 'next/headers'
import {SidebarProvider, SidebarTrigger} from '@workspace/ui/components/sidebar'
import {AppSidebar} from '@/components/app-sidebar'
import {Home} from '@/components/home'
import {Mobile} from '@/components/mobile'

export default async function Page() {
	const headersList = await headers()
	const userAgent = headersList.get('user-agent') || '';
  const isMobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase().trim());

	if (isMobile) {
		return (
			<>
				<Mobile />
				<section className="min-h-[100vh] pt-12">
					<Home />
				</section>
			</>
		);
	}

	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="flex flex-col mt-8 w-full overflow-hidden">
				<SidebarTrigger className="hover:cursor-pointer"/>
				<Home />
			</main>
		</SidebarProvider>
	)
}
