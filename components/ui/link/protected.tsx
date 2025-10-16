"use client";
import Link from "next/link";
import type React from "react";
import type { AnchorHTMLAttributes } from "react";

type LinkProtectedProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
	children?: React.ReactNode;
	canVisit?: boolean;
	href: string;
};

const LinkProtected: React.FC<LinkProtectedProps> = ({
	canVisit = true,
	children,
	href,
	...props
}) => {
	if (canVisit === true)
		return (
			<Link {...props} href={href}>
				{children}
			</Link>
		);
	return "";
};

export default LinkProtected;
