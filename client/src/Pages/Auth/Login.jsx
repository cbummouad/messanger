import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseUserContext } from "../../context/UserContext";
import { UserApi } from "../../service/UserApi";
import logo from '../../assets/Facebook_Messenger_logo_2018.svg.png';
import '../styles/login.css';
import { Link } from "react-router-dom";
const formSchema = z.object({
  email: z.string().email().max(50).min(2),
  password: z.string().min(8).max(30),
});

export default function Login() {
  const { login, setAuthenticated, setToken, setUser, user } = UseUserContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values) => {
    try {
      const res = await login(values);
      if (res) {
        setUser(res.data);
        setToken(res.token);
        setAuthenticated(true);
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
          {user && <p>{user.name}</p>}
          <h1 id="form-title">Sign In</h1>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="textbox">
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email")}
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>
            <div className="textbox">
              <input
                type="password"
                placeholder="Enter your password"
                {...register("password")}
              />
              {errors.password && <p className="error">{errors.password.message}</p>}
            </div>
            <button
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Logging in..." : "Sign In"}
            </button>
          </form>
          <a>Forgot password?</a>
          <footer>
            Need an account? Sign up <Link >here</Link>
          </footer>
        </div>
      </div>
    </div>
  );
}