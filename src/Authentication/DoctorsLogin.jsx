import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../AuthProvider/AuthProvider";

export default function DoctorsLogin() {
  const { createWithPass, loading, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const { loginWithPass } = useContext(AuthContext);

  const handleSignin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const pass = form.pass.value;

    setLoading(true);
    try {
      await loginWithPass(email, pass);

      toast.success("Login successful!");
      navigate("/user/my-health");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" bg-primary min-h-screen  ">
      <div className="flex flex-col-reverse md:grid grid-cols-2 gap-10 justify-between max-w-7xl mx-auto items-center">
        <div className="bg-white p-8 md:min-h-screen  w-full flex flex-col justify-center ">
          {/* Left side form */}
          <h2 className="text-primary  text-3xl font-semibold tracking-tight">
         Sign In As Doctor
          </h2>
          <p className="text-gray-700 ">
            Welcome back! Please enter your credentials to continue.
          </p>
          <form onSubmit={handleSignin} className="mt-16 ">
            <div className="mb-4 flex flex-col gap-y-2">
              <label
                htmlFor="email"
                className="font-medium text-sm tracking-wider"
              >
                Your Email<span className="text-primary1"> *</span>
              </label>


              <input
                name="email"
                id="email"
                className="flex border-2 hover:border-primary border-transparent bg-gray-100 outline-none border-gray-400 w-full rounded-md  px-3 py-2 text-sm focus:border-primary dark:border-zinc-700 "
                placeholder="Username"
                type="email"
                required
              />

              <label
                htmlFor="email"
                className="font-medium text-sm tracking-wider"
              >
               Hospital ID<span className="text-primary1"> *</span>
              </label>

              <input
                name="hospitalId"
                id="hospitalId"
                className="flex border-2 hover:border-primary border-transparent bg-gray-100 outline-none border-gray-400 w-full rounded-md  px-3 py-2 text-sm focus:border-primary dark:border-zinc-700 "
                placeholder="Hospital ID"
                type="text"
                required
              />
              



              <label
                htmlFor="pass"
                className="font-medium text-sm tracking-wider mt-2"
              >
                Your Password<span className="text-primary1"> *</span>
              </label>
              <input
                id="pass"
                name="pass"
                className="flex border-2 hover:border-primary border-transparent bg-gray-100 outline-none border-gray-400 w-full rounded-md  px-3 py-2 text-sm focus:border-primary dark:border-zinc-700 "
                placeholder="Password"
                type="pass"
                required
              />
            </div>

            <Button
              type="submit"
              className="bg-primary w-full font-normal tracking-wider "
            >
              {loading ? "loading..." : "Continue"}
            </Button>
          </form>
        </div>
        {/* Right side content */}
       
      </div>
    </div>
  );
}