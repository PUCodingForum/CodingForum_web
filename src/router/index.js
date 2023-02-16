import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Tables from "@/views/Tables.vue";
import Billing from "@/views/Billing.vue";
import Profile from "@/views/Profile.vue";
import SignIn from "@/views/user/SignIn.vue";
import SignUp from "@/views/user/SignUp.vue";
import ForgetPassword from "@/views/user/ForgetPassword.vue";
import ResetPassword from "@/views/user/ResetPassword.vue";
import ResendPassword from "@/views/user/ResendPassword.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },

  {
    path: "/auth",
    name: "auth",
    children: [
      {
        path: "sign-in",
        name: "Sign In",
        component: SignIn,
      },
      {
        path: "sign-up",
        name: "Sign Up",
        component: SignUp,
      },
      {
        path: "forget_password",
        name: "forget_password",
        component: ForgetPassword,
      },
      {
        path: "reset_password/:token",
        name: "reset_password",
        component: ResetPassword,
      },
      {
        path: "resend_password",
        name: "resend_password",
        component: ResendPassword,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
