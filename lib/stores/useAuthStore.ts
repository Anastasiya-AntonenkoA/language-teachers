import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isLoggedIn: boolean;
  favorites: string[];
  toggleFavorite: (teacherId: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      favorites: [],
      toggleFavorite: (teacherId) => set((state) => ({
        favorites: state.favorites.includes(teacherId)
          ? state.favorites.filter(id => id !== teacherId)
          : [...state.favorites, teacherId]
      })),
    }),
    { name: 'auth-storage' }
  )
);