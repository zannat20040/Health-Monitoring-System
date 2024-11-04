import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import toast from "react-hot-toast";

export default function SimpleRegistrationForm() {
  const { createWithPass, loading, setLoading } = useContext(AuthContext);
  const navigate = useNavigate(); // Hook for navigation after signup

  const handleSignup = async (e) => {
    e.preventDefault();
    const form = e.target; // Get the form
    // const username = form.username.value; // Get username
    const email = form.email.value; // Get email
    const pass = form.pass.value; // Get password

    // Displaying the values in console (can be removed later)
    console.log(email, pass);

    // Set loading state
    setLoading(true);
    try {
      // Call createWithPass with username, email, and password
      await createWithPass(email, pass); // Adjust if necessary to include username if needed
      toast.success("Registration successful!"); // Show success message
      navigate("/my-health"); // Redirect to the dashboard or any other route
    } catch (error) {
      console.error("Registration error:", error); // Log the error
      toast.error("Registration failed: " + error.message); // Show error message
    } finally {
      // Reset loading state
      setLoading(false);
    }
  };

  return (
    <Card
      color="transparent"
      shadow={false}
      className="text-center bg-blue-gray-300 p-4 max-w-md mx-auto mt-10"
    >
      <Typography variant="h4" color="blue-gray">
        Sign Up
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Nice to meet you! Enter your details to register.
      </Typography>
      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto"
        onSubmit={handleSignup}
      >
        <div className="mb-1 flex flex-col gap-6">
          <Typography
            variant="h6"
            color="blue-gray"
            className="-mb-3 text-start"
          >
            Your Email
          </Typography>
          <Input
            required
            name="email"
            type="email"
            size="lg"
            placeholder="hms24@gmail.com"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography
            variant="h6"
            color="blue-gray"
            className="-mb-3 text-start"
          >
            Password
          </Typography>
          <Input
            required
            name="pass"
            type="password"
            size="lg"
            placeholder="********"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>

        <Button type="submit" className="mt-6" fullWidth>
          {loading ? "Loading..." : "Sign Up"}{" "}
          {/* Change button text based on loading state */}
        </Button>

        <Link to="/signin">
          {" "}
          {/* Redirect to login page if needed */}
          <Typography variant="small" color="gray" className="mt-2">
            Already have an account? Login
          </Typography>
        </Link>
      </form>
    </Card>
  );
}
