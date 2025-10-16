"use client";
import React from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { useStorePage } from "~/stores/page";

type BreadcrumbsProps = {
	children?: React.ReactNode;
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = () => {
	const { breadcrumbs } = useStorePage();
	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem className="hidden md:block">
					<BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
				</BreadcrumbItem>
				{breadcrumbs.map((breadcrumb, index) => {
					const isLast = index === breadcrumbs.length - 1;
					return (
						<React.Fragment key={breadcrumb.href}>
							{(index === 0 || !isLast) && (
								<BreadcrumbSeparator className="hidden md:block" />
							)}
							<BreadcrumbItem>
								<BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
							</BreadcrumbItem>
						</React.Fragment>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
};

export default Breadcrumbs;
