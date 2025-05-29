import React, { useContext } from "react";
import {
  HomeIcon,
  UserCircleIcon,
  ChatBubbleLeftIcon,
  UserGroupIcon,
  TruckIcon,
  ShieldExclamationIcon,
  WrenchScrewdriverIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Chat, Users, Expert, Garage, Fraud, Accidents } from "@/pages/dashboard";
import AuthContext from "@/auth/context";

// Icon configuration for consistent styling
const icon = {
  className: "w-5 h-5 text-inherit",
};

// Pages for Admin role
const AdminPages = [
  {
    icon: <HomeIcon {...icon} />,
    name: "Dashboard",
    path: "/home",
    element: <Home />,
  },
  {
    icon: <UserGroupIcon {...icon} />,
    name: "Assuré",
    path: "/assures",
    element: <Users />,
  },
  {
    icon: <ChatBubbleLeftIcon {...icon} />,
    name: "Messages",
    path: "/message",
    element: <Chat />,
  },
  {
    icon: <ShieldExclamationIcon {...icon} />,
    name: "Fraude",
    path: "/fraud",
    element: <Fraud />,
  },
  {
    icon: <ClipboardDocumentListIcon {...icon} />,
    name: "Experts",
    path: "/experts",
    element: <Expert />,
  },
  {
    icon: <WrenchScrewdriverIcon {...icon} />,
    name: "Garages",
    path: "/garages",
    element: <Garage />,
  },
];

// Pages for Gestionnaire role
const gestionnairePages = [
  {
    icon: <HomeIcon {...icon} />,
    name: "Dashboard",
    path: "/home",
    element: <Home />,
  },
  {
    icon: <UserGroupIcon {...icon} />,
    name: "Assuré",
    path: "/assures",
    element: <Users />,
  },
  {
    icon: <ChatBubbleLeftIcon {...icon} />,
    name: "Messages",
    path: "/message",
    element: <Chat />,
  },
  {
    icon: <ShieldExclamationIcon {...icon} />,
    name: "Fraude",
    path: "/fraud",
    element: <Fraud />,
  },
  {
    icon: <ClipboardDocumentListIcon {...icon} />,
    name: "Experts",
    path: "/experts",
    element: <Expert />,
  },
  {
    icon: <WrenchScrewdriverIcon {...icon} />,
    name: "Garages",
    path: "/garages",
    element: <Garage />,
  },
];

// Pages for Expert role
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
    name: "Messages",
    path: "/message",
    element: <Chat />,
  },
];

// Pages for Garage role
const garagePages = [
  {
    icon: <ChatBubbleLeftIcon {...icon} />,
    name: "Messages",
    path: "/message",
    element: <Chat />,
  },
  {
    icon: <WrenchScrewdriverIcon {...icon} />,
    name: "Garages",
    path: "/garages",
    element: <Garage />,
  },
];

// Role-to-pages mapping
const rolePagesMap = {
  Admin: AdminPages,
  gestionnaire: gestionnairePages,
  expert: expertPages,
  garage: garagePages, // Corrected from 'grage' to 'garage'
};

export const useRoutes = () => {
  const { admin } = useContext(AuthContext);

  // Select pages based on role, default to empty array if role is invalid
  const selectedPages = rolePagesMap[admin?.role] || [];

  const routes = [
    {
      layout: "dashboard",
      pages: selectedPages,
    },
  ];

  return routes;
};