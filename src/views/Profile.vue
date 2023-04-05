<template>
  <div class="container-fluid">
    <div class="mt-4 page-header min-height-300 border-radius-xl" :style="{
      backgroundImage:
        'url(' + require('@/assets/img/curved-images/curved14.jpg') + ')',
      backgroundPositionY: '50%',
    }">
      <span class="mask bg-gradient-success opacity-6"></span>
    </div>
    <div class="mx-4 overflow-hidden card card-body blur shadow-blur mt-n6">
      <div class="row gx-4">
        <div class="col-auto">
          <div class="avatar avatar-xl position-relative">
            <img :src="user.pic_url" alt="" class="shadow-sm w-100 border-radius-lg" />
          </div>
        </div>
        <div class="col-auto my-auto">
          <div class="h-100">
            <h5 class="mb-1">{{ user.name }}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="py-4 container-fluid">
    <infinite-scroll @infinite-scroll="loadDataFromServer" :message="message" :noResult="noResult">

      <div class="mt-3 row">

        <!-- 設定 -->
        <!-- <div class="col-12 col-md-6 col-xl-4"> -->
        <!-- <div class="card h-100">
          <div class="p-3 pb-0 card-header">
            <h6 class="mb-0">Platform Settings</h6>
          </div>
          <div class="p-3 card-body">
            <h6 class="text-xs text-uppercase text-body font-weight-bolder">
              Account
            </h6>
            <ul class="list-group">
              <li class="px-0 border-0 list-group-item">
                <soft-switch id="flexSwitchCheckDefault" name="email" class="ps-0 ms-auto"
                  label-class="mb-0 text-body ms-3 text-truncate w-80" checked>Email me when someone follows
                  me</soft-switch>
              </li>
              <li class="px-0 border-0 list-group-item">
                <soft-switch id="flexSwitchCheckDefault1" name="Email"
                  label-class="mb-0 text-body ms-3 text-truncate w-80" class="ps-0 ms-auto">Email me when someone answers
                  on my post</soft-switch>
              </li>

              <li class="px-0 border-0 list-group-item">
                <soft-switch id="flexSwitchCheckDefault2" name="Email"
                  label-class="mb-0 text-body ms-3 text-truncate w-80" class="ps-0 ms-auto" checked>Email me when someone
                  mentions me</soft-switch>
              </li>
            </ul>
            <h6 class="mt-4 text-xs text-uppercase text-body font-weight-bolder">
              Application
            </h6>
            <ul class="list-group">
              <li class="px-0 border-0 list-group-item">
                <soft-switch id="flexSwitchCheckDefault3" name="Project Launch" class="ps-0 ms-auto"
                  label-class="mb-0 text-body ms-3 text-truncate w-80">New launches and projects</soft-switch>
              </li>
              <li class="px-0 border-0 list-group-item">
                <soft-switch id="flexSwitchCheckDefault4" name="Product Update" class="ps-0 ms-auto"
                  label-class="mb-0 text-body ms-3 text-truncate w-80" checked>Monthly product updates</soft-switch>
              </li>
              <li class="px-0 pb-0 border-0 list-group-item">
                <soft-switch id="flexSwitchCheckDefault5" name="Newsletter" class="ps-0 ms-auto"
                  label-class="mb-0 text-body ms-3 text-truncate w-80">Subscribe to newsletter</soft-switch>
              </li>
            </ul>
          </div>
        </div> -->
        <!-- </div> -->

        <!-- 個人介紹 -->
        <div class="mt-4 col-12 col-md-4 col-xl-4 mt-md-0">

          <div class="card h-100">
            <div class="p-3 pb-0 card-header">
              <div class="row">
                <div class="col-md-8 d-flex align-items-center">
                  <h6 class="mb-0">個人資訊</h6>
                </div>
                <div class="col-md-4 text-end">
                  <a>
                    <router-link class="ms-2" style=" font-size: 13px;" :to="{ name: 'EditUser' }"
                      v-if="token_user_account == this.$route.params.user_account">
                      <i class="text-sm fas fa-user-edit text-secondary me-2"></i>編輯</router-link>

                  </a>
                </div>
              </div>
            </div>
            <div class="p-3 card-body">
              <p class="text-sm">
                {{ user.intro }}
              </p>
              <hr class="my-4 horizontal gray-light" />
              <ul class="list-group">
                <li class="text-sm border-0 list-group-item ps-0">
                  <strong class="text-dark">電子郵件:</strong> &nbsp; {{ user.email }}
                </li>
                <li v-if="social.length != 0" class="pb-0 border-0 list-group-item ps-0">
                  <strong class="text-sm text-dark">社群媒體:</strong> &nbsp;
                  <a v-for="({ link, iconclass }, index) of social" :key="index" class="py-0 mb-0 btn-simple ps-1 pe-2"
                    :href="link">
                    <i :class=iconclass></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 貼文 -->
        <div class="mt-4 col-12 col-md-8 col-xl-8 mt-md-0">

          <div class="card">
            <div class="card-body p-3">

              <div class="row">
                <div class="col-lg-4" v-for="post in posts" :key="post.id">
                  <div class="card mb-2" aria-hidden="true">
                    <div style="overflow: hidden;">
                      <router-link :to="{ name: 'Video', params: { post_id: post.id } }"><img
                          class="card-img-top youtube_img_fix" :src="post.video_pic_url" alt=""></router-link>
                    </div>

                    <div class=" card-body">
                      <h5 class="card-title placeholder-glow">
                        {{ post.uva_topic.serial + "-" + post.uva_topic.title }}
                      </h5>
                      <p>CPE星數: <i class="fa-solid fa-star-of-david" v-for="star in post.uva_topic.star"></i>

                      <div class="vote__count" :class="[{ positive: post.likes > 0 }, { negative: post.likes < 0 },]"
                        style="display: inline;">
                        愛心數:
                        <span class="vote__count-n"> <i class="fa-solid fa-heart"></i> x {{ post.likes }} </span>
                      </div>
                      type: {{ post.code_type }}
                      </p>
                      {{ post.created_at }}
                      <router-link class="ms-2" style=" font-size: 13px;" v-if="token_user_id == post.user_id"
                        :to="{ name: 'EditPost', params: { post_id: post.id } }">
                        <i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>編輯貼文</router-link>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-3" v-for="n in 8" v-show="loading">
                  <div class="card mb-2" aria-hidden="true">
                    <img src="@\assets\img\loadingbak.jpg" class="card-img-top" alt="">
                    <div class="card-body">
                      <h5 class="card-title placeholder-glow">
                        <span class="placeholder col-6"></span>
                      </h5>
                      <p class="card-text placeholder-glow">
                        <span class="placeholder col-7"></span>
                        <span class="placeholder col-4"></span>
                        <span class="placeholder col-4"></span>
                        <span class="placeholder col-6"></span>
                        <span class="placeholder col-8"></span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="mt-4 col-12 col-xl-4 mt-xl-0">
        <div class="card h-100">
          <div class="p-3 pb-0 card-header">
            <h6 class="mb-0">Conversations</h6>
          </div>
          <div class="p-3 card-body">
            <ul class="list-group">
              <li class="px-0 mb-2 border-0 list-group-item d-flex align-items-center">
                <soft-avatar class="me-3" :img="sophie" alt="kal" border-radius="lg" shadow="regular" />
                <div class="d-flex align-items-start flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">Sophie B.</h6>
                  <p class="mb-0 text-xs">Hi! I need more information..</p>
                </div>
                <a class="mb-0 btn btn-link pe-3 ps-0 ms-auto" href="javascript:;">Reply</a>
              </li>
              <li class="px-0 mb-2 border-0 list-group-item d-flex align-items-center">
                <soft-avatar class="me-3" :img="marie" alt="kal" border-radius="lg" shadow="regular" />
                <div class="d-flex align-items-start flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">Anne Marie</h6>
                  <p class="mb-0 text-xs">Awesome work, can you..</p>
                </div>
                <a class="mb-0 btn btn-link pe-3 ps-0 ms-auto" href="javascript:;">Reply</a>
              </li>
              <li class="px-0 mb-2 border-0 list-group-item d-flex align-items-center">
                <soft-avatar class="me-3" :img="ivana" alt="kal" border-radius="lg" shadow="regular" />
                <div class="d-flex align-items-start flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">Ivanna</h6>
                  <p class="mb-0 text-xs">About files I can..</p>
                </div>
                <a class="mb-0 btn btn-link pe-3 ps-0 ms-auto" href="javascript:;">Reply</a>
              </li>
              <li class="px-0 mb-2 border-0 list-group-item d-flex align-items-center">
                <soft-avatar class="me-3" :img="peterson" alt="kal" border-radius="lg" shadow="regular" />
                <div class="d-flex align-items-start flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">Peterson</h6>
                  <p class="mb-0 text-xs">Have a great afternoon..</p>
                </div>
                <a class="mb-0 btn btn-link pe-3 ps-0 ms-auto" href="javascript:;">Reply</a>
              </li>
              <li class="px-0 border-0 list-group-item d-flex align-items-center">
                <soft-avatar class="me-3" :img="nick" alt="kal" border-radius="lg" shadow="regular" />
                <div class="d-flex align-items-start flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">Nick Daniel</h6>
                  <p class="mb-0 text-xs">Hi! I need more information..</p>
                </div>
                <a class="mb-0 btn btn-link pe-3 ps-0 ms-auto" href="javascript:;">Reply</a>
              </li>
            </ul>
          </div>
        </div>
      </div> -->
      </div>
    </infinite-scroll>
  </div>
</template>

<script>
import SoftSwitch from "@/components/SoftSwitch.vue";
import ProfileInfoCard from "./components/ProfileInfoCard.vue";
import SoftAvatar from "@/components/SoftAvatar.vue";
import sophie from "@/assets/img/kal-visuals-square.jpg";
import marie from "@/assets/img/marie.jpg";
import ivana from "@/assets/img/ivana-square.jpg";
import peterson from "@/assets/img/team-4.jpg";
import nick from "@/assets/img/team-3.jpg";
import img1 from "@/assets/img/home-decor-1.jpg";
import img2 from "@/assets/img/home-decor-2.jpg";
import img3 from "@/assets/img/home-decor-3.jpg";
import team1 from "@/assets/img/team-1.jpg";
import team2 from "@/assets/img/team-2.jpg";
import team3 from "@/assets/img/team-3.jpg";
import team4 from "@/assets/img/team-4.jpg";
import DefaultProjectCard from "./components/DefaultProjectCard.vue";
import PlaceHolderCard from "@/examples/Cards/PlaceHolderCard.vue";
import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";
import InfiniteScroll from "infinite-loading-vue3";
import { ElMessage } from "element-plus";

export default {
  name: "ProfileOverview",
  components: {
    SoftSwitch,
    ProfileInfoCard,
    SoftAvatar,
    DefaultProjectCard,
    PlaceHolderCard,
    InfiniteScroll
  },
  data() {
    return {
      showMenu: false,
      sophie,
      marie,
      ivana,
      peterson,
      nick,
      img1,
      team1,
      team2,
      team3,
      team4,
      img2,
      img3,
      user: [],
      token: '',
      self: 0,
      posts: [],
      loading: true,
      page: 1,
      noResult: false,
      message: "",
      social: [],
      more_lock: false,
      token_user_id: this.$cookies.get("user_id"),
      token_user_account: this.$cookies.get("user_account"),
      sort: '',
      star: [],
      code_type: []
    };
  },
  created() {
    const that = this;

    this.$watch(
      () => ({
        user_account: this.$route.params.user_account
      }),
      () => {
        if (this.$route.name != 'Profile') {
          return;
        }
        if (this.$route.params.user_account == null) {
          this.$router.push({ name: 'Dashboard' });
          ElMessage.error("用戶不存在");
        }
        this.posts = [];
        this.loading = true;
        this.page = 1;
        this.noResult = false;
        this.message = "";
        this.social = [];
        if (this.$cookies.isKey("token")) {
          this.token = this.$cookies.get("token")
        }
        this.axios
          .post("/api/auth/user", {
            account: this.$route.params.user_account
          }, {
            headers: {
              'Authorization': `Bearer ` + this.token
            }
          })
          .then((res) => {
            this.user = res.data.user
            this.self = res.data.self

            if (this.user.github != null) {
              this.social.push({ link: this.user.github, iconclass: "fa-brands fa-github" })
            } if (this.user.instagram != null) {
              this.social.push({ link: this.user.instagram, iconclass: "fa-brands fa-instagram" })
            } if (this.user.facebook != null) {
              this.social.push({ link: this.user.facebook, iconclass: "fa-brands fa-facebook" })
            }
          }).catch(function (error) {
            if (error.response) {
              that.$router.push({ name: 'Dashboard' });
              ElMessage.error("用戶不存在");
            }
          });
        this.loadDataFromServer()

      },
      { deep: true, immediate: true }
    );

  },
  methods: {
    changepost(type) {
      console.log('type ' + type)
      if (type <= 5) {
        this.sort = type;
      } else if (type == 6) {
        this.star = [];
      }
      else if (type == 7) {
        if (!this.star.includes(null))
          this.star.push(null);
        else {
          this.star.forEach((star, index) => {
            if (star == null) {
              this.star.splice(index, 1);
            };
          });
        }
      }
      else if (type >= 8 && type <= 12) {
        if (!this.star.includes(type - 7))
          this.star.push(type - 7)
        else {
          this.star.forEach((star, index) => {
            if (star == type - 7 || star == null) {
              this.star.splice(index, 1);
            };
          });
        }
      } else if (type == 13) {
        this.code_type = []
      }
      else if (type >= 14) {
        if (!this.code_type.includes(type))
          this.code_type.push(type)
        else {
          this.code_type.forEach((code_type, index) => {
            if (code_type == type) {
              this.code_type.splice(index, 1);
            };
          });
        }
      }



      this.posts = [];
      this.noResult = false
      this.loadDataFromServer()
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    },
    async loadDataFromServer() {
      if (!this.more_lock) {
        this.more_lock = true;
        if (!this.noResult) {
          this.loading = true;
          await this.axios
            .post("/api/forum/get_post", {
              code_type: this.code_type,
              star: this.star,
              sort: this.sort,
              user_account: this.$route.params.user_account
            })
            .then((res) => {
              let allsame = true;
              let newpostcount = 0;
              console.log(res.data.success)
              res.data.success.forEach((item) => {
                if (newpostcount == 8) return;
                let same = false;
                this.posts.forEach((post) => {
                  if (post.id == item.id) {
                    same = true;
                    return;
                  };
                });
                if (same == false) {
                  this.posts.push(item);
                  newpostcount++;
                  allsame = false;

                }
              });
              if (allsame)
                this.noResult = true

            })
        }
        this.loading = false;

        this.more_lock = false;

      }
    }
  },
};
</script>
