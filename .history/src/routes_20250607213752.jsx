import React, { useContext } from "react";
import {
  HomeIcon,
  UserCircleIcon,
  ChatBubbleLeftIcon,
  UserGroupIcon,TruckIcon
} from "@heroicons/react/24/solid";
import { Home, Profile, Chat, Users, Expert, Garge, Fraud,Accidents } from "@/pages/dashboard";
import AuthContext from "@/auth/context";
import Gestionnaire from "./pages/dashboard/gestionnaire";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const useRoutes = () => {
  const { admin } = useContext(AuthContext);


 const AdminPages = [
    // {
    //   icon: <HomeIcon {...icon} />,
    //   name: "dashboard",
    //   path: "/home",
    //   element: <Home />,
    // },
      {
      icon: <UserGroupIcon {...icon} />,
       name: "Assuré",
      path: "/assures",
      element: <Users />,
    },
 
   {
      icon: <TruckIcon {...icon} />,
      name: "Accidents",
      path: "/accidents",
      element: <Accidents />,
    },
  

     {
      icon: <UserGroupIcon {...icon} />,
      name: "fraude",
      path: "/fraud",
      element: <Fraud />,
    },

     {
      icon: <UserGroupIcon {...icon} />,
      name: "Gestionnaires",
      path: "/gestionnaires",
      element: <Gestionnaire />,
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


  const gestionnairePages = [
   
      {
      icon: <UserGroupIcon {...icon} />,
       name: "Assuré",
      path: "/assures",
      element: <Users />,
    },
       {
      icon: <TruckIcon {...icon} />,
      name: "Accidents",
      path: "/accidents",
      element: <Accidents />,
    },
    {
      icon: <ChatBubbleLeftIcon {...icon} />,
      name: "message",
      path: "/message",
      element: <Chat />,
    },
  
  

     {
      icon: <UserGroupIcon {...icon} />,
      name: "fraude",
      path: "/fraud",
      element: <Fraud />,
    },
 
  
  ];


  const expertPages = [


       {
      icon: <UserGroupIcon {...icon} />,
      name: "Assuré",
      path: "/assures",
      element: <Users />,
    },
    
     {
      icon: <TruckIcon {...icon} />,
      name: "Accidents",
      path: "/accidents",
      element: <Accidents />,
    },
    {
      icon: <ChatBubbleLeftIcon {...icon} />,
      name: "message",
      path: "/message",
      element: <Chat />,
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
if(admin.role==="Admin"){
    selectedPages = AdminPages;
}
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
