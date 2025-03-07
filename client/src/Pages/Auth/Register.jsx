import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserApi } from "../../service/UserApi";
import logo from '../../assets/Facebook_Messenger_logo_2018.svg.png';
import '../styles/login.css';
import { Link } from "react-router-dom";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email().max(50).min(2),
  password: z.string().min(8).max(30),
  password_confirmation: z.string().min(8).max(30),
});

export default function Register() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values) => {
    try {
      const res = await UserApi.createUser(values);
      if (res) {
        alert("Registration successful! Please check your email to verify your account.");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log(error);
      } else {
        setError('email', {
          type: 'manual',
          message: 'An unexpected error occurred',
        });
      }
      console.log(error);
    }
  };

  return (
    <div className="login">
      <div className="background"></div>
      <div className="card">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="card-content">
          <h1 id="form-title">Create Account</h1>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            {/* Name Field */}
            <div className="textbox">
              <input
                type="text"
                placeholder="Enter your name"
                {...register("name")}
              />
              {errors.name && <p className="error">{errors.name.message}</p>}
            </div>

            {/* Email Field */}
            <div className="textbox">
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email")}
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div className="textbox">
              <input
                type="password"
                placeholder="Enter your password"
                {...register("password")}
              />
              {errors.password && <p className="error">{errors.password.message}</p>}
            </div>

            {/* Password Confirmation Field */}
            <div className="textbox">
              <input
                type="password"
                placeholder="Confirm your password"
                {...register("password_confirmation")}
              />
              {errors.password_confirmation && (
                <p className="error">{errors.password_confirmation.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
            >
              {isSubmitting ? "Creating account..." : "Register"}
            </button>
          </form>
          <footer>
            Already have an account? <Link to="/login">Sign in here</Link>
          </footer>
        </div>
      </div>
    </div>
  );
}