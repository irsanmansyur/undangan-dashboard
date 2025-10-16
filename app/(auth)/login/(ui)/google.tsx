"use client";
import { IconBrandGoogle } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect } from "react";
import { Button } from "~/components/ui/button";
import { login } from "~/lib/auth-client";

type GoogleProps = {
	children?: React.ReactNode;
};

const Google: React.FC<GoogleProps> = () => {
	const router = useRouter();

	useEffect(() => {
		window.addEventListener("message", async (event) => {
			if (event?.data && event?.data.status === true) {
				await login(event.data.data);
				return router.replace("/dashboard");
			}
		});
		return () => {
			window.removeEventListener("message", () => {});
		};
	}, [router.replace]);
	const onClick = async () => {
		try {
			window.open(
				"/backend/api/v1/auth/google",
				"GoogleLogin",
				"width=500,height=600",
			);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<Button
			variant="outline"
			type="button"
			className="w-full"
			onClick={onClick}
		>
			<IconBrandGoogle /> Login with Google
		</Button>
	);
};

export default Google;
