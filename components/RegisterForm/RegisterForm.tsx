import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/lib/validation";
import { registerUser } from "@/lib/firebase";

type FormData = {
    name: string;
    email: string;
    password: string;
}

interface RegisterFormProps {
    onSuccess: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
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
        <form onSubmit={handleSubmit(onSubmit)} className="">
            <div>
                <input
                    {...register("name")}
                    placeholder="Name"
                    className=""
                />
                <p className="">{errors.name?.message}</p>
            </div>
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
            <button
                type="submit"
                disabled={isSubmitting}
                className=""
            >
                Register
            </button>
        </form>
    );
};