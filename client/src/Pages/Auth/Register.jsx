
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserApi } from "../../service/UserApi";


const formSchema = z.object({
    name:z.string(),
  email: z.string().email().max(50).min(2),
  password: z.string().min(8).max(30),
  password_confirmation :z.string().min(8).max(30),
});
export default function Register() {
    


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
            const res = await UserApi.createUser(values);      
            if (res) {
              alert(res.message)
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                <input
                  {...register("name")}  
                  placeholder="Enter your name"
                  className="p-4 w-full rounded-md shadow-lg border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all"
                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
              </div>
              <div>
                <input
                  {...register("email")}  
                  placeholder="Enter your email"
                  className="p-4 w-full rounded-md shadow-lg border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all"
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>
        
              <div>
                <input
                  {...register("password")}  
                  type="password"
                  placeholder="Enter your password"
                  className="p-4 w-full rounded-md shadow-lg border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all"
                />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
              </div>

                <div>
                <input
                  {...register("password_confirmation")}  
                  type="password"
                  placeholder="Enter your password confirmation"
                  className="p-4 w-full rounded-md shadow-lg border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all"
                />
                {errors.password_confirmation && <p className="text-red-500">{errors.password_confirmation.message}</p>}
              </div>
              
        
              <div className="flex justify-between items-center">
                <button
                  className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? "please wiat..." : "Register"}
                </button>
              </div>
            </form>
    );
}
