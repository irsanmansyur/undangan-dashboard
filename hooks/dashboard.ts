"use client";
import { useEffect } from "react";
import { useStorePage } from "~/stores/page";

export const useBreadcrumbs = (breadcrumbs: DASHBOARD.Breadcrumb[]) => {
	const { setPage } = useStorePage();
	useEffect(() => {
		setPage({ breadcrumbs });
		return () => {};
	}, [setPage, breadcrumbs]);
	return null;
};
