<template>
  <div class="py-4 container-fluid">
    <div class="row justify-content-around">
      <div class="col-xl-2 col-sm-2 col-2 mb-xl-0 mb-4">
        <mini-statistics-card title="CPE" value="一星題目" :percentage="{
          value: '+505%',
          color: 'text-success',
        }" :icon="{
  component: 'ni ni-money-coins',
  background: iconBackground,
}" direction-reverse />
      </div>
      <div class="col-xl-2 col-sm-2 col-2  mb-xl-0 mb-4">
        <mini-statistics-card title="CPE" value="二星題目" :percentage="{
          value: '+505%',
          color: 'text-success',
        }" :icon="{
  component: 'ni ni-money-coins',
  background: iconBackground,
}" direction-reverse />
      </div>
      <div class="col-xl-2 col-sm-2 col-2  mb-xl-0 mb-4">
        <mini-statistics-card title="CPE" value="三星題目" :percentage="{
          value: '+505%',
          color: 'text-success',
        }" :icon="{
  component: 'ni ni-money-coins',
  background: iconBackground,
}" direction-reverse />
      </div>
      <div class="col-xl-2 col-sm-2 col-2  mb-xl-0 mb-4">
        <mini-statistics-card title="CPE" value="四星題目" :percentage="{
          value: '+505%',
          color: 'text-success',
        }" :icon="{
  component: 'ni ni-money-coins',
  background: iconBackground,
}" direction-reverse />
      </div>
      <div class="col-xl-2 col-sm-2 col-2  mb-xl-0 mb-4">
        <mini-statistics-card title="CPE" value="五星題目" :percentage="{
          value: '+505%',
          color: 'text-success',
        }" :icon="{
  component: 'ni ni-money-coins',
  background: iconBackground,
}" direction-reverse />
      </div>

    </div>
    <infinite-scroll @infinite-scroll="loadDataFromServer" :message="message" :noResult="noResult">

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
                  <p>CPE星數: <i class="fa-solid fa-star-of-david" v-for="star in post.uva_topic.star"></i>

                  <div class="vote__count" :class="[{ positive: post.likes > 0 }, { negative: post.likes < 0 },]"
                    style="display: inline;">
                    愛心數:
                    <span class="vote__count-n"> <i class="fa-solid fa-heart"></i> x {{ post.likes }} </span>
                  </div>

                  </p>
                  <p class="card-text placeholder-glow">
                    <router-link class="" :to="{ name: 'Profile', params: { user_account: post.user_account } }">
                      作者 : {{ post.user_name }}。 </router-link>

                    <timeago :datetime="post.created_at.replaceAll('/', '-')" :locale="zhTW" />

                  </p>
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
    </infinite-scroll>

  </div>
</template>
<script>
import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";
import ReportsBarChart from "@/examples/Charts/ReportsBarChart.vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import TimelineList from "./components/TimelineList.vue";
import TimelineItem from "./components/TimelineItem.vue";
import ProjectsCard from "./components/ProjectsCard.vue";
import US from "../assets/img/icons/flags/US.png";
import DE from "../assets/img/icons/flags/DE.png";
import GB from "../assets/img/icons/flags/GB.png";
import BR from "../assets/img/icons/flags/BR.png";
import { ElMessage } from "element-plus";
import InfiniteScroll from "infinite-loading-vue3";
import {
  faHandPointer,
  faUsers,
  faCreditCard,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";
export default {
  name: "dashboard-default",
  data() {
    return {
      iconBackground: "bg-gradient-success",
      faCreditCard,
      faScrewdriverWrench,
      faUsers,
      faHandPointer,
      sales: {
        us: {
          country: "United States",
          sales: 2500,
          value: "$230,900",
          bounce: "29.9%",
          flag: US,
        },
        germany: {
          country: "Germany",
          sales: "3.900",
          value: "$440,000",
          bounce: "40.22%",
          flag: DE,
        },
        britain: {
          country: "Great Britain",
          sales: "1.400",
          value: "$190,700",
          bounce: "23.44%",
          flag: GB,
        },
        brasil: {
          country: "Brasil",
          sales: "562",
          value: "$143,960",
          bounce: "32.14%",
          flag: BR,
        },
      },
      posts: [],
      loading: true,
      noResult: false,
      message: "",
      more_lock: false,


    };
  },
  components: {
    MiniStatisticsCard,
    ReportsBarChart,
    GradientLineChart,
    ProjectsCard,
    TimelineList,
    TimelineItem,
    InfiniteScroll
  },
  mounted() {
    this.loadDataFromServer()
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
