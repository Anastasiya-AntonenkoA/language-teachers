"use client";

import { useState, useEffect } from "react";
import { Modal } from "../Modal/Modal";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import { LoginForm } from "../LoginForm/LoginForm";
import { logoutUser, subscribeToAuth } from "@/lib/firebase";
import { User } from "firebase/auth";

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
        <header className="">
            <div className="">

                {!user ? (
                    <>
                        <p>HEADER</p>
                        <button
                            onClick={() => openModal('register')}
                            className="">
                            Registration
                        </button>
                        <button
                            onClick={() => openModal('login')}
                            className="">
                            Login
                        </button>
                    </>) : (
                    <>
                        <span className="">
                            Hello, {user.displayName || user.email}
                        </span>
                        <button
                            onClick={logoutUser}
                            className="">
                            Log Out
                        </button>
                    </>)}
                
                    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                        {mode === 'register' ? (
                            <RegisterForm onSuccess={() => setIsOpen(false)} />
                        ) : (<LoginForm onSuccess={() => setIsOpen(false)} />)}
                    </Modal>
            </div>
        </header>
    );
}