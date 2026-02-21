import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/lib/validation";
import { registerUser } from "@/lib/firebase";

import { useState } from "react";
import css from "./RegisterForm.module.css";

type FormData = {
    name: string;
    email: string;
    password: string;
}

interface RegisterFormProps {
    onSuccess: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: yupResolver(registerSchema),
    });

    const onSubmit = async (data: FormData) => {
        try {
            await registerUser(data.name, data.email, data.password);
            onSuccess();
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unexpected error"
            alert(message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
            <h2 className={css.title}>Registration</h2>
            <p className={css.text}>
                Thank you for your interest in our platform! In order to register, we need some information. 
                Please provide us with the following information.
            </p>

            <div className={css.inputWrapper}>
                <input
                    {...register("name")}
                    placeholder="Name"
                    className={`${css.input} ${errors.name ? css.inputError : ""}`}
                />
                {errors.name && <p className={css.errorMessage}>{errors.name.message}</p>}
            </div>

            <div className={css.inputWrapper}>
                <input
                    {...register("email")}
                    type="email"
                    placeholder="Email"
                    className={`${css.input} ${errors.email ? css.inputError : ""}`}
                />
                {errors.email && <p className={css.errorMessage}>{errors.email.message}</p>}
            </div>

            <div className={css.inputWrapper}>
                <div className={css.passwordContainer}>
                    <input
                        {...register("password")}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className={`${css.input} ${errors.password ? css.inputError : ""}`}
                    />
                    <button 
                        type="button" 
                        className={css.eyeBtn}
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        <svg width="20" height="20">
                            <use href={`/icons/sprite.svg#icon-${showPassword ? 'eye' : 'eye-off'}`} />
                        </svg>
                    </button>
                </div>
                {errors.password && <p className={css.errorMessage}>{errors.password.message}</p>}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className={css.submitBtn}
            >
                Sign Up
            </button>
        </form>
    );
};