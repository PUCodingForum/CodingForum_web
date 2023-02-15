<!-- <template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <navbar is-blur="blur blur-rounded my-3 py-2 start-0 end-0 mx-4 shadow" btn-background="bg-gradient-success"
          :dark-mode="true" />
      </div>
    </div>
  </div>
  <main class="mt-0 main-content main-content-bg">
    <section>
      <div class="page-header min-vh-75">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-6 d-flex flex-column">
              <div class="mt-8 card card-plain">
                <div class="pb-0 card-header text-start">
                  <h3 class="font-weight-bolder text-success text-gradient">
                    歡迎回來! </h3>
                  <p>讓我們繼續展開學習之旅吧!</p>
                </div>

                <div class="card-body">
                  <form role="form" @submit.prevent="login">
                    <label>帳號</label>
                    <input class="form-control" v-model="account" id="account" type="text" placeholder="請輸入帳號"
                      name="account" />
                    <label>密碼</label>
                    <input class="form-control" v-model="password" id="password" type="password" placeholder="請輸入密碼"
                      name="password" />
                    <el-switch v-model="remember_me" active-text="記住我" />

                    <div class="text-center">
                      <soft-button class="my-4 mb-2" variant="gradient" color="success" full-width>登入
                      </soft-button>
                    </div>
                  </form>
                </div>
                <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                    忘記密碼了嗎?
                    <router-link :to="{ name: 'forget_password' }" class="text-success text-gradient font-weight-bold">
                      修改密碼</router-link>
                  </p>
                  <p class="mx-auto mb-4 text-sm">
                    還沒有帳號嗎?
                    <router-link :to="{ name: 'Sign Up' }" class="text-success text-gradient font-weight-bold">
                      註冊</router-link>
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="top-0 oblique position-absolute h-100 d-md-block d-none me-n8">
                <div class="bg-cover oblique-image position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6" :style="{
                  backgroundImage:
                    'url(' +
                    require('@/assets/img/curved-images/curved9.jpg') +
                    ')',
                }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <app-footer />
</template> -->

<template>
  <navbar btn-background="bg-gradient-primary" />
  <div class="pt-5 m-3 page-header align-items-start min-vh-50 pb-11 border-radius-lg" :style="{
    backgroundImage:
      'url(' + require('@/assets/img/curved-images/curveda' + randompic + '.jpg') + ')',
  }">
    <span class="mask bg-gradient-dark opacity-6"></span>
    <div class="container">
      <div class="row justify-content-center">
        <div class="mx-auto text-center col-lg-5">
          <h1 class="mt-5 mb-2 text-white">歡迎回來!</h1>
          <p class="text-white text-lead">
            讓我們繼續展開學習之旅吧!
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
            <form role="form" @submit.prevent="login">
              <div class="mb-3">
                <label>帳號</label>
                <input class="form-control" v-model="account" id="account" type="text" placeholder="請輸入帳號"
                  name="account" />
              </div>
              <div class="mb-3">
                <label>密碼</label>
                <input class="form-control" v-model="password" id="password" type="password" placeholder="請輸入密碼"
                  name="password" />
              </div>
              <el-switch v-model="remember_me" active-text="記住我" />

              <div class="text-center">
                <soft-button color="dark" full-width variant="gradient" class="my-4 mb-2">登入</soft-button>
              </div>
              <p class="text-sm mt-3 mb-0">
                忘記密碼了嗎?
                <router-link :to="{ name: 'forget_password' }" class="text-dark font-weight-bolder">
                  修改密碼
                </router-link>
              </p>
              <p class="text-sm mt-3 mb-0">
                還沒有帳號嗎?
                <router-link :to="{ name: 'Sign Up' }" class="text-dark font-weight-bolder">
                  註冊
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
import SoftSwitch from "@/components/SoftSwitch.vue";
import SoftButton from "@/components/SoftButton.vue";
const body = document.getElementsByTagName("body")[0];
import { mapMutations } from "vuex";
import { ElMessage } from "element-plus";

export default {
  name: "SignIn",
  components: {
    Navbar,
    AppFooter,
    SoftSwitch,
    SoftButton,
  },
  data() {
    return {
      account: this.$cookies.get("account"),
      password: this.$cookies.get("password"),
      remember_me: true,
      randompic: Math.floor(Math.random() * 9)

    };
  },
  created() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    body.classList.add("bg-gray-100");
  },
  methods: {
    ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),
    login() {
      this.axios
        .post("/api/auth/login", {
          account: this.account,
          password: this.password,
        })
        .then((res) => {
          if (this.remember_me == true) {
            this.$cookies.set("account", this.account, "2d");
            this.$cookies.set("password", this.password, "2d");
          } else {
            // if (this.$cookies.isKey(account) && this.$cookies.isKey(password)) {
            this.$cookies.remove("account");
            this.$cookies.remove("password");
            // }
          }
          console.log(res);
          const token = res.data.token;
          this.$cookies.set("token", token, "1h");
          this.$router.push({ name: 'Profile' });
          ElMessage({
            message: "登入成功",
            type: "success",
            duration: 3000,
          });
          this.$emit('keytest');
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.status);
            if (error.response.status == "401") {
              ElMessage.error("帳密錯誤");
            }
          }
        });

    },
  },
};
</script>
