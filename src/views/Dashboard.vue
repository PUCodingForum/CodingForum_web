<template>
  <div class="py-4 container-fluid">
    <div class="row justify-content-around">
      <div class="col-xl-2 col-sm-6 mb-xl-0 mb-4">
        <mini-statistics-card title="CPE" value="一星題目" :percentage="{
          value: '+505%',
          color: 'text-success',
        }" :icon="{
  component: 'ni ni-money-coins',
  background: iconBackground,
}" direction-reverse />
      </div>
      <div class="col-xl-2 col-sm-6 mb-xl-0 mb-4">
        <mini-statistics-card title="CPE" value="二星題目" :percentage="{
          value: '+505%',
          color: 'text-success',
        }" :icon="{
  component: 'ni ni-money-coins',
  background: iconBackground,
}" direction-reverse />
      </div>
      <div class="col-xl-2 col-sm-6 mb-xl-0 mb-4">
        <mini-statistics-card title="CPE" value="三星題目" :percentage="{
          value: '+505%',
          color: 'text-success',
        }" :icon="{
  component: 'ni ni-money-coins',
  background: iconBackground,
}" direction-reverse />
      </div>
      <div class="col-xl-2 col-sm-6 mb-xl-0 mb-4">
        <mini-statistics-card title="CPE" value="四星題目" :percentage="{
          value: '+505%',
          color: 'text-success',
        }" :icon="{
  component: 'ni ni-money-coins',
  background: iconBackground,
}" direction-reverse />
      </div>
      <div class="col-xl-2 col-sm-6 mb-xl-0 mb-4">
        <mini-statistics-card title="CPE" value="五星題目" :percentage="{
          value: '+505%',
          color: 'text-success',
        }" :icon="{
  component: 'ni ni-money-coins',
  background: iconBackground,
}" direction-reverse />
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12 mb-lg-0 mb-4">
        <div class="card">
          <div class="card-body p-3">
            <div class="row">

              <div class="col-lg-3" v-for="post in posts">

                <div class="card" aria-hidden="true">
                  <div style="overflow: hidden;">
                    <img class="card-img-top youtube_img_fix" :src="post.video_pic_url" alt="">

                  </div>
                  <!-- <div class=""
                    :style="{ backgroundImage: 'url(' + post.video_pic_url + ')' }">
                  </div> -->

                  <div class=" card-body">
                    <h5 class="card-title placeholder-glow">
                      {{ post.uva_topic.serial + "-" + post.uva_topic.title }}
                    </h5>
                    <p>CPE星數: <i class="fa-solid fa-star-of-david" v-for="star in post.uva_topic.star"></i> </p>
                    <p class="card-text placeholder-glow">
                      <router-link class="" :to="{ name: 'Profile', params: { user_id: post.user_id } }">
                        作者 : {{ post.user_name }} </router-link>
                    </p>
                  </div>
                </div>
              </div>

              <!-- <div class="d-flex flex-column h-100">
                <p class="mb-1 pt-2 text-bold">Built by developers</p>
                  <h5 class="font-weight-bolder">Soft UI Dashboard</h5>
                  <p class="mb-5">
                    From colors, cards, typography to complex elements, you will
                    find the full documentation.
                  </p>
                <div class="overflow-hidden position-relative border-radius-lg bg-cover h-100" style="
                  background-image: url( ''https://img.youtube.com/vi/' +post.video_id+ '/sddefault.jpg' ');
                "></div>

                <a class="text-body text-sm font-weight-bold mb-0 icon-move-right mt-auto" href="javascript:;">
                    Read More
                    <i class="fas fa-arrow-right text-sm ms-1" aria-hidden="true"></i>
                  </a>
              </div> -->


            </div>
          </div>
        </div>
      </div>
      <!-- <div class="col-lg-5">
        <div class="card h-100 p-3">
          <div class="overflow-hidden position-relative border-radius-lg bg-cover h-100" style="
              background-image: url('https://demos.creative-tim.com/soft-ui-dashboard/assets/img/ivancik.jpg');
            ">
            <span class="mask bg-gradient-dark"></span>
            <div class="card-body position-relative z-index-1 p-3 h-100">
              <div class="d-flex flex-column h-100">
                <h5 class="text-white font-weight-bolder mb-4 pt-2">
                  Work with the rockets
                </h5>
                <p class="text-white mb-5">
                  Wealth creation is an evolutionarily recent positive-sum game.
                  It is all about who take the opportunity first.
                </p>
                <a class="text-white font-weight-bold ps-1 mb-0 icon-move-left mt-auto" href="javascript:;">
                  Read more
                  <i class="fas fa-arrow-right text-sm ms-1" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
    <div class="mt-4 row">
      <div class="mb-4 col-lg-5 mb-lg-0">
        <div class="card z-index-2">
          <div class="p-3 card-body">
            <reports-bar-chart id="chart-bar" title="active Users" description="(<strong>+23%</strong>) than last week"
              :chart="{
                labels: [
                  'Apr',
                  'May',
                  'Jun',
                  'Jul',
                  'Aug',
                  'Sep',
                  'Oct',
                  'Nov',
                  'Dec',
                ],
                datasets: {
                  label: 'Sales',
                  data: [450, 200, 100, 220, 500, 100, 400, 230, 500],
                },
              }" :items="[
  {
    icon: {
      color: 'primary',
      component: faUsers,
    },
    label: 'users',
    progress: { content: '37K', percentage: 60 },
  },
  {
    icon: { color: 'info', component: faHandPointer },
    label: 'clicks',
    progress: { content: '2m', percentage: 90 },
  },
  {
    icon: { color: 'warning', component: faCreditCard },
    label: 'Sales',
    progress: { content: '435$', percentage: 30 },
  },
  {
    icon: { color: 'danger', component: faScrewdriverWrench },
    label: 'Items',
    progress: { content: '43', percentage: 50 },
  },
]" />
          </div>
        </div>
      </div>
      <div class="col-lg-7">
        <!-- line chart -->
        <div class="card z-index-2">
          <gradient-line-chart id="chart-line" title="Gradient Line Chart" description="<i class='fa fa-arrow-up text-success'></i>
      <span class='font-weight-bold'>4% more</span> in 2021" :chart="{
        labels: [
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        datasets: [
          {
            label: 'Mobile Apps',
            data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
          },
          {
            label: 'Websites',
            data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
          },
        ],
      }" />
        </div>
      </div>
    </div>
    <div class="row my-4">
      <div class="col-lg-8 col-md-6 mb-md-0 mb-4">
        <projects-card />
      </div>
      <div class="col-lg-4 col-md-6">
        <timeline-list class="h-100" title="Orders overview" description="<i class='fa fa-arrow-up text-success' aria-hidden='true'></i>
        <span class='font-weight-bold'>24%</span> this month">
          <timeline-item color="success" icon="bell-55" title="$2400 Design changes" date-time="22 DEC 7:20 PM" />
          <TimelineItem color="danger" icon="html5" title="New order #1832412" date-time="21 DEC 11 PM" />
          <TimelineItem color="info" icon="cart" title="Server payments for April" date-time="21 DEC 9:34 PM" />
          <TimelineItem color="warning" icon="credit-card" title="New card added for order #4395133"
            date-time="20 DEC 2:20 AM" />
          <TimelineItem color="primary" icon="key-25" title="Unlock packages for development"
            date-time="18 DEC 4:54 AM" />
          <TimelineItem color="info" icon="check-bold" title="Notifications unread" date-time="15 DEC" />
        </timeline-list>
      </div>
    </div>
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
      posts: []

    };
  },
  components: {
    MiniStatisticsCard,
    ReportsBarChart,
    GradientLineChart,
    ProjectsCard,
    TimelineList,
    TimelineItem,
  },
  mounted() {
    this.axios
      .post("/api/forum/get_post", {
        star: this.star,
        sort: this.sort,
        // headers: {
        //   Authorization: `Bearer ` + this.token,
        // }
      })
      .then((res) => {
        console.log(res.data.success);
        this.posts = res.data.success;
      })
  },
};
</script>
