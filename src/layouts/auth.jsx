import { Routes, Route } from "react-router-dom";
import {
  ChartPieIcon,
  UserIcon,
  UserPlusIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { Navbar, Footer } from "@/widgets/layout";

import { SignIn } from "@/pages/auth";

export function Auth() {
  const navbarRoutes = [
  
    {
      
      title: "auth pages",
      layout: "auth",
      pages: [
      {
        icon: ArrowRightOnRectangleIcon,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
     
    ]}
  
  
  ];

  return (
    <div className="relative min-h-screen w-full">
      <Routes>
        {navbarRoutes.map(
          ({ layout, pages }) =>
            layout === "auth" &&
            pages.map(({ path, element }) => (
              <Route exact path={path} element={element} />
            ))
        )}
      </Routes>
    </div>
  );
}

Auth.displayName = "/src/layout/Auth.jsx";

export default Auth;
