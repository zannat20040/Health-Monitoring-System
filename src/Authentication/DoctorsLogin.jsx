import { Button } from "@material-tailwind/react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../AuthProvider/AuthProvider";
import axios from "axios"; // Import axios

export default function DoctorsLogin() {
  const { loginWithPass, loading, setLoading } = useContext(AuthContext); // Access login function and loading state
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const pass = form.pass.value;
    const hospitalId = form.hospitalId.value;

    setLoading(true);
    try {
      // Firebase Authentication
      await loginWithPass(email, pass);
      toast.success("Login successful!");

      // Fetch additional data from API if login succeeds
      const response = await axios.get(
        `http://localhost:5000/api/get-all-data/${hospitalId}`
      );

      if (response.status === 200 && response.data) {
        // Navigate to the health data page after successful login and data fetch
        navigate("/doctors/patients", { state: { data: response.data } });
      } else {
        toast.error("Failed to fetch data from server.");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-primary min-h-screen">
      <div className="flex gap-10 justify-center max-w-md m-auto items-center min-h-screen p-5">
        <div className="bg-white p-8 w-full flex flex-col justify-center rounded">
          <h2 className="text-primary text-3xl font-semibold tracking-tight">
            Sign In As Doctor
          </h2>
          <p className="text-gray-700">
            Welcome back! Please enter your credentials to continue.
          </p>
          <form onSubmit={handleSignin} className="mt-16">
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
                className="flex border-2 hover:border-primary bg-gray-100 outline-none border-gray-400 w-full rounded-md px-3 py-2 text-sm focus:border-primary dark:border-zinc-700"
                placeholder="Username"
                type="email"
                required
              />

              <label
                htmlFor="hospitalId"
                className="font-medium text-sm tracking-wider"
              >
                Hospital ID<span className="text-primary1"> *</span>
              </label>
              <input
                name="hospitalId"
                id="hospitalId"
                className="flex border-2 hover:border-primary bg-gray-100 outline-none border-gray-400 w-full rounded-md px-3 py-2 text-sm focus:border-primary dark:border-zinc-700"
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
                className="flex border-2 hover:border-primary bg-gray-100 outline-none border-gray-400 w-full rounded-md px-3 py-2 text-sm focus:border-primary dark:border-zinc-700"
                placeholder="Password"
                type="password"
                required
              />
            </div>

            <Button
              type="submit"
              className="bg-primary w-full font-normal tracking-wider"
            >
              {loading ? "Loading..." : "Continue"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
