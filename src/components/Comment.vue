<template>
    <div>
        <div class="comment" :class="[{ shaddow: lastOne }, { corner: hasCorner }]">
            <div class="comment__header">
                <div class="comment__author">
                    <div class="comment__avatar">
                        <img :src="avatar" alt="" />
                    </div>
                    <div class="comment__content">
                        <h3 class="comment__title">
                            {{ author }}
                        </h3>
                    </div>
                </div>
                <Vote v-bind="{
                    count: votes,
                    id: id,
                    isLiked: is_liked,
                    isDisliked: is_disliked,
                }" />

            </div>
            <div>
                <p class="comment__body">
                    {{ comment }}
                </p>
            </div>
            <a class="btn btn-link text-dark px-3 mb-0" href="javascript:;">
                <i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit
            </a>
        </div>

        <div v-if="replies.length" class="comment__inner-commment">
            <template v-for="(item, index) in replies" :key="index">
                <Comment v-bind="{
                    avatar: item.image,
                    author: item.author,
                    comment: item.comment,
                    replies: item.replies,
                    lastOne: index === replies.length - 1,
                    hasCorner: replies.length >= 1,
                }" />
            </template>
        </div>
    </div>
</template>
  
<script>
import Vote from "./Vote.vue";
export default {
    components: {
        Vote,
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
        avatar: {
            type: String,
        },
        author: {
            type: String,
        },
        comment: {
            type: String,
        },
        votes: {
            type: Number,
            default: 0,
        },
        id: {
            type: Number,
            default: 0,
        },
        is_liked: {
            type: Boolean,
            default: false,
        },
        is_disliked: {
            type: Boolean,
            default: false,
        },
        replies: {
            type: Array,
            default: () => [],
        },
    },
};
</script>
  
<style>
.comment {
    padding-top: 20px;
    position: relative;
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
    font-size: 12px;
    font-weight: 500;
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