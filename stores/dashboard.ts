import { create } from "zustand";

type Store = {
	user: DASHBOARD.User;
};

type TrackActions = {
	setDashboard: (
		partial: Partial<Store> | ((state: Store) => Partial<Store>),
	) => void;
};

export const useStoreDashboard = create<Store & TrackActions>()((set) => ({
	user: undefined as unknown as DASHBOARD.User,
	setDashboard: set,
}));
