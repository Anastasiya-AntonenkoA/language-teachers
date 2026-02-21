"use client";

import { useState, useEffect } from "react";
import { Modal } from "../Modal/Modal";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import { LoginForm } from "../LoginForm/LoginForm";
import { logoutUser, subscribeToAuth } from "@/lib/firebase";
import { User } from "firebase/auth";

import Link from "next/link";
import Image from "next/image";
import css from "./Header.module.css";

type Mode = "register" | "login";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState<Mode>("register");
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = subscribeToAuth((currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    const openModal = (selectedMode: Mode) => {
        setMode(selectedMode);
        setIsOpen(true);
    }

    return (
        <header className={css.header}>
            <div className={css.container}>
                <Link href="/" className={css.logo} aria-label="Logo-Home">
                    <Image
                    src="/images/logo.png"
                    alt="LearnLingo"
                    width={133}
                    height={28}
                    priority/>
                </Link>

                <nav className={css.nav} aria-label="Navigation">
                    <ul className={css.navigation}>
                        <li><Link href="/" className={css.navLink}>Home</Link></li>
                        <li><Link href="/teachers" className={css.navLink}>Teachers</Link></li>
                    </ul>
                </nav>

                <div className={css.authBlock}>
                    {!user ? (
                        <div className={css.buttons}>
                            <button onClick={() => openModal('login')} className={css.loginBtn}>
                                <svg className={css.loginIcon} width="20" height="20">
                                    <use href="/icons/sprite.svg#icon-log-in" />
                                </svg>
                                Log in
                            </button>
                            <button
                                onClick={() => openModal('register')} className={css.registerBtn}>
                                Registration
                            </button>
                        </div>) : (
                        <div className={css.userMenu}>
                            <button onClick={logoutUser} className={css.logoutBtn}>
                                Log Out
                            </button>
                        </div>)}
                    
                    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                        {mode === 'register' ? (
                            <RegisterForm onSuccess={() => setIsOpen(false)} />
                        ) : (<LoginForm onSuccess={() => setIsOpen(false)} />)}
                    </Modal>
                </div>
            </div>
        </header>
    );
}