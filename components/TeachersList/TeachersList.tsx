"use client";

import { Teacher, getTeachers, FilterParams, Level } from "@/lib/api";
import TeacherCard from "../TeacherCard/TeacherCard";
import css from "./TeachersList.module.css";
import Filters from "../Filters/Filters";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";


type Props = {
    initialData: { items: Teacher[]; total: number };
};

const TeacherList = ({ initialData }: Props) => {
    const searchParams = useSearchParams();
    const currentLevel = searchParams.get("level") || "";

    const [teachers, setTeachers] = useState<Teacher[]>(initialData.items);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [total, setTotal] = useState(initialData.total);

    const isEnd = teachers.length >= total;

    const getFiltersFromUrl = useCallback((): FilterParams => {
        return {
            language: searchParams.get("language") || undefined,
            level: (searchParams.get("level") as Level) || undefined,
            price_per_hour: searchParams.get("price_per_hour") 
                ? Number(searchParams.get("price_per_hour")) 
                : undefined,
        };
    }, [searchParams]);

    const fetchTeachers = useCallback(async (nextPage: number, isNewSearch: boolean) => {
        setIsLoading(true);
        const currentFilters = getFiltersFromUrl();

        try {
            const data = await getTeachers(nextPage, 4, currentFilters);
            
            if (isNewSearch) {
                setTeachers(data.items);
                setTotal(data.total);
                setPage(1);
            } else {
                setTeachers((prev) => [...prev, ...data.items]);
                setPage(nextPage);
            }
        } catch (error) {
            console.error("Failed to fetch teachers:", error);
        } finally {
            setIsLoading(false);
        }
    }, [getFiltersFromUrl]);

    useEffect(() => {
        fetchTeachers(1, true);
    }, [searchParams, fetchTeachers]);

    const handleLoadMore = () => {
        if (!isLoading && !isEnd) {
            fetchTeachers(page + 1, false);
        }
    };

    return (
    <div className={css.sectionWrapper}>
        <div className={css.container}>
            <Filters />
            
            <main className={css.catalog}>
                <div className={css.listWrapper}>
                    {teachers.length > 0 && (
                        <ul className={css.list}>
                            {teachers.map((teacher, index) => (
                                <li key={teacher.id || `${teacher.name}-${index}`}>
                                    <TeacherCard 
                                        teacher={teacher} 
                                        selectedLevel={currentLevel} 
                                    />
                                </li>
                            ))}
                        </ul>
                    )}

                    {isLoading && (
                        <div className={css.loaderOverlay}>
                            <span className={css.loader}>Loading...</span>
                        </div>
                    )}
                </div>

                {!isLoading && teachers.length === 0 && (
                    <div className={css.noResults}>
                        <p>No teachers found matching your filters.</p>
                    </div>
                )}

                {!isEnd && teachers.length > 0 && (
                    <div className={css.loadMoreWrapper}>
                        <button 
                            type="button" 
                            className={css.loadMoreButton} 
                            onClick={handleLoadMore}
                            disabled={isLoading}
                        >
                            {isLoading ? "Loading..." : "Load more"}
                        </button>
                    </div>
                )}
            </main>
            </div>
    </div>
    );
}

export default TeacherList;