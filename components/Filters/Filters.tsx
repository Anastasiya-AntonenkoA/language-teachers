"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFiltersStore } from "@/lib/stores/useFiltersStore";
import css from "./Filters.module.css";
  
const LANGUAGES = ["English", "Polish", "French", "German", "Ukrainian"];
const LEVELS = [
  "A1 Beginner",
  "A2 Elementary",
  "B1 Intermediate",
  "B2 Upper-Intermediate",
  "C1 Advanced",
  "C2 Proficient",
];
const PRICES = [10, 20, 30, 40];

const Filters = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { savedFilters, setFilters } = useFiltersStore();

    const isRestored = useRef(false);

    useEffect(() => {
        if (isRestored.current || searchParams.toString().length > 0) return;

        const hasSaved = Object.keys(savedFilters).length > 0;

        if (hasSaved) {
            const params = new URLSearchParams();
            Object.entries(savedFilters).forEach(([key, value]) => {
            if (value) params.set(key, String(value));
            });
            
            isRestored.current = true;
            router.replace(`?${params.toString()}`, { scroll: false });
        }
    }, [router, savedFilters, searchParams]);
    
    const handleChange = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        
        if (value) params.set(key, value);
        else params.delete(key);
        
        params.set("page", "1"); 

        const newFilters = {
            ...savedFilters,
            [key]: value || undefined
        };
        setFilters(newFilters);
        
        router.push(`?${params.toString()}`, { scroll: false });
    };
    
    return (
        <section className={css.filtersContainer}>
            <div className={css.filterGroup}>
                <label className={css.label}>Languages</label>
                <select
                    className={css.select}
                    value={searchParams.get("language") || ""}
                    onChange={(e) => handleChange("language", e.target.value)}
                >
                    <option value="">All</option>
                    {LANGUAGES.map((lang) => (
                        <option key={lang} value={lang}>{lang}</option>
                    ))}
                </select>
            </div>

            <div className={css.filterGroup}>
                <label className={css.label}>Level of knowledge</label>
                <select
                    className={css.select}
                    value={searchParams.get("level") || ""}
                    onChange={(e) => handleChange("level", e.target.value)}
                >
                    <option value="">All</option>
                    {LEVELS.map((level) => (
                        <option key={level} value={level}>{level}</option>
                    ))}
                </select>
            </div>

            <div className={css.filterGroup}>
                <label className={css.label}>Price</label>
                <select
                    className={css.select}
                    value={searchParams.get("price_per_hour") || ""}
                    onChange={(e) => handleChange("price_per_hour", e.target.value)}
                >
                    <option value="">All</option>
                    {PRICES.map((price) => (
                        <option key={price} value={price.toString()}>
                        Up to {price}$
                        </option>
                ))}
                </select>
            </div>
        </section>
    );
};

export default Filters;