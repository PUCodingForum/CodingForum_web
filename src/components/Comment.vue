<template>
    <div>
        <div class="comment mt-4" :class="[{ shaddow: lastOne }, { corner: hasCorner }]">
            <div class="comment__header row">
                <div class="comment__author col-1" style="    align-self: flex-start;">
                    <img class="userimg comment__avatar " :src="pic_url" alt="" />
                </div>
                <div class="comment__content col-11">
                    <h3 class="comment__title">
                        <router-link class="" :to="{ name: 'Profile', params: { user_id: user_id } }">
                            {{ user_name }} </router-link>

                    </h3>

                    <p class="comment__body">
                        <CommentTextArea @change_readOnly="change_readOnly" ref="comment" :content="content"
                            :readOnly="readOnly" :comment_id="comment_id" :key="textrefresh" />
                        <!-- {{ content }} -->
                    </p>
                    <div style="display: flex;">
                        <Vote @like_function="like_comment" v-bind="{
                            id: comment_id,
                            count: likes,
                            isLiked: this.isLiked,
                            isDisliked: this.isDisliked,
                            loading: this.loading,
                            type: 1 //0post //1comment
                        }" />
                        <a class="btn btn-link text-dark px-3 mb-0" v-if="token_user_id == user_id" @click="edit"
                            href="javascript:;">
                            <i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>{{ showtext }}
                        </a>
                        <a class="btn btn-link text-dark px-3 mb-0" v-if="!readOnly" @click="$refs.comment.save()"
                            href="javascript:;">
                            <i class="fa-solid fa-floppy-disk  me-2"></i>保存
                        </a>
                    </div>

                </div>


            </div>

        </div>
        <div v-if="children_comments.length" class="comment__inner-commment">
            <template v-for="(item, index) in children_comments" :key="index">
                <Comment v-bind="{
                    comment_id: item.id,
                    pic_url: item.pic_url,
                    user_name: item.user_name,
                    user_id: item.user_id,
                    likes: item.likes,
                    content: item.content,
                    lastOne: index === children_comments.length - noResult_corner,
                    hasCorner: children_comments.length >= 1,
                    created_at: item.created_at,
                    user_comment_like: user_comment_like,
                }" />
                <div v-if="!noResult && index === children_comments.length - 1">
                    <button @click="get_children_comment(comment_id)">查看更多回覆</button>
                </div>
            </template>
        </div>

    </div>
</template>
  
<script>
import CommentTextArea from "@/components/CommentTextArea.vue";
import { ElMessage } from "element-plus";

import Vote from "./Vote.vue";
export default {
    components: {
        Vote,
        CommentTextArea
    }, data() {
        return {
            showtext: '編輯',
            now_count: 0,
            readOnly: true,
            post_id: this.$route.params.post_id,
            noResult: false,
            noResult_corner: 0,
            isLiked: false,
            isDisliked: false,
            loading: 0,
            token: this.$cookies.get("token"),
            token_user_id: this.$cookies.get("user_id"),
            content_temp: '',
            textrefresh: 0,
            content: this.content,
            mention: '[]'
        }
    },
    created() {

        this.$watch(
            () => ({
                user_comment_like: this.user_comment_like,
            }),
            () => {
                if (this.$route.name != 'Video') {
                    return;
                }
                this.user_comment_like.forEach(element => {
                    if (element.comment_id == this.comment_id) {
                        console.log(this.comment_id)
                        switch (element.dislike_or_like) {
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
                    }
                });


            },
            { deep: true, immediate: true }
        );
    },
    props: {
        hasCorner: {
            type: Boolean,
            default: false,
        },
        lastOne: {
            type: Boolean,
            default: false,
        },
        pic_url: {
            type: String,
        },
        user_name: {
            type: String,
        },
        user_id: {
            type: String,
        },
        content: {
            type: String,
        },
        likes: {
            type: Number,
            default: 0,
        },
        comment_id: {
            type: Number,
            default: 0,
        },
        children_comment_count: {
            type: Number,
            default: 0,
        },
        children_comments: {
            type: Array,
            default: () => [],
        },
        user_comment_like: {
            type: Array,
            default: () => [],
        },
        like_post: {
            type: Function
        }
    },
    methods: {
        change_readOnly() {
            this.readOnly = !this.readOnly
            this.showtext = this.readOnly ? '編輯' : '取消';
        },
        edit() {
            this.readOnly = !this.readOnly
            this.showtext = this.readOnly ? '編輯' : '取消';
            if (!this.readOnly) //備份
                this.content_temp = this.content
            else {
                this.content = this.content_temp
                this.textrefresh++
            }
        },

        like_comment(dislike_or_like) {
            this.axios
                .post("/api/forum/like_comment", {
                    comment_id: this.comment_id,
                    dislike_or_like: dislike_or_like,
                }, {
                    headers: {
                        'Authorization': `Bearer ` + this.token
                    }
                })
                .then((res) => {
                    let new_user_comment_like = res.data.user_comment_like;
                    switch (new_user_comment_like) {
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
        get_children_comment(comment_id) {

            this.axios
                .post("/api/forum/get_children_comment", {
                    parent_comment_id: comment_id,
                }).then((res) => {
                    let allsame = true;
                    let newcommentcount = 0;
                    console.log(res.data.success)
                    res.data.success.forEach((item) => {
                        if (newcommentcount == 3) return;
                        let same = false;
                        this.children_comments.forEach((comment) => {
                            if (comment.id == item.id) {
                                same = true;
                                return;
                            };
                        });
                        if (same == false) {
                            this.children_comments.push(item);
                            newcommentcount++;
                            allsame = false;
                        }
                    });
                    if (allsame) {
                        this.noResult = true;
                        this.noResult_corner = 1;
                    }
                })
        },
    }
};
</script>
  

<style>
.comment {
    position: relative;
}

.comment.shaddow {
    box-shadow: calc(20px * -1 - 1px) 0 0 0 #fff;

}

.comment.corner::before {
    left: -21px;
    content: "";
    top: 0;
    height: 30px;
    width: 15px;
    position: absolute;
    border-left: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
    border-bottom-left-radius: 8px;
}

.comment__author {
    display: flex;
    align-items: flex-start;
    gap: 10px;
}

.comment__avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: hidden;
    min-width: 36px;
    align-self: flex-start;
}

.comment__title {
    font-size: 14px;
    line-height: 16px;
}

.comment__body {
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
}

.comment__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
}

.comment__inner-commment {
    border-left: 1px solid #e6e6e6;
    padding-left: 20px;
}
</style>