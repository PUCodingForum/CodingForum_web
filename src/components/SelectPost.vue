<template>
    <el-select ref="elselect" v-model="post_id" filterable remote :remote-method="remoteMethod" placeholder="搜尋已發布貼文"
        no-data-text="未發布貼文過" loading-text="貼文加載中..." :disabled="disabled">
        <el-option v-for="post in posts" :key="post.id"
            :label="post.uva_topic.show + ' 語言:' + post.code_type + ' 上傳時間: ' + post.created_at" :value="post.id">
            <!-- <div style="display:flex;align-items: center;">
                <el-image style="width:10%;margin-right:20px;border-radius: 100px;" :src="post.video_pic_url"
                    fit="fill"></el-image>
                <div>{{ post.uva_topic.show }}</div>
            </div> -->
        </el-option>
    </el-select>
</template>
  
<script>



export default {
    name: "SelectPost",
    props: ["disabled"],
    data() {
        return {
            posts: [],
            virtualoptions: [],
            post_id: '',
            reload: 0,
            placeholder: ''
        };
    },
    created() {
        this.axios
            .post("/api/forum/get_user_post", {
            }, {
                headers: {
                    'Authorization': `Bearer ` + this.$cookies.get("token")
                }
            })
            .then((res) => {
                this.virtualoptions = res.data.success
                this.posts = this.virtualoptions;
            })
    },

    methods: {
        return_post_id() {
            return this.post_id;
        },
        remoteMethod(query) {
            if (query !== '') {
                this.reload++
                this.posts = this.virtualoptions.filter(item => {
                    return (item.uva_topic.show + ' 語言:' + item.code_type + ' 上傳時間: ' + item.created_at).toLowerCase()
                        .indexOf(query.toLowerCase()) > -1;
                });
            } else {
                this.posts = this.virtualoptions;
            }
        },

    },


}
</script>
  
<style >
.el-select-dropdown__item {
    width: 100%;
    height: auto !important;
}

.el-select {
    display: block !important;
}
</style>