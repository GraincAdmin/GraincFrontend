import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';


const useSearchHistoryStore = create(
    
    persist(
        (set) => ({
            searchHistory: [],
            addSearchHistory: (searchEntry) => {
                set((state) => {
                    // Check if searchEntry is already in the history
                    if (!state.searchHistory.includes(searchEntry)) {
                        // Add new searchEntry to the beginning of the array
                        const updatedHistory = [searchEntry, ...state.searchHistory.slice(0, 9)];
                        return { searchHistory: updatedHistory };
                    }
                    return state; // No change if the entry is already present
                });
            },
            removeSearchHistory: (historyToRemove) =>
                set((state) => ({
                    searchHistory: state.searchHistory.filter((history) => history !== historyToRemove),
                })),
            clearSearchHistory: () => set({ searchHistory: [] }),
        }),
        {
            name: 'searchHistory',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useSearchHistoryStore;
