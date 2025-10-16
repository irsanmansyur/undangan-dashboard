"use client";
import { Trash2 } from "lucide-react";
import type React from "react";
import { Button } from "~/components/ui/button";
import { useFetcher } from "~/hooks/fetcher";
import { useStoreDashboard } from "~/stores/dashboard";
import { AppConfig } from "~/utils/configs/app";

type DeleteButtonProps = {
	children?: React.ReactNode;
	onDeletedAction?: () => void;
	templateId: string;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({
	onDeletedAction,
	templateId,
}) => {
	const { user } = useStoreDashboard();
	const { exec: deleteTemplate } = useFetcher();
	if (user.role !== "admin") return "";
	const handleDelete = async (id: string) => {
		if (!confirm("Are you sure you want to delete this template?")) {
			return;
		}

		await deleteTemplate(`${AppConfig.BackendUrl}/wedding-templates/${id}`, {
			method: "DELETE",
		});
		onDeletedAction?.();
	};

	return (
		<Button
			size="sm"
			variant="destructive"
			onClick={() => handleDelete(templateId)}
		>
			<Trash2 className="w-4 h-4" />
			Delete
		</Button>
	);
};

export default DeleteButton;
