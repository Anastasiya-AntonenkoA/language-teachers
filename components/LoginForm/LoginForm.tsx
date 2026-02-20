import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/lib/validation";
import { loginUser } from "@/lib/firebase";

type LoginData = {
    email: string;
    password: string;
};

interface LoginFormProps {
    onSuccess: () => void;
};

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
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
        <form onSubmit={handleSubmit(onSubmit)} className="">
            <h2 className="">Log In</h2>
            <p>Welcome back! Please enter your credentials to access your account and continue your search for an teacher.</p>
            <div>
                <input
                    {...register("email")}
                    type="email"
                    placeholder="Email"
                    className=""
                />
                <p className="">{errors.email?.message}</p>
            </div>
            <div>
                <input
                    {...register("password")}
                    type="password"
                    placeholder="Password"
                    className=""
                />
                <p className="">{errors.password?.message}</p>
            </div>
            <button type="submit" disabled={isSubmitting} className="">
                Log In
            </button>
        </form>
    )
}