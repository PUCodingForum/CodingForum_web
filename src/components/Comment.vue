<template>
    <div>
        <div class="comment mt-4" :class="[{ shaddow: lastOne }, { corner: hasCorner }]">
            <div class="comment__header row">
                <div class="comment__author col-1" style="    align-self: flex-start;">
                    <img class="userimg comment__avatar " :src="pic_url" alt="" />
                </div>
                <div class="comment__content col-11">
                    <h3 class="comment__title">
                        <router-link class="" :to="{ name: 'Profile', params: { user_account: user_account } }">
                            {{ user_name }} </router-link>

                    </h3>

                    <p class="comment__body">
                        <CommentTextArea @change_readOnly="change_readOnly" @updatevalue="updatevalue" ref="comment"
                            :content="real_content" :readOnly="readOnly" :comment_id="comment_id" :key="textrefresh"
                            :all_user="all_user" />
                        {{ real_content }}
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
                        <a class="btn btn-link text-dark px-3 mb-0" data-bs-toggle="modal"
                            :data-bs-target="'#staticBackdrop' + comment_id" v-if="token_user_id == user_id && readOnly"
                            href="javascript:;">
                            <i class="fa-solid fa-trash me-2"></i>刪除
                        </a>
                    </div>

                </div>


            </div>

        </div>
        <div v-if="children_comments.length" class="comment__inner-commment">
            <template v-for="(item, index) in children_comments" :key="item.id">
                <Comment @delete_child_comment="delete_child_comment" v-bind="{
                    comment_id: item.id,
                    pic_url: item.pic_url,
                    user_name: item.user_name,
                    user_account: item.user_account,
                    user_id: item.user_id,
                    likes: item.likes,
                    content: item.content,
                    lastOne: index === children_comments.length - noResult_corner,
                    hasCorner: children_comments.length >= 1,
                    created_at: item.created_at,
                    user_comment_like: user_comment_like,
                    all_user: all_user,
                    type: 1

                }" />
                <div v-if="!noResult && index === children_comments.length - 1">
                    <soft-button color="dark" variant="gradient" class="my-4 mb-2"
                        @click="get_children_comment(comment_id)">查看更多回覆</soft-button>

                    <!-- <button @click="get_children_comment(comment_id)">查看更多回覆</button> -->
                </div>
            </template>
        </div>

    </div>

    <div class="modal fade" :id="'staticBackdrop' + comment_id" data-bs-backdrop="static" data-bs-keyboard="false"
        tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">是否確認要刪除這則留言</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <CommentTextArea :content="real_content" :readOnly="true" :comment_id="comment_id" :key="textrefresh" />
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="deletecomment">確定</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import CommentTextArea from "@/components/CommentTextArea.vue";
import { ElMessage } from "element-plus";
import SoftButton from "./SoftButton.vue";
import Vote from "./Vote.vue";
export default {
    components: {
        Vote,
        CommentTextArea,
        SoftButton
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
            real_content: this.content,
            children_comments: this.children_comments
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
        user_account: {
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
        all_user: {
            type: Array,
            default: () => [],
        },
        like_post: {
            type: Function
        },
        remove_comment: {
            type: Function
        },
        delete_child_comment: {
            type: Function
        },
        type: {
            type: Number, //0 父 ，1 child
        }
    },
    methods: {
        updatevalue(newvalue) {
            console.log('new' + newvalue)
            this.real_content = newvalue
            this.textrefresh++
        },
        delete_child_comment(comment_id) {
            console.log(comment_id)
            this.children_comments.forEach((comment, index) => {

                if (comment.id == comment_id) {
                    console.log(index)
                    this.children_comments.splice(index, 1);
                };
            });
        },
        change_readOnly() {
            this.readOnly = !this.readOnly
            this.showtext = this.readOnly ? '編輯' : '取消';
        },
        edit() {
            this.readOnly = !this.readOnly
            this.showtext = this.readOnly ? '編輯' : '取消';
            if (!this.readOnly) //備份
                this.content_temp = this.real_content
            else {
                this.real_content = this.content_temp
                this.textrefresh++
            }
        },
        deletecomment() {
            this.axios
                .post("/api/forum/del_comment", {
                    comment_id: this.comment_id,
                }, {
                    headers: {
                        'Authorization': `Bearer ` + this.token
                    }
                })
                .then((res) => {
                    if (this.type == 0)
                        this.$emit('remove_comment', this.comment_id);
                    else if (this.type == 1)
                        this.$emit('delete_child_comment', this.comment_id);

                    ElMessage({
                        message: "留言刪除成功",
                        type: "success",
                        duration: 3000,
                    });
                })
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
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
}

.comment__content {
    padding: 0 !important;
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
    font-size: 15px;
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