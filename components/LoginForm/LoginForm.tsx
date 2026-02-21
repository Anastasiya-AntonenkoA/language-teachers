import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/lib/validation";
import { loginUser } from "@/lib/firebase";

import { useState } from "react";
import css from "./LoginForm.module.css";

type LoginData = {
    email: string;
    password: string;
};

interface LoginFormProps {
    onSuccess: () => void;
};

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors, isSubmitting } } =
        useForm<LoginData>({
            resolver: yupResolver(loginSchema),
        });
    
    const onSubmit = async (data: LoginData) => {
        try {
            await loginUser(data.email, data.password);
            onSuccess();
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unexpected error"
            alert(message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
            <h2 className={css.title}>Log In</h2>
            <p className={css.text}>Welcome back! Please enter your credentials to access your account and continue your search for an teacher.</p>
            <div className={css.inputWrapper}>
                <input
                    {...register("email")}
                    type="email"
                    placeholder="Email"
                    className={`${css.input} ${errors.email ? css.inputError : ""}`}
                />
                {errors.email && <p className={css.errorMessage}>{errors.email?.message}</p>}
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
                    aria-label="Toggle password visibility"
                >
                    <svg width="20" height="20">
                        <use href={`/icons/sprite.svg#icon-${showPassword ? 'eye' : 'eye-off'}`} />
                    </svg>
                </button>
                </div>
                {errors.password && <p className={css.errorMessage}>{errors.password?.message}</p>}
            </div>
            <button type="submit" disabled={isSubmitting} className={css.submitBtn}>
                Log In
            </button>
        </form>
    )
}