"use client";

import { useAuthStore } from "@/lib/stores/useAuthStore";
import { Teacher, getTeachers } from "@/lib/api";
import TeacherCard from "@/components/TeacherCard/TeacherCard";
import css from "@/components/TeachersList/TeachersList.module.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Suspense } from "react";

const FavoritesPage = () => {
    const searchParams = useSearchParams();
    const favoritesIds = useAuthStore((state) => state.favorites);
    const [favoriteTeachers, setFavoriteTeachers] = useState<Teacher[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const currentLevel = searchParams.get("level") || "";

    useEffect(() => {
        const fetchFavorites = async () => {
            setIsLoading(true);
            try {
                const data = await getTeachers(1, 1000);
                const filtered = data.items.filter(t => favoritesIds.includes(t.id));
                setFavoriteTeachers(filtered);
            } catch (error) {
                console.error("Failed to fetch favorites:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (favoritesIds.length > 0) {
            fetchFavorites();
        } else {
            setFavoriteTeachers([]);
            setIsLoading(false);
        }
    }, [favoritesIds]);

    return (
        <div className={css.sectionWrapper}>
            <div className={css.container}>
                <main className={css.catalog}>
                    <h1 className={css.title}>Your Favorite Teachers</h1>
                    
                    <div className={css.listWrapper}>
                        {favoriteTeachers.length > 0 ? (
                            <ul className={css.list}>
                                {favoriteTeachers.map((teacher) => (
                                    <li key={teacher.id}>
                                        <TeacherCard 
                                            teacher={teacher} 
                                            selectedLevel={currentLevel} 
                                        />
                                    </li>
                                ))}
                            </ul>
                        ) : !isLoading && (
                            <div className={css.noResults}>
                                <p>You haven`t added any teachers to your favorites yet.</p>
                            </div>
                        )}

                        {isLoading && (
                            <div className={css.loaderOverlay}>
                                <span className={css.loader}>Loading...</span>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default function Favorites() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <FavoritesPage />
        </Suspense>
    );
}