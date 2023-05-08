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
import AllUser from "@/views/AllUser.vue";
import AdminDashboard from "@/views/class/admin/AdminDashboard.vue";
import TeacherClass from "@/views/class/admin/TeacherClass.vue";
import OperateTeacherClass from "@/views/class/admin/OperateTeacherClass.vue";
import Assignment from "@/views/class/admin/Assignment.vue";
import OperateAssignment from "@/views/class/admin/OperateAssignment.vue";
import UserClass from "@/views/class/user/UserClass.vue";
import MyClass from "@/views/class/user/MyClass.vue";
import MyAssignment from "@/views/class/user/MyAssignment.vue";
import { ElMessage } from "element-plus";
import axios from "axios";

function islogin(to, from, next) {
  if (!$cookies.get("token")) {
    ElMessage.error("請先登入以進行操作");
    next({ name: "Sign In" });
  } else {
    next();
  }
}

function isadmin(to, from, next) {
  return axios
    .post(
      "/api/auth/check/isadmin",
      {},
      {
        headers: {
          Authorization: `Bearer ` + $cookies.get("token"),
        },
      }
    )
    .then((response) => {
      if (response.data.check == 1 || response.data.check == 2) {
        next();
      } else {
        next("/");
        ElMessage.error("權限不符");
      }
    });
}

function class_auth(to, from, next) {
  return axios
    .post(
      "/api/class/admin/get_assignment",
      {},
      {
        headers: {
          Authorization: `Bearer ` + $cookies.get("token"),
        },
      }
    )
    .then((response) => {
      if (response.data.check == 1 || response.data.check == 2) {
        next();
      } else {
        next("/");
        ElMessage.error("權限不符");
      }
    });
}

function user_post_check(to, from, next) {
  const post_id = to.params.post_id;
  return axios
    .post(
      "/api/forum/check/user_post_check",
      {
        post_id: post_id,
      },
      {
        headers: {
          Authorization: `Bearer ` + $cookies.get("token"),
        },
      }
    )
    .then((response) => {
      if (response.data.check) {
        next();
      } else {
        next("/");
        ElMessage.error("權限不符");
      }
    });
}

const routes = [
  {
    // path: "*",
    path: "/:catchAll(.*)",
    name: "NotFound",
    redirect: "/home",
  },
  {
    path: "/",
    name: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Dashboard",
    component: Dashboard,
  },

  {
    path: "/upload",
    name: "Upload",
    component: Upload,
    beforeEnter: islogin,
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
    beforeEnter: [islogin, user_post_check],
  },
  {
    path: "/profile/:user_account?",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/alluser",
    name: "AllUser",
    component: AllUser,
  },
  {
    path: "/userclass",
    name: "UserClass",
    component: UserClass,
    beforeEnter: islogin,
  },
  {
    path: "/myclass",
    name: "MyClass",
    component: MyClass,
    beforeEnter: islogin,
  },
  {
    path: "/myassignment/:coding_class_id?",
    name: "MyAssignment",
    component: MyAssignment,
    beforeEnter: islogin,
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
        beforeEnter: islogin,
      },
      {
        path: "edit_pic",
        name: "EditPic",
        component: EditPic,
        beforeEnter: islogin,
      },
      {
        path: "edit_cover",
        name: "EditCover",
        component: EditCover,
        beforeEnter: islogin,
      },
      {
        path: "edit_password",
        name: "EditPassword",
        component: EditPassword,
        beforeEnter: islogin,
      },
    ],
  },
  {
    path: "/admin",
    name: "Admin",
    beforeEnter: [islogin, isadmin],
    children: [
      {
        path: "/:catchAll(.*)",
        name: "NotFound",
        redirect: "/admin/home",
      },
      {
        path: "",
        name: "",
        redirect: "/admin/home",
      },
      {
        path: "home",
        name: "AdminDashboard",
        component: AdminDashboard,
      },
      {
        path: "teacherclass",
        name: "TeacherClass",
        component: TeacherClass,
      },
      {
        path: "teacherclass/operate/:coding_class_id?",
        name: "OperateTeacherClass",
        component: OperateTeacherClass,
      },
      {
        path: "assignment/:coding_class_id?",
        name: "Assignment",
        component: Assignment,
      },
      {
        path: "assignment/:coding_class_id?/operate/:assignment_id?",
        name: "OperateAssignment",
        component: OperateAssignment,
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
