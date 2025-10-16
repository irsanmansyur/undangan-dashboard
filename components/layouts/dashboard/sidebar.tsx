"use client";

import {
	AudioWaveform,
	Command,
	GalleryVerticalEnd,
	Heart,
	LayoutTemplate,
	Settings2,
} from "lucide-react";
import type React from "react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import { useStoreDashboard } from "~/stores/dashboard";
import { NavMain } from "./navbar-main";
import { NavProjects } from "./navbar-projects";
import { NavUser } from "./navbar-user";
import { TeamSwitcher } from "./team-swetcher";

// This is sample data.
const data = {
	teams: [
		{
			name: "UndanganTA",
			logo: GalleryVerticalEnd,
			plan: "Enterprise",
		},
		{
			name: "Acme Corp.",
			logo: AudioWaveform,
			plan: "Startup",
		},
		{
			name: "Evil Corp.",
			logo: Command,
			plan: "Free",
		},
	],
	navMain: [
		{
			title: "Wedding",
			url: "/dashboard/wedding",
			icon: Heart,
			isActive: true,
			items: [
				{
					title: "All Weddings",
					role: "admin",
					url: "/dashboard/wedding",
				},
				{
					title: "Create New",
					url: "/dashboard/wedding/create",
				},
			],
		},
		{
			title: "Template",
			url: "/dashboard/template",
			icon: LayoutTemplate,
			items: [
				{
					title: "All Templates",
					url: "/dashboard/template",
				},
				{
					title: "Create Template",
					role: "admin",
					url: "/dashboard/template/create",
				},
			],
		},
		{
			title: "Settings",
			url: "#",
			icon: Settings2,
			items: [
				{
					title: "General",
					url: "#",
				},
			],
		},
	],
	projects: [
		// {
		// 	name: "Design Engineering",
		// 	url: "#",
		// 	icon: Frame,
		// },
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { user } = useStoreDashboard();
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher teams={data.teams} />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavProjects projects={data.projects} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser
					user={{
						avatar: "/user.png",
						email: user.email,
						name: user.name,
					}}
				/>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
