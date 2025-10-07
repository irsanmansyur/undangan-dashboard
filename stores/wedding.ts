import { create } from "zustand";

type Store = {
	step: 1 | 2 | 3 | 4;
	wedding?: WEDDING.Collection;
};

type TrackActions = {
	setWedding: (
		partial: Partial<Store> | ((state: Store) => Partial<Store>),
	) => void;
};

export const useStoreWedding = create<Store & TrackActions>()((set) => ({
	step: 1,
	setWedding: set,
}));
