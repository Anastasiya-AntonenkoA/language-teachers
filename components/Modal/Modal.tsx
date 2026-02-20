import { ReactNode, useEffect } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    useEffect(() => {
        const haldleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", haldleEsc);
        return () => window.removeEventListener("keydown", haldleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className="" onClick={onClose}>
            <div className="" onClick={(e) => e.stopPropagation()}>
                <button className="" onClick={onClose}>✕</button>
                {children}
            </div>
        </div>
    )
}