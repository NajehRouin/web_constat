import React, { useContext } from "react";
import {
  HomeIcon,
  UserCircleIcon,
  ChatBubbleLeftIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Chat, Users, Expert, Garge, Fraud } from "@/pages/dashboard";
import AuthContext from "@/auth/context";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const useRoutes = () => {
  const { admin } = useContext(AuthContext);

  const gestionnairePages = [
    {
      icon: <HomeIcon {...icon} />,
      name: "dashboard",
      path: "/home",
      element: <Home />,
    },
    {
      icon: <ChatBubbleLeftIcon {...icon} />,
      name: "message",
      path: "/message",
      element: <Chat />,
    },
    // {
    //   icon: <UserCircleIcon {...icon} />,
    //   name: "profile",
    //   path: "/profile",
    //   element: <Profile />,
    // },
    {
      icon: <UserGroupIcon {...icon} />,
      name: "Users",
      path: "/users",
      element: <Users />,
    },

     {
      icon: <UserGroupIcon {...icon} />,
      name: "fraude",
      path: "/fraud",
      element: <Fraud />,
    },
    {
      icon: <UserGroupIcon {...icon} />,
      name: "Experts",
      path: "/experts",
      element: <Expert />,
    },
    {
      icon: <UserGroupIcon {...icon} />,
      name: "Grages",
      path: "/grages",
      element: <Garge />,
    },
  ];

  const expertPages = [
    {
      icon: <ChatBubbleLeftIcon {...icon} />,
      name: "message",
      path: "/message",
      element: <Chat />,
    },

    {
      icon: <UserGroupIcon {...icon} />,
      name: "Users",
      path: "/users",
      element: <Users />,
    },
  ];

  const gragePages = [
    {
      icon: <ChatBubbleLeftIcon {...icon} />,
      name: "message",
      path: "/message",
      element: <Chat />,
    },
  ];

  let selectedPages = [];

  if (admin?.role === "gestionnaire") {
    selectedPages = gestionnairePages;
  } else if (admin?.role === "expert") {
    selectedPages = expertPages;
  } else if (admin?.role === "grage") {
    selectedPages = gragePages;
  }

  const routes = [
    {
      layout: "dashboard",
      pages: selectedPages,
    },
  ];

  return routes;
};
