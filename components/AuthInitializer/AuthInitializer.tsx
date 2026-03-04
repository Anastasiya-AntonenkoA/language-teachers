"use client";

import { useEffect } from "react";
import { subscribeToAuth } from "@/lib/firebase";
import { useAuthStore } from "@/lib/stores/useAuthStore";
import { ref, get, child } from "firebase/database";
import { db } from "@/lib/firebase";

export const AuthInitializer = () => {
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
  const setFavorites = useAuthStore((state) => state.setFavorites);

  useEffect(() => {
    const unsubscribe = subscribeToAuth(async (user) => {
      if (user) {
        setLoggedIn(true, user.uid);
        const dbRef = ref(db);
        try {
          const snapshot = await get(child(dbRef, `favorites/${user.uid}`));
          if (snapshot.exists()) {
            const favs = Object.keys(snapshot.val());
            setFavorites(favs);
          } else {
            setFavorites([]);
          }
        } catch (error) {
          console.error("Error loading selected:", error);
        }
      } else {
        setLoggedIn(false, null);
        setFavorites([]);
      }
    });

    return () => unsubscribe();
  }, [setLoggedIn, setFavorites]);

  return null;
};