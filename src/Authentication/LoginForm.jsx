import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import { getAuth } from "firebase/auth";
import axios from "axios";

export default function LoginForm() {
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
      // const auth = getAuth();
      // const user = auth.currentUser;
      // if (user) {
      //   const uid = user.uid;
      //   console.log(uid)
      //   await sendUIDtoESP8266(uid);
      // }
      toast.success("Login successful!");
      navigate("/my-health");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // async function sendUIDtoESP8266(uid) {
  //   console.log(uid);
  //   const esp8266IP = "http://192.168.0.103"; // Replace with your ESP8266's IP address

  //   try {
  //     const response = await axios.post(`${esp8266IP}/storeUID`, { uid });
  //     console.log("UID sent to ESP8266:", response.data);
  //   } catch (error) {
  //     console.error("Error sending UID to ESP8266:", error);
  //   }
  // }

  return (
    <Card
      color="transparent"
      shadow={false}
      className="text-center bg-blue-gray-300 p-4 max-w-md mx-auto mt-10"
    >
      <Typography variant="h4" color="blue-gray">
        Sign In
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Nice to meet you! Enter your details to register.
      </Typography>
      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto"
        onSubmit={handleSignin}
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
          {loading ? "Loading..." : "Sign in"}
        </Button>

        <Link to="/">
          <Typography variant="small" color="gray" className="mt-2">
            Don't have any account? Signup
          </Typography>
        </Link>
      </form>
    </Card>
  );
}
