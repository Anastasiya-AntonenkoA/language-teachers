"use client";

import { useState } from "react";
import { Modal } from "../Modal/Modal";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import { LoginForm } from "../LoginForm/LoginForm";

type Mode = "register" | "login";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState<Mode>("register");

    const openModal = (selectedMode: Mode) => {
        setMode(selectedMode);
        setIsOpen(true);
    }

    return (
        <header className="">
            <div className="">
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

                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <h2 className="">
                        {mode === 'register' ? 'Register' : "Login"}
                    </h2>

                    {mode === 'register' ? (
                        <RegisterForm onSuccess={() => setIsOpen(false)} />
                    ) : (<LoginForm onSuccess={() => setIsOpen(false)} />)}
                </Modal>
            </div>
        </header>
    );
}