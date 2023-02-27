<template>
    <div class="vote">
        <div class="vote__down-vote" @click.prevent="downvote" :class="[{ voted: now_user_post_like == -1 }]">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9L12 15L18 9" stroke="#8A939A" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
        </div>

        <div class="vote__count" :class="[
            { down: now_user_post_like == -1 },
            { up: now_user_post_like == 1 },
            { positive: num > 0 },
            { negative: num < 0 },
        ]">
            <span class="vote__count-n"><i class="fa-solid fa-heart"></i> x {{ num + 1 }}</span>
            <span class="vote__count-n"><i class="fa-solid fa-heart"></i> x {{ num }}</span>
            <span class="vote__count-n"><i class="fa-solid fa-heart"></i> x {{ num - 1 }}</span>
        </div>
        <div class="vote__up-vote" @click.prevent="upvote" :class="[{ voted: now_user_post_like == 1 }]">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 15L12 9L6 15" stroke="#8A939A" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
        </div>
        now_user_post_like:{{ now_user_post_like }} user_post_like:{{ user_post_like }} num:{{ num }} count:{{ count }}
    </div>
</template>
  
<script>
import { ElMessage } from "element-plus";

export default {
    props: {
        post_id: {
            type: Number,
        },
        count: {
            type: Number,
        },
        user_post_like: {
            type: Number,
        },
    },
    created() {
        this.$watch(
            () => ({
                user_post_like: this.user_post_like,
                now_user_post_like: this.now_user_post_like,
            }),
            () => {
                if (this.$route.name != 'Video') {
                    return;
                }
                this.now_user_post_like = this.user_post_like
                this.num = this.count
                if (this.now_user_post_like == 1) {
                    this.num--
                } else if (this.now_user_post_like == -1) {
                    this.num++
                }




            },
            { deep: true, immediate: true }
        );
    },
    data() {
        return {
            token: this.$cookies.get("token"),
            now_user_post_like: this.user_post_like,
            num: 0,
        };
    },
    mounted() {
    },
    methods: {
        downvote() {
            if (!this.token) {
                ElMessage.error("請先登入以進行操作");
                this.$router.push({ name: 'Sign In' });
            }

            this.axios
                .post("/api/forum/like_post", {
                    post_id: this.post_id,
                    dislike_or_like: -1,
                }, {
                    headers: {
                        'Authorization': `Bearer ` + this.token
                    }
                })
                .then((res) => {
                    this.now_user_post_like = res.data.dislike_or_like
                })
        },
        upvote() {
            if (!this.token) {
                ElMessage.error("請先登入以進行操作");
                this.$router.push({ name: 'Sign In' });
            }

            this.axios
                .post("/api/forum/like_post", {
                    post_id: this.post_id,
                    dislike_or_like: 1,
                }, {
                    headers: {
                        'Authorization': `Bearer ` + this.token
                    }
                })
                .then((res) => {
                    this.now_user_post_like = res.data.dislike_or_like
                })
        },
    },
};
</script>
  
<style >
.vote {
    display: flex;
    align-items: center;
}

.vote svg path {
    stroke: #595959;
}

.vote__count {
    min-width: 30px;
    height: 24px;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #595959;
    display: flex;
    align-items: center;
    user-select: none;
    justify-content: center;
    position: relative;
    display: flex;
    flex-direction: column;
    max-height: 20px;
    overflow: hidden;
}

.vote__count .vote__count-n {
    transition: all 0.4s ease;
}

.vote__count.up .vote__count-n {
    transform: translateY(100%);
}

.vote__count.down .vote__count-n {
    transform: translateY(-100%);
}

.vote__count.negative {
    color: #d34f57;
}

.vote__count.positive {
    color: #2ea83a;
}

.vote__down-vote {
    border-radius: 50%;
}

.vote__down-vote.voted {
    background: rgba(211, 79, 87, 0.1);
}

.vote__down-vote.voted svg path {
    stroke: #d34f57;
}

.vote__down-vote.voted:hover {
    background: rgba(211, 79, 87, 0.2);
}

.vote__down-vote:hover {
    background: rgba(0, 0, 0, 0.05);
}

.vote__up-vote {
    border-radius: 50%;
}

.vote__up-vote.voted {
    background: rgba(79, 167, 87, 0.1);
}

.vote__up-vote.voted svg path {
    stroke: #2ea83a;
}

.vote__up-vote.voted:hover {
    background-color: rgba(79, 167, 87, 0.2);
}

.vote__up-vote:hover:hover {
    background: rgba(0, 0, 0, 0.05);
}
</style>