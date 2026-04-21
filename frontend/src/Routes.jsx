import React, { useEffect } from "react";
import { useNavigate, useRoutes } from 'react-router-dom'

// Pages List
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/user/Profile";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import CreateRepo from "./components/repo/CreateRepo";
import Repo from "./components/repo/Repo";

import PullRequests from "./components/PullRequests";
import Issues from "./components/Issues";
import Codespaces from "./components/Codespaces";
import Marketplace from "./components/Marketplace";
import Explore from "./components/Explore";

// Auth Context
import { useAuth } from "./authContext";

const ProjectRoutes = () => {
    const { currentUser, setCurrentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const userIdFromStorage = localStorage.getItem("userId");

        if (userIdFromStorage && !currentUser) {
            setCurrentUser(userIdFromStorage);
        }

        if (!userIdFromStorage && !["/auth", "/signup"].includes(window.location.pathname)) {
            navigate("/auth");
        }

        if (userIdFromStorage && window.location.pathname == '/auth') {
            navigate("/");
        }
    }, [currentUser, navigate, setCurrentUser]);

    let element = useRoutes([
        {
            path: "/",
            element: <Dashboard />
        },
        {
            path: "/auth",
            element: <Login />
        },
        {
            path: "/signup",
            element: <Signup />
        },
        {
            path: "/profile",
            element: <Profile />
        },
        {
            path: "/create",
            element: <CreateRepo />
        },
        {
            path: "/repo",
            element: <Repo />
        },
        {
            path: "/pulls",
            element: <PullRequests />
        },
        {
            path: "/issues",
            element: <Issues />
        },
        {
            path: "/codespaces",
            element: <Codespaces />
        },
        {
            path: "/marketplace",
            element: <Marketplace />
        },
        {
            path: "/explore",
            element: <Explore />
        }
    ]);

    return element;
}

export default ProjectRoutes;