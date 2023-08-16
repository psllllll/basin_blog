import {useRoutes } from "react-router-dom";
import {RouteObject} from "./route";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register"
import Write from "../pages/Write/Write"
import Single from "../pages/Single/Single"
import Home from "../pages/Home/Home"
import Group from "../pages/Group/Group";

export const rootRouter: RouteObject[] = [
    {
        path: "/",
        element: <Home />,
        meta: {
            requiresAuth: false,
            title: "主页",
            key: "home"
        }
    },
    {
        path: "/group/:id",
        element: <Group />,
        meta: {
            requiresAuth: false,
            title: "博客组",
            key: "blogGroup"
        }
    },
    {
        path: "/login",
        element: <Login />,
        meta: {
            requiresAuth: false,
            title: "登录",
            key: "login"
        }
    },
    {
        path: "/register",
        element: <Register />,
        meta: {
            requiresAuth: false,
            title: "注册",
            key: "register"
        }
    },
    {
        path: "/home",
        element: <Home />,
        meta: {
            requiresAuth: false,
            title: "主页",
            key: "home"
        }
    },
    {
        path: "/write",
        element: <Write />,
        meta: {
            requiresAuth: false,
            title: "博客撰写",
            key: "write"
        }
    },
    {
        path: "/single/:id",
        element: <Single />,
        meta: {
            requiresAuth: false,
            title: "博客",
            key: "single"
        }
    },
];
const Router = () => {
    // @ts-ignore
    const routes = useRoutes(rootRouter);
    return routes;
};

export default Router;
