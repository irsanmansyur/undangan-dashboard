"use client";

import { IconBrandGithub } from "@tabler/icons-react";
import type React from "react";
import { Button } from "~/components/ui/button";

type GithubOAuthProps = {
	children?: React.ReactNode;
};

const GithubOAuth: React.FC<GithubOAuthProps> = ({}) => {
	const onClick = async () => {
		try {
			window.open(
				"/backend/api/v1/auth/github",
				"GithubOAuthLogin",
				"width=500,height=600",
			);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<Button variant="outline" size="sm" onClick={onClick} type="button">
			<IconBrandGithub /> GITHUB
		</Button>
	);
};

export default GithubOAuth;
