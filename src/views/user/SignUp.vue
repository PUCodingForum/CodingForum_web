<template>
  <navbar btn-background="bg-gradient-primary" />
  <div class="pt-5 m-3 page-header align-items-start min-vh-50 pb-11 border-radius-lg" :style="{
    backgroundImage:
      'url(' + require('@/assets/img/curved-images/curved6.jpg') + ')',
  }">
    <span class="mask bg-gradient-dark opacity-6"></span>
    <div class="container">
      <div class="row justify-content-center">
        <div class="mx-auto text-center col-lg-5">
          <h1 class="mt-5 mb-2 text-white">Welcome!</h1>
          <p class="text-white text-lead">
            Use these awesome forms to login or create new account in your
            project for free.
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center">
      <div class="mx-auto col-xl-4 col-lg-5 col-md-7">
        <div class="card z-index-0">

          <div class="card-body">
            <form role="form" @submit.prevent="register">
              <div class="mb-3">
                <input class="form-control" v-model="account" type="text" placeholder="帳號" aria-label="帳號" />
              </div>
              <div class="mb-3">
                <input class="form-control" v-model="password" type="password" placeholder="密碼" aria-label="密碼" />
              </div>
              <div class="mb-3">
                <input class="form-control" v-model="email" type="email" placeholder="信箱" aria-label="信箱" />
              </div>
              <div class="mb-3">
                <input class="form-control" v-model="name" type="text" placeholder="中文姓名" aria-label="中文姓名" />
              </div>

              <div class="text-center">
                <soft-button color="dark" full-width variant="gradient" class="my-4 mb-2">註冊</soft-button>
              </div>
              <p class="text-sm mt-3 mb-0">
                已經有帳號了嗎?
                <router-link :to="{ name: 'Sign In' }" class="text-dark font-weight-bolder">
                  登入
                </router-link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <app-footer />
</template>

<script>
import Navbar from "@/examples/PageLayout/Navbar.vue";
import AppFooter from "@/examples/PageLayout/Footer.vue";
import SoftButton from "@/components/SoftButton.vue";

import { mapMutations } from "vuex";
import { ElMessage } from "element-plus";

export default {
  name: "SignupBasic",
  components: {
    Navbar,
    AppFooter,
    SoftButton,
  },
  data() {
    return {
      name: "",
      account: "",
      password: "",
      email: "",
    };
  },
  created() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },
  methods: {
    ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),
    register() {
      if (
        this.name === "" ||
        this.account === "" ||
        this.password === "" ||
        this.email === ""
      ) {
        ElMessage.error("名字、帳號、密碼、信箱不能為空");
      } else {
        this.axios
          .post("/api/auth/register", {
            name: this.name,
            account: this.account,
            password: this.password,
            email: this.email,
          })

          .then((res) => {
            console.log(res);
            this.$router.push("/profile");
          })

          .catch(function (error) {
            if (error.response) {
              console.log(error.response.status);
              if (error.response.status == "401") {
                ElMessage.error("資料填寫錯誤");
              } else if (error.response.status == "402") {
                ElMessage({
                  message: "帳號名稱重複!",
                  type: "warning",
                });
              }
            }
          });
      }
    },
  },
};
</script>
