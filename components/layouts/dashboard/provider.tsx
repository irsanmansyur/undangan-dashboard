"use client";
import type React from "react";
import { useEffect } from "react";
import { useStoreDashboard } from "~/stores/dashboard";

type DashboardProviderProps = {
	children?: React.ReactNode;
	user: DASHBOARD.User;
};

const DashboardProvider: React.FC<DashboardProviderProps> = ({
	user: sr,
	children,
}) => {
	const { setDashboard, user } = useStoreDashboard();
	useEffect(() => {
		setDashboard({ user: sr });
		return () => {};
	}, [setDashboard, sr]);
	if (!user) return "";
	return children;
};

export default DashboardProvider;
