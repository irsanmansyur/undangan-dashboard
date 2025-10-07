import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Store = {
	step: 1 | 2 | 3 | 4;
	wedding?: WEDDING.Collection;
};

type TrackActions = {
	setWedding: (
		partial: Partial<Store> | ((state: Store) => Partial<Store>),
	) => void;
};

export const useStoreCreateWedding = create<Store & TrackActions>()(
	persist(
		(set, get) => ({
			step: 1,
			setWedding: set,
		}),
		{
			name: "food-storage", // name of the item in the storage (must be unique)
			storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
		},
	),
);
