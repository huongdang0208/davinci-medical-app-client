import LoginForm from "../components/login";
import RegisterForm from "../components/register";
import Home from "../components/home"
import Profile from "../components/profile";
import { routerType } from "../types/router.types";
import CheckHealth from '../components/check-health/index';

const PagesData: routerType[] = [
  {
    path: "/",
    element: <Home />,
    title: "Trang chủ"
  },
  {
    path: "/dang-ki",
    element: <RegisterForm />,
    title: "Dang Ki"
  },
  {
    path: "/dang-nhap",
    element: <LoginForm />,
    title: "Dang nhap"
  },
  {
    path: '/profile',
    element: <Profile />,
    title: 'Thong tin'
  },
  {
    path: '/check',
    element: <CheckHealth />,
    title: 'Check health'
  }
];

export default PagesData;
