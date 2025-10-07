import { create } from "zustand";
import { utilsString } from "~/lib/utils/string";

type Store = {
	pageId: string;
	breadcrumbs: DASHBOARD.Breadcrumb[];
};

type TrackActions = {
	setPage: (
		partial: Partial<Store> | ((state: Store) => Partial<Store>),
	) => void;
	generateNewPageId: () => void;
};

export const useStorePage = create<Store & TrackActions>()((set) => ({
	pageId: utilsString.randomString(8),
	generateNewPageId: () => set({ pageId: utilsString.randomString(8) }),
	setPage: set,
	breadcrumbs: [],
}));
