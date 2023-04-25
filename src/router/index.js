import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Upload from "@/views/Upload.vue";
import EditPost from "@/views/EditPost.vue";
import Video from "@/views/Video.vue";
import Profile from "@/views/Profile.vue";
import SignIn from "@/views/user/SignIn.vue";
import SignUp from "@/views/user/SignUp.vue";
import ForgetPassword from "@/views/user/ForgetPassword.vue";
import ResetPassword from "@/views/user/ResetPassword.vue";
import ResendPassword from "@/views/user/ResendPassword.vue";
import EditUser from "@/views/user/EditUser.vue";
import EditPic from "@/views/user/EditPic.vue";
import EditCover from "@/views/user/EditCover.vue";
import EditPassword from "@/views/user/EditPassword.vue";

const routes = [
  {
    // path: "*",
    path: "/:catchAll(.*)",
    name: "NotFound",
    redirect: "/dashboard",
  },
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
    path: "/video/:post_id?/:comment_id?",
    name: "Video",
    component: Video,
  },
  {
    path: "/edit_post/:post_id?",
    name: "EditPost",
    component: EditPost,
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
      {
        path: "edit_user",
        name: "EditUser",
        component: EditUser,
      },
      {
        path: "edit_pic",
        name: "EditPic",
        component: EditPic,
      },
      {
        path: "edit_cover",
        name: "EditCover",
        component: EditCover,
      },
      {
        path: "edit_password",
        name: "EditPassword",
        component: EditPassword,
      },
    ],
  },
];

const router = createRouter({
  mode: "hash",
  // base: process.env.BASE_URL,
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
