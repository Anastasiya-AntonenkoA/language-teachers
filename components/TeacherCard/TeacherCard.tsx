"use client";

import { Teacher } from "@/lib/api";
import { useAuthStore } from "@/lib/stores/useAuthStore";
import Image from "next/image";
import css from "./TeacherCard.module.css";
import { useEffect, useState } from "react";
import { Modal } from "../Modal/Modal";
import { LoginForm } from "../LoginForm/LoginForm";
import { RegisterForm } from "../RegisterForm/RegisterForm";


interface Props {
    teacher: Teacher;
}

type AuthView = 'prompt' | 'login' | 'register';

const TeacherCard = ({ teacher }: Props) => {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const favorites = useAuthStore((state) => state.favorites);
    const toggleFavorite = useAuthStore((state) => state.toggleFavorite);

    const [isHydrated, setIsHydrated] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState<AuthView>('prompt');

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsHydrated(true);
    }, []);

    const isFavorite = isHydrated && isLoggedIn && teacher.id 
        ? favorites.includes(teacher.id) 
        : false;

    const handleHeartClick = () => {
        if (!isHydrated) return;

        const { isLoggedIn, userId } = useAuthStore.getState();

        if (!isLoggedIn || !userId) {
            setAuthMode('prompt');
            setIsAuthModalOpen(true);
            return;
        }

        if (teacher.id) {
            toggleFavorite(teacher.id);
        }
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
                    <div className={css.titleGroup}>
                        <p className={css.subTitle}>Languages</p>
                        <h2 className={css.name}>{teacher.name} {teacher.surname}</h2>
                    </div>

                    <div className={css.stats}>
                        <div className={css.statItem}>
                            Price / 1 hour: <span className={css.priceValue}>{teacher.price_per_hour}$</span>
                        </div>

                        <button
                            type="button"
                            className={`${css.heartBtn} ${isFavorite ? css.active : ""}`}
                            onClick={handleHeartClick}
                        >
                            <svg className={css.iconHeart} width="26" height="26">
                                <use href="/icons/sprite.svg#icon-heart" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className={css.details}>
                    <p><span className={css.label}>Speaks:</span> <span className={css.languagesText}>{teacher.languages.join(", ")}</span></p>
                    <p><span className={css.label}>Lesson Info:</span> {teacher.lesson_info}</p>
                    <p><span className={css.label}>Conditions:</span> {teacher.conditions.join(". ")}</p>
                </div>

                {!isExpanded && (
                    <button className={css.readMore} onClick={() => setIsExpanded(true)}>Read more</button>
                )}

                {isExpanded && (
                    <div className={css.expandedContent}>
                        <p className={css.experienceText}>{teacher.experience}</p>
                        <ul className={css.reviewsList}>
                            {teacher.reviews?.map((review, index) => (
                                <li key={index} className={css.reviewItem}>
                                    <div className={css.reviewerHeader}>
                                        <div className={css.reviewerAvatarPlaceholder}>{review.reviewer_name[0]}</div>
                                        <div>
                                            <p className={css.reviewerName}>{review.reviewer_name}</p>
                                            <div className={css.reviewerRating}>★ {review.reviewer_rating.toFixed(1)}</div>
                                        </div>
                                    </div>
                                    <p className={css.reviewComment}>{review.comment}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className={css.levels}>
                    {teacher.levels.map((level) => (
                        <span key={level} className={css.levelBadge}>#{level}</span>
                    ))}
                </div>

                {isExpanded && <button className={css.bookBtn}>Book trial lesson</button>}
            </div>

            <Modal
                isOpen={isAuthModalOpen}
                onClose={() => {
                    setIsAuthModalOpen(false);
                    setTimeout(() => setAuthMode('prompt'), 300);
                }}>
                <div className={css.modalAuthWrapper}>
                    {authMode === 'prompt' && (
                        <div className={css.promptContainer}>
                            <h2 className={css.modalTitle}>Authentication Required</h2>
                            <p className={css.modalText}>Please log in or register to add teachers to your favorites and book lessons.</p>
                            <div className={css.promptButtons}>
                                <button onClick={() => setAuthMode('login')} className={css.loginBtn}><svg className={css.loginIcon} width="20" height="20">
                                    <use href="/icons/sprite.svg#icon-log-in" />
                                </svg>Log in</button>
                                <button onClick={() => setAuthMode('register')} className={css.registerBtn}>Registration</button>
                            </div>
                        </div>
                    )}
                    {authMode === 'login' && <LoginForm onSuccess={() => setIsAuthModalOpen(false)} />}
                    {authMode === 'register' && <RegisterForm onSuccess={() => setIsAuthModalOpen(false)} />}
                </div>
            </Modal>
        </div>
    );
};

export default TeacherCard;