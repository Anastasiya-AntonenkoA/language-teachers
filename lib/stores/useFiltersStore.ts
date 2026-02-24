import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FilterParams } from '@/lib/api';

interface FiltersState {
  savedFilters: FilterParams;
  setFilters: (filters: FilterParams) => void;
  reset: () => void;
}

export const useFiltersStore = create<FiltersState>()(
  persist(
    (set) => ({
      savedFilters: {},
      setFilters: (filters) => set({ savedFilters: filters }),
      reset: () => set({ savedFilters: {} }),
    }),
    {
      name: 'teacher-filters-storage',
    }
  )
);