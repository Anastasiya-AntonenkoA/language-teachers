"use client";

import { Teacher } from "@/lib/api";
import { useAuthStore } from "@/lib/stores/useAuthStore";
import Image from "next/image";
import css from "./TeacherCard.module.css";

interface Props {
  teacher: Teacher;
}

const TeacherCard = ({ teacher }: Props) => {
  const { isLoggedIn, favorites, toggleFavorite } = useAuthStore(); 
  const isFavorite = favorites.includes(teacher.id || "");

  const handleHeartClick = () => {
    if (!isLoggedIn) {
      alert("This functionality is available only for authorized users!");
      // Тут можна замість alert відкрити модалку: setIsModalOpen(true)
      return;
    }
    toggleFavorite(teacher.id!);
  };

    return (
        <div className={css.card}>
            <div className={css.avatarWrapper}>
                <div className={css.avatarCircle}>
                    <Image
                        src={teacher.avatar_url}
                        alt={`${teacher.name} ${teacher.surname}`}
                        width={96}
                        height={96}
                        className={css.avatar}
                    />
                <div className={css.onlineIndicator}></div>
            </div>
        </div>

        <div className={css.infoWrapper}>
            <div className={css.header}>
            <div>
                <p className={css.subTitle}>Languages</p>
                <h2 className={css.name}>{teacher.name} {teacher.surname}</h2>
            </div>

            <div className={css.stats}>
                <span>
                    <svg className={css.icon} width="16" height="16">
                        <use href="/icons/sprite.svg#icon-book-open" />
                    </svg>
                    Lessons online
                </span>
                <span>Lessons done: {teacher.lessons_done}</span>
                <span>
                    <svg className={css.icon} width="16" height="16">
                        <use href="/icons/sprite.svg#icon-star-full" />
                    </svg>
                    Rating: {teacher.rating}
                </span>
                <span>Price / 1 hour: <span className={css.price}>{teacher.price_per_hour}$</span></span>
                
                <button 
                    className={`${css.heartBtn} ${isFavorite ? css.active : ""}`} 
                    onClick={handleHeartClick}
                        >
                <svg className={css.icon} width="26" height="26">
                        <use href="/icons/sprite.svg#icon-heart" />
                </svg>
                </button>
            </div>
            </div>

            <div className={css.details}>
            <p><span>Speaks:</span> <span className={css.languages}>{teacher.languages.join(", ")}</span></p>
            <p><span>Lesson Info:</span> {teacher.lesson_info}</p>
            <p><span>Conditions:</span> {teacher.conditions.join(". ")}</p>
            </div>

            <button className={css.readMore}>Read more</button>

            <div className={css.levels}>
            {teacher.levels.map((level) => (
                <span key={level} className={css.levelBadge}>#{level}</span>
            ))}
            </div>
        </div>
        </div>
    );
};

export default TeacherCard;