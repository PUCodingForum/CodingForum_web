<template>
  <div class="container-fluid mt-4">

    <div class="row">
      <div class="col-lg-8">

        <div class="card">
          <div class="card-body p-3">
            <el-main style="padding:0" v-loading="video_loading" element-loading-text="影片載入中"
              element-loading-background="rgba(0, 0, 0, 0.1)">
              <div class="container_video">
                <!-- <YoutubeVue3 ref="youtube" :videoid="post.video_id" :controls="1" class="youtub" @played="onPlayed" /> -->
              </div>
            </el-main>
            {{ uva_topic.title }}
            <Vote @like_function="like_post" v-bind="{
              post_id: post.id,
              count: this.post_likes,
              isLiked: this.isLiked,
              isDisliked: this.isDisliked,
              loading: this.loading,
              type: 0//0post //1comment
            }" />

          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <invoice-card />
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-md-7">
        <infinite-scroll @infinite-scroll="loadDataFromServer" :message="message" :noResult="noResult">

          <div class="card">
            <div class="card-body p-3">
              <div class="ms-4 mt-5">
                <div class="row mt-4">
                  <div class="col-1 px-0">
                    <img class="userimg comment__avatar" :src="now_user_pic_url" alt="">
                  </div>
                  <div class="col-10 px-0">
                    <CommentTextArea ref="postcomment" @newcomment="newcomment" />

                  </div>
                  <div class="col-1 px-0">
                    <a class="btn btn-link text-dark px-3 mb-0" @click="$refs.postcomment.comment()">
                      <i class="fa-solid fa-paper-plane"></i> 送出
                    </a>
                  </div>
                </div>
                <div v-for="(item, index) in comments" :key="item.id">
                  <Comment v-if="item.id != null" v-bind="{
                    pic_url: item.pic_url,
                    user_name: item.user_name,
                    user_id: item.user_id,
                    content: item.content,
                    children_comment_count: item.children_comment_count,
                    children_comments: item.children_comments,
                    likes: item.likes,
                    comment_id: item.id,
                    created_at: item.created_at,
                    user_comment_like: user_comment_like,
                  }" />

                </div>

              </div>
            </div>
          </div>
        </infinite-scroll>

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
import CommentTextArea from "@/components/CommentTextArea.vue";
import Vote from "@/components/Vote.vue";
const axios = require('axios');
import InfiniteScroll from "infinite-loading-vue3";

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
    Comment,
    CommentTextArea,
    Vote,
    InfiniteScroll
  },
  data() {
    return {
      post: [],
      uva_topic: [],
      post_id: this.$route.params.post_id,
      video_loading: true,
      loading: 0,
      comments: [],
      user_post_like: 0,
      user_comment_like: [],
      token: this.$cookies.get("token"),
      now_user_pic_url: this.$cookies.get("now_user_pic_url"),
      isLiked: false,
      isDisliked: false,
      noResult: false,
      message: "",
      more_lock: false,
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
    const that = this;

    function get_post(post_id) {
      return axios
        .post("/api/forum/get_post", {
          post_id: post_id,
        });
    }
    function get_comment(post_id) {
      return axios
        .post("/api/forum/get_comment", {
          post_id: post_id,
        });
    }
    function get_like(post_id, token) {
      if (token) {
        return axios
          .post("/api/forum/get_like", {
            post_id: post_id,
          }, {
            headers: {
              'Authorization': `Bearer ` + token
            }
          });
      }
      else
        return ''

    }

    this.axios.all([get_post(this.post_id), get_comment(this.post_id), get_like(this.post_id, this.token)]).then(
      this.axios.spread((res1, res2, res3) => {
        console.log(res1);
        this.post = res1.data.success;

        this.video_loading = false;
        this.post_likes = res1.data.success.likes
        this.uva_topic = res1.data.success.uva_topic;
        this.comments = res2.data.success.slice(0, 3);
        if (res3 == '') {
          this.loading++
        }
        this.user_post_like = res3.data.user_post_like

        switch (this.user_post_like) {
          case null:
            this.isLiked = false;
            this.isDisliked = false;
            break;
          case 1:
            this.isLiked = true;
            this.isDisliked = false;
            break;
          case -1:
            this.isLiked = false;
            this.isDisliked = true;
            break;
          default:
            this.isLiked = false;
            this.isDisliked = false;
            break;
        }

        this.user_comment_like = res3.data.user_comment_like;
        this.loading++
      })
    )
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.status);
          if (error.response.status == 401) {
          }
          if (error.response.status == 402) {
            ElMessage.error("影片不存在");
            that.$router.push({ name: 'Dashboard' });

          }
        }
      }
      );

  },
  methods: {
    newcomment(comment) {
      console.log(comment);
      this.comments.unshift(comment[0]);
    },
    onPlayed() {
      this.loading = false
    },
    like_post(dislike_or_like) {
      this.axios
        .post("/api/forum/like_post", {
          post_id: this.post_id,
          dislike_or_like: dislike_or_like,
        }, {
          headers: {
            'Authorization': `Bearer ` + this.token
          }
        })
        .then((res) => {
          this.user_post_like = res.data.user_post_like;
          switch (this.user_post_like) {
            case null:
              this.isLiked = false;
              this.isDisliked = false;
              break;
            case 1:
              this.isLiked = true;
              this.isDisliked = false;
              break;
            case -1:
              this.isLiked = false;
              this.isDisliked = true;
              break;
            default:
              this.isLiked = false;
              this.isDisliked = false;
              break;
          }
          this.loading++

        })
    },

    async loadDataFromServer() {
      if (!this.more_lock) {
        this.more_lock = true;
        if (!this.noResult) {
          await this.axios
            .post("/api/forum/get_comment", {
              post_id: this.post_id,
            })
            .then((res) => {
              let allsame = true;
              let newcommentcount = 0;
              console.log(res.data.success)
              res.data.success.forEach((item) => {
                if (newcommentcount == 6) return;
                let same = false;
                this.comments.forEach((comment) => {
                  if (comment.id == item.id) {
                    same = true;
                    return;
                  };
                });
                if (same == false) {
                  this.comments.push(item);
                  newcommentcount++;
                  allsame = false;
                }
              });
              if (allsame)
                this.noResult = true

            })
        }

        this.more_lock = false;

      }
    }


  },
};
</script>
<style scoped>
.boss {
  margin-top: 100px;

}
</style>