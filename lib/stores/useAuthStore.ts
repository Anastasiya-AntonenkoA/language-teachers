import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { db } from "@/lib/firebase";
import { ref, set as dbSet, remove } from "firebase/database";

interface AuthState {
  isLoggedIn: boolean;
  favorites: string[];
  userId: string | null;
  setLoggedIn: (value: boolean, uid?: string | null) => void;
  toggleFavorite: (teacherId: string) => void;
  setFavorites: (favorites: string[]) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      favorites: [],
      userId: null,

      setLoggedIn: (value, uid = null) => {
        if (!value) {
          set({ isLoggedIn: false, userId: null, favorites: [] });
        } else {
          set({ isLoggedIn: true, userId: uid });
        }
      },
      logout: () => {
        set({ 
          isLoggedIn: false, 
          userId: null, 
          favorites: []
        });
      },
      setFavorites: (favorites) => set({ favorites }),

      toggleFavorite: async (teacherId) => {
        const { userId, favorites, isLoggedIn } = get();
        if (!isLoggedIn || !userId) return;
        
        const isFav = favorites.includes(teacherId);
        const favRef = ref(db, `favorites/${userId}/${teacherId}`);

        const newFavorites = isFav 
          ? favorites.filter(id => id !== teacherId) 
          : [...favorites, teacherId];
        
        set({ favorites: newFavorites });

        try {
          if (isFav) {
            await remove(favRef);
          } else {
            await dbSet(favRef, true);
          }
        } catch (error) {
          set({ favorites });
          console.error("Error updating selection:", error);
        }
      },
    }),
    { 
      name: 'auth-storage',
      partialize: (state) => ({ favorites: state.favorites, isLoggedIn: state.isLoggedIn, userId: state.userId }),
    }
  )
);