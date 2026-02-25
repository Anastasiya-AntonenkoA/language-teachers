"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFiltersStore } from "@/lib/stores/useFiltersStore";
import css from "./Filters.module.css";

const LANGUAGES = ["English", "Polish", "French", "German", "Ukrainian"];
const LEVELS = ["A1 Beginner", "A2 Elementary", "B1 Intermediate", "B2 Upper-Intermediate", "C1 Advanced", "C2 Proficient"];
const PRICES = [10, 20, 30, 40];

const Filters = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { savedFilters, setFilters } = useFiltersStore();
    const [openFilter, setOpenFilter] = useState<string | null>(null);
    const filterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setOpenFilter(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleChange = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) params.set(key, value);
        else params.delete(key);
        params.set("page", "1");

        setFilters({ ...savedFilters, [key]: value || undefined });
        router.push(`?${params.toString()}`, { scroll: false });
        setOpenFilter(null);
    };

    const renderCustomSelect = (label: string, key: string, options: string[] | number[], width: string) => {
        const currentValue = searchParams.get(key) || "";
        const isOpen = openFilter === key;

        const getPlaceholder = () => {
            if (key === "language") return "All";
            if (key === "level") return "All";
            if (key === "price_per_hour") return "All";
            return "All";
        };

        return (
        <div className={css.filterGroup} style={{ width }}>
            <p className={css.label}>{label}</p>
            <div className={css.customSelectWrapper}>
                <div 
                    className={`${css.selectHeader} ${isOpen ? css.active : ""}`}
                    onClick={() => setOpenFilter(isOpen ? null : key)}
                >
                    <span className={css.currentValue}>
                        {currentValue ? (key === "price_per_hour" ? `${currentValue} $` : currentValue) : getPlaceholder()}
                    </span>
                    
                    <span className={`${css.arrow} ${isOpen ? css.arrowRotated : ""}`}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 7.5L10 12.5L15 7.5" stroke="#121417" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </span>
                </div>

                {isOpen && (
                    <ul className={css.optionsList}>
                        <li 
                            className={`${css.option} ${!currentValue ? css.selectedOption : ""}`}
                            onClick={() => handleChange(key, "")}
                            >
                            All
                        </li>
                        {options.map((opt) => (
                            <li 
                                key={opt} 
                                className={`${css.option} ${currentValue === String(opt) ? css.selectedOption : ""}`}
                                onClick={() => handleChange(key, String(opt))}
                            >
                                {key === "price_per_hour" ? `${opt} $` : opt}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
    return (
        <section className={css.filtersContainer} ref={filterRef}>
            {renderCustomSelect("Languages", "language", LANGUAGES, "221px")}
            {renderCustomSelect("Level of knowledge", "level", LEVELS, "198px")}
            {renderCustomSelect("Price", "price_per_hour", PRICES, "124px")}
        </section>
    );
};

export default Filters;