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
        <div class="mx-auto mt-3 col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0">
          <div class="nav-wrapper position-relative end-0">
            <ul class="p-1 bg-transparent nav nav-pills nav-fill" role="tablist">
              <li class="nav-item">
                <a class="px-0 py-1 mb-0 nav-link active" data-bs-toggle="tab" href="javascript:;" role="tab"
                  aria-selected="true">
                  <svg class="text-dark" width="16px" height="16px" viewBox="0 0 42 42" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g transform="translate(-2319.000000, -291.000000)" fill="#FFFFFF" fill-rule="nonzero">
                        <g transform="translate(1716.000000, 291.000000)">
                          <g transform="translate(603.000000, 0.000000)">
                            <path class="color-background"
                              d="M22.7597136,19.3090182 L38.8987031,11.2395234 C39.3926816,10.9925342 39.592906,10.3918611 39.3459167,9.89788265 C39.249157,9.70436312 39.0922432,9.5474453 38.8987261,9.45068056 L20.2741875,0.1378125 L20.2741875,0.1378125 C19.905375,-0.04725 19.469625,-0.04725 19.0995,0.1378125 L3.1011696,8.13815822 C2.60720568,8.38517662 2.40701679,8.98586148 2.6540352,9.4798254 C2.75080129,9.67332903 2.90771305,9.83023153 3.10122239,9.9269862 L21.8652864,19.3090182 C22.1468139,19.4497819 22.4781861,19.4497819 22.7597136,19.3090182 Z">
                            </path>
                            <path class="color-background"
                              d="M23.625,22.429159 L23.625,39.8805372 C23.625,40.4328219 24.0727153,40.8805372 24.625,40.8805372 C24.7802551,40.8805372 24.9333778,40.8443874 25.0722402,40.7749511 L41.2741875,32.673375 L41.2741875,32.673375 C41.719125,32.4515625 42,31.9974375 42,31.5 L42,14.241659 C42,13.6893742 41.5522847,13.241659 41,13.241659 C40.8447549,13.241659 40.6916418,13.2778041 40.5527864,13.3472318 L24.1777864,21.5347318 C23.8390024,21.7041238 23.625,22.0503869 23.625,22.429159 Z"
                              opacity="0.7"></path>
                            <path class="color-background"
                              d="M20.4472136,21.5347318 L1.4472136,12.0347318 C0.953235098,11.7877425 0.352562058,11.9879669 0.105572809,12.4819454 C0.0361450918,12.6208008 6.47121774e-16,12.7739139 0,12.929159 L0,30.1875 L0,30.1875 C0,30.6849375 0.280875,31.1390625 0.7258125,31.3621875 L19.5528096,40.7750766 C20.0467945,41.0220531 20.6474623,40.8218132 20.8944388,40.3278283 C20.963859,40.1889789 21,40.0358742 21,39.8806379 L21,22.429159 C21,22.0503869 20.7859976,21.7041238 20.4472136,21.5347318 Z"
                              opacity="0.7"></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                  <span class="ms-1">App</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="px-0 py-1 mb-0 nav-link" data-bs-toggle="tab" href="javascript:;" role="tab"
                  aria-selected="false">
                  <svg class="text-dark" width="16px" height="16px" viewBox="0 0 40 40" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <title>settings</title>
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g transform="translate(-2020.000000, -442.000000)" fill="#FFFFFF" fill-rule="nonzero">
                        <g transform="translate(1716.000000, 291.000000)">
                          <g transform="translate(304.000000, 151.000000)">
                            <polygon class="color-background" opacity="0.596981957"
                              points="18.0883333 15.7316667 11.1783333 8.82166667 13.3333333 6.66666667 6.66666667 0 0 6.66666667 6.66666667 13.3333333 8.82166667 11.1783333 15.315 17.6716667">
                            </polygon>
                            <path class="color-background"
                              d="M31.5666667,23.2333333 C31.0516667,23.2933333 30.53,23.3333333 30,23.3333333 C29.4916667,23.3333333 28.9866667,23.3033333 28.48,23.245 L22.4116667,30.7433333 L29.9416667,38.2733333 C32.2433333,40.575 35.9733333,40.575 38.275,38.2733333 L38.275,38.2733333 C40.5766667,35.9716667 40.5766667,32.2416667 38.275,29.94 L31.5666667,23.2333333 Z"
                              opacity="0.596981957"></path>
                            <path class="color-background"
                              d="M33.785,11.285 L28.715,6.215 L34.0616667,0.868333333 C32.82,0.315 31.4483333,0 30,0 C24.4766667,0 20,4.47666667 20,10 C20,10.99 20.1483333,11.9433333 20.4166667,12.8466667 L2.435,27.3966667 C0.95,28.7083333 0.0633333333,30.595 0.00333333333,32.5733333 C-0.0583333333,34.5533333 0.71,36.4916667 2.11,37.89 C3.47,39.2516667 5.27833333,40 7.20166667,40 C9.26666667,40 11.2366667,39.1133333 12.6033333,37.565 L27.1533333,19.5833333 C28.0566667,19.8516667 29.01,20 30,20 C35.5233333,20 40,15.5233333 40,10 C40,8.55166667 39.685,7.18 39.1316667,5.93666667 L33.785,11.285 Z">
                            </path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                  <span class="ms-1">Settings</span>
                </a>
              </li>
            </ul>
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
                    <i class="text-sm fas fa-user-edit text-secondary" data-bs-toggle="tooltip"
                      data-bs-placement="top"></i>
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
                <div class="col-lg-3" v-for="post in posts" :key="post.id">
                  <div class="card mb-2" aria-hidden="true">
                    <div style="overflow: hidden;">
                      <router-link :to="{ name: 'Video', params: { post_id: post.id } }"><img
                          class="card-img-top youtube_img_fix" :src="post.video_pic_url" alt=""></router-link>
                    </div>

                    <div class=" card-body">
                      <h5 class="card-title placeholder-glow">
                        {{ post.uva_topic.serial + "-" + post.uva_topic.title }}
                      </h5>
                      <p>CPE星數: <i class="fa-solid fa-star-of-david" v-for="star in post.uva_topic.star"></i> </p>
                      <p>
                      <div class="vote__count" :class="[{ positive: post.likes > 0 }, { negative: post.likes < 0 },]"
                        style="display: inline;">
                        愛心數:
                        <span class="vote__count-n"> <i class="fa-solid fa-heart"></i> x {{ post.likes }} </span>
                      </div>
                      </p>
                      {{ post.created_at }}
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

    };
  },
  created() {

    this.$watch(
      () => ({
        user_account: this.$route.params.user_account
      }),
      () => {
        if (this.$route.name != 'Profile') {
          return;
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
          })
        this.loadDataFromServer()

      },
      { deep: true, immediate: true }
    );

  },
  mounted() {
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip(this.$store.state.bootstrap);
  },
  beforeUnmount() {
    this.$store.state.isAbsolute = false;
  }, methods: {
    async loadDataFromServer() {
      if (!this.more_lock) {
        this.more_lock = true;
        if (!this.noResult) {
          this.loading = true;
          await this.axios
            .post("/api/forum/get_post", {
              star: this.star,
              sort: this.sort,
              page: this.page
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
