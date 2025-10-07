"use client";

import { Calendar, Eye, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { WeddingCollection } from "@/types/wedding";
import { AppConfig } from "@/utils/configs/app";
import { useFetcher } from "~/hooks/fetcher";

export default function WeddingPage() {
	const {
		data,
		loading,
		exec: fetchWeddings,
	} = useFetcher<WeddingCollection[]>();
	const { exec: deleteWedding } = useFetcher();

	const handleDelete = async (id: string) => {
		if (!confirm("Are you sure you want to delete this wedding?")) {
			return;
		}

		await deleteWedding(`${AppConfig.BackendUrl}/weddings/${id}`, {
			method: "DELETE",
		});

		fetchWeddings(`${AppConfig.BackendUrl}/weddings`);
	};

	useEffect(() => {
		fetchWeddings(`${AppConfig.BackendUrl}/weddings?limit=23`);
	}, [fetchWeddings]);

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
			</div>
		);
	}

	return (
		<div className="container mx-auto p-6">
			<div className="mb-6 flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold">Wedding Invitations</h1>
					<p className="text-muted-foreground mt-2">
						Manage your wedding invitation projects
					</p>
				</div>
				<Link href="/dashboard/wedding/create">
					<Button>
						<Plus className="w-4 h-4" />
						Create Wedding
					</Button>
				</Link>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{data?.data.map((wedding) => {
					return (
						<Card
							key={wedding.id}
							className="hover:shadow-lg transition-shadow"
						>
							<CardHeader>
								<div className="relative aspect-video mb-4 rounded-md overflow-hidden bg-muted">
									<Image
										src={`${AppConfig.BackendUrl}/files/${wedding.coverPhoto}`}
										alt={`${wedding.mempelai.groom.namaLengkap} & ${wedding.mempelai.bride.namaLengkap}`}
										className="object-cover"
										width={200}
										height={200}
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									/>
								</div>
								<CardTitle className="text-lg">
									{wedding.mempelai.groom.namaLengkap} &{" "}
									{wedding.mempelai.bride.namaLengkap}
								</CardTitle>
								<CardDescription>
									<div className="flex items-center gap-2 mt-2">
										<Calendar className="w-4 h-4" />
										{wedding.acara.akadNikah.tanggal}
									</div>
									<div className="text-xs mt-1">
										Template: {wedding.templateName}
									</div>
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="text-sm text-muted-foreground mb-4">
									<p>Slug: /{wedding.slug}</p>
									<p>
										Created: {new Date(wedding.createdAt).toLocaleDateString()}
									</p>
								</div>

								<div className="flex gap-2">
									<Button
										size="sm"
										variant="outline"
										asChild
										className="flex-1"
									>
										<a
											href={`/wedding/${wedding.slug}`}
											target="_blank"
											rel="noopener noreferrer"
										>
											<Eye className="w-4 h-4" />
											View
										</a>
									</Button>
									<Link href={`/dashboard/wedding/${wedding.id}/edit`}>
										<Button size="sm" variant="secondary">
											Edit
										</Button>
									</Link>
									<Button
										size="sm"
										variant="destructive"
										onClick={() => handleDelete(wedding.id)}
									>
										<Trash2 className="w-4 h-4" />
									</Button>
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>

			{data?.data.length === 0 && (
				<div className="text-center py-12">
					<Calendar className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
					<h3 className="text-xl font-semibold mb-2">No weddings found</h3>
					<p className="text-muted-foreground mb-4">
						Create your first wedding invitation to get started
					</p>
					<Link href="/dashboard/wedding/create">
						<Button>
							<Plus className="w-4 h-4" />
							Create Wedding
						</Button>
					</Link>
				</div>
			)}
		</div>
	);
}
