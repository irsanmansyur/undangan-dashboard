"use client";

import { Pause, Play, Plus, Trash2, Volume2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import type { Template } from "@/types/template";
import { AppConfig } from "@/utils/configs/app";
import { useFetcher } from "~/hooks/fetcher";
import Image from "next/image";
import { Badge } from "~/components/ui/badge";
import { useBreadcrumbs } from "~/hooks/page";
import DeleteButton from "./(ui)/delete-button";

export default function TemplatePage() {
	const { data, loading, exec: fetchTemplates } = useFetcher<Template[]>();
	const [playingId, setPlayingId] = useState<string | null>(null);
	const audioRef = useRef<HTMLAudioElement | null>(null);
	useBreadcrumbs([{ label: "Templates", href: "/dashboard/template" }]);

	useEffect(() => {
		fetchTemplates(`${AppConfig.BackendUrl}/wedding-templates`);
	}, [fetchTemplates]);

	useEffect(() => {
		const audio = new Audio();
		audioRef.current = audio;

		audio.addEventListener("ended", () => {
			setPlayingId(null);
		});

		return () => {
			audio.pause();
			audio.src = "";
		};
	}, []);

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="loading loading-spinner loading-lg" />
			</div>
		);
	}

	return (
		<div className="container mx-auto p-6">
			<div className="mb-6 flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold">Templates</h1>
					<p className="text-muted-foreground mt-2">
						Manage your invitation templates
					</p>
				</div>
				<Link href="/dashboard/template/create">
					<Button>
						<Plus className="w-4 h-4" />
						Create Template
					</Button>
				</Link>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{data?.data.map((template) => (
					<div
						key={template.id}
						className="bg-base-100 shadow-xl transition-shadow h-[300px] overflow-hidden rounded-xl relative"
					>
						<div className="absolute inset-0 z-0">
							<Image
								src={`${AppConfig.BackendUrl}/files/${template.thumbnail}`}
								alt=""
								width={200}
								height={300}
								className="w-full"
							/>
						</div>
						<div className="w-full h-full bg-gradient-to-b from-black/20 to-black/50 via-black/30 via-30% flex items-center justify-end flex-col py-4 z-50 relative ">
							<h2 className="card-title text-white">{template.templateName}</h2>
							<div className="flex items-center gap-2 mt-2">
								<Badge
									variant={
										template.status == "inactive" ? "outline" : "default"
									}
								>
									{template.status}
								</Badge>
							</div>

							<div className="text-sm text-gray-100 mt-2">
								<p>
									Created: {new Date(template.createdAt).toLocaleDateString()}
								</p>
								<p>
									Updated: {new Date(template.updatedAt).toLocaleDateString()}
								</p>
							</div>

							<div className="mt-4 flex gap-2">
								<Link
									className={buttonVariants({ variant: "outline", size: "sm" })}
									href={`${AppConfig.FrontendUrl}/preview/${template.id}`}
									target="_blank"
								>
									<Play className="w-4 h-4" />
									Preview
								</Link>
								<DeleteButton
									templateId={template.id}
									onDeletedAction={() => {
										fetchTemplates(`${AppConfig.BackendUrl}/wedding-templates`);
									}}
								/>
							</div>
						</div>
					</div>
				))}
			</div>

			{data?.data.length === 0 && (
				<div className="text-center py-12">
					<Volume2 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
					<h3 className="text-xl font-semibold mb-2">No templates found</h3>
					<p className="text-muted-foreground">
						Create your first template to get started
					</p>
				</div>
			)}
		</div>
	);
}
