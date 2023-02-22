<template>
  <div class="container-fluid mt-4">

    <div class="row">
      <div class="col-lg-8">

        <div class="card">
          <div class="card-body p-3">
            {{ loading }}
            <el-main style="padding:0" v-loading="loading" element-loading-text="影片載入中"
              element-loading-background="rgba(0, 0, 0, 0.1)">
              <div class="container_video">
                <!-- <YoutubeVue3 ref="youtube" :videoid="post.video_id" :controls="1" class="youtub" @played="onPlayed" /> -->
              </div>
            </el-main>

          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <invoice-card />
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-7">
        <div class="card">
          <div class="card-body p-3">
            <div class="ms-4 mt-5">
              {{ comments }}
              <div v-for="(item, index) in comments" :key="index">
                <Comment v-bind="{
                  avatar: item.image,
                  author: item.author,
                  comment: item.comment,
                  replies: item.replies,
                  is_liked: item.is_liked,
                  is_disliked: item.is_disliked,
                  id: item.id,
                  votes: item.votes,
                  date: item.date,
                }" />

              </div>
            </div>
          </div>
        </div>

        <!-- <billing-card title="Billing Information" :bills="[
                                              {
                                                name: 'Oliver Liam',
                                                company: 'Viking Burrito',
                                                email: 'oliver@burrito.com',
                                                id: 'FRB1235476',
                                              },
                                              {
                                                name: 'Lucas Harper',
                                                company: 'Stone Tech Zone',
                                                email: 'lucas@stone-tech.com',
                                                id: 'FRB1235476',
                                              },
                                              {
                                                name: 'Ethan James',
                                                company: 'Fiber Notion',
                                                email: 'ethan@fiber.com',
                                                id: 'FRB1235476',
                                              },
                                            ]" /> -->
      </div>
      <div class="col-md-5 mt-4">
        <ranking-list-card :horizontal-break="false" :card="{
          title: 'Transactions',
          date: '23 - 30 March 2021',
          subtitle: 'Newest',
        }" :item="[
  {
    title: 'Netflix',
    date: '27 March 2020, at 12:30 PM',
    amount: '- $ 2,500',
    icon: 'fa-arrow-down',
    color: 'danger',
  },
  {
    title: 'Apple',
    date: '23 March 2020, at 04:30 AM',
    amount: '+ $ 2,000',
    icon: 'fa-arrow-up',
    color: 'success',
  },
]">
          <ranking-list title="Yesterday" :item="[
            {
              title: 'Stripe',
              date: '26 March 2020, at 13:45 PM',
              amount: '+ $ 750',
              icon: 'fa-arrow-up',
              color: 'success',
            },
            {
              title: 'HubSpot',
              date: '26 March 2020, at 12:30 PM',
              amount: '+ $ 1,000',
              icon: 'fa-arrow-up',
              color: 'success',
            },
            {
              title: 'Creative Tim',
              date: '26 March 2020, at 08:30 AM',
              amount: '+ $ 2,500',
              icon: 'fa-arrow-up',
              color: 'success',
            },
            {
              title: 'Webflow',
              date: '26 March 2020, at 05:00 AM',
              amount: 'Pending',
              icon: 'fa-info',
              color: 'dark',
            },
          ]" :horizontal-break="false" />
        </ranking-list-card>
      </div>
    </div>
  </div>
</template>

<script>
import setTooltip from "@/assets/js/tooltip.js";
import NavPill from "./components/NavPill.vue";
import MasterCard from "@/examples/Cards/MasterCard.vue";
import DefaultInfoCard from "@/examples/Cards/DefaultInfoCard.vue";
import PaymentMethodsCard from "./components/PaymentMethodsCard.vue";
import InvoiceCard from "./components/InvoiceCard.vue";
import BillingCard from "./components/BillingCard.vue";
import RankingList from "@/examples/Cards/RankingList.vue";
import RankingListCard from "@/examples/Cards/RankingListCard.vue";
import { ElMessage } from "element-plus";
import { YoutubeVue3 } from 'youtube-vue3'
import Comment from "@/components/Comment.vue";

export default {
  name: "Billing",
  components: {
    NavPill,
    MasterCard,
    DefaultInfoCard,
    PaymentMethodsCard,
    InvoiceCard,
    BillingCard,
    RankingList,
    RankingListCard,
    YoutubeVue3,
    Comment
  },
  data() {
    return {
      post: [],
      post_id: this.$route.params.post_id,
      loading: true,
      // comments: [
      //   {
      //     author: "brandon Jonson",
      //     id: 1,
      //     image: "https://picsum.photos/50",
      //     comment: "I love this product",
      //     date: "2019-01-01",
      //     votes: 10,
      //     is_liked: true,
      //     is_disliked: false,
      //     replies: [],
      //   },
      //   {
      //     author: "Nick Jonson",
      //     id: 2,
      //     comment:
      //       "I don't like this product  Some large text  Some large text  Some large text  Some large text  Some large text  Some large text  Some large text  Some large text  Some large text  Some large text  Some large text  Some large text  Some large text  Some large text ",
      //     image: "https://picsum.photos/50",
      //     date: "2019-01-01",
      //     votes: -10,
      //     is_liked: false,
      //     is_disliked: false,
      //     replies: [
      //       {
      //         author: "Alex Jonson",
      //         id: 3,
      //         comment:
      //           "Why not? Some large text  Some large text  Some large text  Some large text  Some large text  Some large text  Some large text  Some large text  Some large text  Some large text  Some large text  Some large text ",
      //         image: "https://picsum.photos/50",
      //         date: "2019-01-01",
      //         votes: 2,
      //         is_liked: false,
      //         is_disliked: false,
      //         replies: [],
      //       },

      //       {
      //         author: "Alex Jonson",
      //         id: 343,
      //         comment: "Why not?",
      //         image: "https://picsum.photos/50",
      //         date: "2019-01-01",
      //         votes: 2,
      //         is_liked: false,
      //         is_disliked: false,
      //         replies: [],
      //       },

      //     ],
      //   },
      // ],
      comments: []
    };
  },
  created() {
    this.$watch(
      () => ({
        post_id: this.post_id,
      }),
      () => {
        if (this.$route.name != 'Video') {
          return;
        }
        if (!this.post_id) {
          this.$router.push({ name: 'Dashboard' });
        }
      },
      { deep: true, immediate: true }
    );
  },
  mounted() {

    const get_post = this.axios
      .post("/api/forum/get_post", {
        post_id: this.post_id,
      });
    const get_comment = this.axios
      .post("/api/forum/get_comment", {
        post_id: this.post_id,

      });
    this.axios.all([get_post, get_comment]).then(
      this.axios.spread((res1, res2) => {
        console.log(res1);
        this.post = res1.data.success;
        this.comments = res2.data.success;
      })
    ).catch(function (error) {
      if (error.response) {
        console.log(error.response.status);
        if (error.response.status == "401") {
          ElMessage.error("影片不存在");

          that.$router.push({ name: 'Dashboard' });

        }
      }
    });

  },
  methods: {
    onPlayed() {
      this.loading = false
    },

  },
};
</script>
<style scoped>
.boss {
  margin-top: 100px;

}
</style>