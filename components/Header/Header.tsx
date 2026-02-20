"use client";

import { useState } from "react";
import { Modal } from "../Modal/Modal";
import { RegisterForm } from "../RegisterForm/RegisterForm";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <header className="">
            <div className="">
                <p>HEADER</p>
                <button
                    onClick={() => setIsOpen(true)}
                    className="">
                    Registration
                </button>

                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <h2>Registration</h2>
                    <p>Thank you for your interest in our platform! In order to register, we need some information.
                        Please provide us with the following information</p>
                    <RegisterForm onSuccess={() => setIsOpen(false)} />
                </Modal>
            </div>
        </header>
    );
}