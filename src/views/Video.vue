<template>
  <div class="container-fluid mt-4">

    <div class="row">
      <div class="col-lg-8">

        <div class="card">
          <div class="card-body">
            <el-main style="padding:0" v-loading="video_loading" element-loading-text="影片載入中"
              element-loading-background="rgba(0, 0, 0, 0.1)">
              <div class="container_video">
                <YoutubeVue3 ref="youtube" :videoid="post.video_id" :controls="1" class="youtub" @played="onPlayed" />
              </div>

              <div class="title_font">
                {{ uva_topic.show }}
              </div>

              <div class="comment__author" style="    align-self: flex-start;" v-if="post.length != 0">
                <img class="userimg comment__avatar " :src="post.user_pic_url" alt="" />
                <h3 class="comment__title" style="margin:0">
                  <router-link class="" :to="{ name: 'Profile', params: { user_id: post.user_id } }">
                    {{ post.user_name }} </router-link>
                </h3>
                <div v-if="post.length != 0">
                  CPE星數: <i class="fa-solid fa-star-of-david" v-for="star in post.uva_topic.star"></i>
                  <div v-if="post.uva_topic.star == null" style="    display: inline-block;">無</div> 。
                </div>

                <timeago :datetime="post.created_at.replaceAll('/', '-')" v-if="post.length != 0" />
                。
                <Vote @like_function="like_post" v-bind="{
                  post_id: post.id,
                  count: this.post_likes,
                  isLiked: this.isLiked,
                  isDisliked: this.isDisliked,
                  loading: this.loading,
                  type: 0//0post //1comment
                }" />
                <router-link style=" font-size: 13px;" v-if="token_user_id == post.user_id"
                  :to="{ name: 'EditPost', params: { post_id: post.id } }">
                  <i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>編輯貼文</router-link>
              </div>
              <div class="mt-2">
                <textarea class="form-control" id="content" v-model="post.content" rows="4" readonly></textarea>
                <!-- {{ post.content }} -->

              </div>

            </el-main>
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="card">
          <div class="card-body p-3">
            <div class="mb-3">
              <label>程式語言</label>
              <el-select v-model="post.code_editor_type" class="" placeholder="請選擇程式語言" disabled>
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </div>
            <div class="mb-3">
              <label>程式碼</label>

              <Codemirror v-model:value="post.code" :options="cmOptions" border ref="cmRef" height="600" width="100%"
                @change="onChange" @input="onInput" @ready="onReady" :key="selete_loading">
              </Codemirror>
            </div>
          </div>
        </div>
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
                    <CommentTextArea ref="postcomment" @newcomment="newcomment" :all_user="all_user"
                      @click="checklogin" />
                  </div>
                  <div class="col-1 px-0">
                    <a class="btn btn-link text-dark px-3 mb-0" @click="$refs.postcomment.comment()">
                      <i class="fa-solid fa-paper-plane"></i> 送出
                    </a>
                  </div>
                </div>
                <div v-for="(item, index) in comments" :key="item.id">
                  <Comment @remove_comment="remove_comment" v-if="item.id != null" v-bind="{
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
                    all_user: all_user,
                    type: 0
                  }" />

                </div>

              </div>
            </div>
          </div>
        </infinite-scroll>

      </div>
      <div class="col-md-5 mt-4">

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
      token_user_id: this.$cookies.get("user_id"),
      now_user_pic_url: this.$global_pic_url,
      isLiked: false,
      isDisliked: false,
      noResult: false,
      message: "",
      more_lock: false,
      limit: 0,
      all_user: [],
      options: [{ value: 'text/x-csrc', label: 'C' }, { value: 'text/x-c++src', label: 'C++' }, { value: 'text/x-java', label: 'Java' }, { value: 'python', label: 'Python' }],
      code_type: 'text/x-csrc',
      selete_loading: 0,
      cmOptions: {
        mode: 'text/x-csrc', // Language mode
        theme: 'lucario', // Theme
        indentWithTabs: true,
        smartIndent: true,
        lineNumbers: true,
        lineWrapping: true,
        matchBrackets: true,
        autofocus: true,
        readOnly: true,
      },

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
    if (this.$cookies.isKey("now_user_pic_url"))
      this.now_user_pic_url = this.$cookies.get("now_user_pic_url")

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
    function get_all_user() {
      return axios
        .get("/api/auth/get_all_user", {
        });
    }

    this.axios.all([get_post(this.post_id), get_comment(this.post_id), get_like(this.post_id, this.token), get_all_user()]).then(
      this.axios.spread((res1, res2, res3, res4) => {
        console.log(res4.data.success);
        this.all_user = res4.data.success;
        console.log(res1);
        this.post = res1.data.success;
        this.cmOptions = {
          mode: this.post.code_editor_type, // Language mode
          theme: 'lucario', // Theme
          indentWithTabs: true,
          smartIndent: true,
          lineNumbers: true,
          lineWrapping: true,
          matchBrackets: true,
          autofocus: true,
          readOnly: true,
        }

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

          ElMessage.error("影片不存在");
          that.$router.push({ name: 'Dashboard' });


        }
      }
      );

  },
  methods: {
    checklogin() {
      if (!this.token) {
        ElMessage.error("請先登入以進行操作");
        this.$cookies.set("go_login_then_backpost", this.post_id, "3min");
        this.$router.push({ name: 'Sign In' });
      }
    },
    remove_comment(comment_id) {
      console.log(comment_id)
      this.comments.forEach((comment, index) => {
        if (comment.id == comment_id) {
          this.comments.splice(index, 1);
        };
      });
    },
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
    timelimit() {
      this.limit++;
    },
    async loadDataFromServer() {
      if (this.limit == 0)
        setTimeout(this.timelimit, 100);

      if (!this.more_lock && this.limit >= 1) {
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

@media (min-width: 1200px) {
  .title_font {
    font-size: 1.4rem;
  }
}


@media (max-width: 1200px) {
  .title_font {
    font-size: 1.1rem;
  }
}

.form-control:disabled,
.form-control[readonly] {
  background-color: #ffffff00;
}

textarea {
  cursor: default;
  border: #ffffff00;
}

textarea:focus {
  border-color: #d2d6da;
  box-shadow: 0 0px 0px rgba(0, 0, 0, 0.075) inset, 0 0 0px #d2d6da;
  outline: 0 none;
}
</style>