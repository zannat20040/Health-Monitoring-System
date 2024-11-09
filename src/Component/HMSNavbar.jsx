import {
  Button,
  IconButton,
  MobileNav,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import React, { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

export default function HMSNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
  const { signOutProfile, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const HandleLogout = () => {
    signOutProfile()
      .then(() => {
        navigate("/");
        toast("Logged out successfully!");
      })
      .catch((error) => {
        toast(error.message);
      });
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 pt-6 lg:pt-0 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Link to={"/user/my-health"}>
        <Typography
          variant="small"
          color="blue-gray"
          className="p-1 font-normal text-black hover:text-primary   duration-500"
        >
          My Current Health
        </Typography>
      </Link>
      <Link to={"/user/records"}>
        <Typography
          variant="small"
          color="blue-gray"
          className="p-1 font-normal text-black hover:text-primary   duration-500"
        >
          Health Records
        </Typography>
      </Link>
    </ul>
  );

  return (
    <div className=" max-h-[768px] sticky top-0 left-0  z-10 ">
      <Navbar className="h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between gap-5 text-blue-gray-900">
          <Typography className="sm:block hidden mr-4 cursor-pointer py-1.5 font-semibold text-primary">
            HealthGuard
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
          </div>
          <div className="flex gap-2">
            <div className="flex gap-2 items-center justify-between">
              <div className="text-sm text-end">
                <h1>Your DeviceId</h1>
                <h1>{user?.email}</h1>
              </div>
              <div className="avatar">
                <div className="w-10 rounded">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="Tailwind-CSS-Avatar-component"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-x-1">
              <Button
                onClick={HandleLogout}
                className="hidden lg:inline-block bg-primary rounded  font-normal"
              >
                Logout
              </Button>
            </div>
            <IconButton
              variant="text"
              className="ml-auto p-5  !bg-violet rounded  h-6 w-6 text-inherit active:bg-violet lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6  text-white "
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white "
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav} className="">
          {navList}
          <div className="flex items-center gap-x-1">
            <Button
              onClick={HandleLogout}
              className="bg-primary rounded font-normal"
            >
              Logout
            </Button>
          </div>
        </MobileNav>
      </Navbar>
    </div>
  );
}
