import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Upload from "@/views/Upload.vue";
import Edit from "@/views/Edit.vue";
import Video from "@/views/Video.vue";
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
    path: "/upload",
    name: "Upload",
    component: Upload,
  },
  {
    path: "/video/:post_id?",
    name: "Video",
    component: Video,
  },
  {
    path: "/edit/:post_id?",
    name: "Edit",
    component: Edit,
  },
  {
    path: "/profile/:user_account?",
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
        path: "reset_password/:reset_password_token",
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
  // scrollBehavior() {
  //   document.getElementById("app").scrollIntoView({ behavior: "smooth" });
  // },
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

export default router;
