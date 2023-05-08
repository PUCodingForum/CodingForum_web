<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="card z-index-0">

                    <div class="card-body">
                        <router-link :to="{ name: 'OperateTeacherClass' }"> <soft-button color="dark" full-width
                                variant="gradient" style="    font-size: 15px;">新增課程</soft-button></router-link>
                        <el-main style="padding:0" v-loading="data_loading" element-loading-text="載入中"
                            element-loading-background="rgb(248 248 248)">
                            <el-table :data="filteredCodingClasses" style="width: 100%" empty-text="目前尚無課程">
                                <el-table-column label="學年度" prop="school_year" />
                                <el-table-column label="課程名稱">
                                    <template #default="scope">
                                        <router-link
                                            :to="{ name: 'Assignment', params: { coding_class_id: scope.row.id } }">
                                            {{ scope.row.name }}
                                        </router-link>
                                    </template>

                                </el-table-column>
                                <el-table-column label="TA">
                                    <template #default="scope">
                                        <SelectUser :TA_user_ids="scope.row.TA_user_ids" :disabled=true />
                                    </template>
                                </el-table-column>
                                <el-table-column align="right">
                                    <template #header>
                                        <el-input v-model="search" placeholder="課程名稱搜尋" />
                                    </template>
                                    <template #default="scope">
                                        <el-button size="small">
                                            <router-link
                                                :to="{ name: 'OperateTeacherClass', params: { coding_class_id: scope.row.id } }">
                                                編輯
                                            </router-link>
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-main>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div class="modal fade" :id="'staticBackdrop' + post_id" data-bs-backdrop="static" data-bs-keyboard="false"
        tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">是否確認要刪除這篇貼文</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                        @click.stop.prevent="delpost()">確定</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>

import SoftButton from "@/components/SoftButton.vue";
import { ElMessage } from "element-plus";
import SelectUser from '@/components/SelectUser.vue';

export default {
    name: "TeacherClass",
    components: {
        SoftButton,
        SelectUser
    },
    data() {
        return {
            search: '',
            CodingClasses: [],
            filteredCodingClasses: [],
            token: this.$cookies.get("token"),
            token_user_id: this.$cookies.get("user_id"),
            token_user_account: this.$cookies.get("account"),
            data_loading: true
        };
    },
    created() {
        this.axios
            .post("/api/class/admin/get_teacher_class", {
            }, {
                headers: {
                    'Authorization': `Bearer ` + this.token
                }
            })
            .then((res) => {
                console.log(res.data.success)
                this.CodingClasses = res.data.success
                this.data_loading = false
            }
            )
    },
    computed: {
        filteredCodingClasses() {
            return this.CodingClasses.filter((item) => {
                return item.name.toLowerCase().includes(this.search.toLowerCase());
            });
        },
    },
    methods: {

        delpost() {
            if (!this.token) {
                ElMessage.error("請先登入以進行操作");
                this.$router.push({ name: 'Sign In' });
            }
            this.axios
                .post("/api/forum/del_post", {
                    post_id: this.post_id
                }, {
                    headers: {
                        'Authorization': `Bearer ` + this.token
                    }
                })
                .then((res) => {

                    console.log(res);

                    this.$router.push({
                        name: 'Profile', params: { user_account: this.token_user_account }
                    });

                    ElMessage({
                        message: "刪除成功",
                        type: "success",
                        duration: 3000,
                    });
                })
                .catch(function (error) {
                    if (error.response) {
                        console.log(error.response);
                        if (error.response.status == 402) {
                            ElMessage.error(error.response.data.error);
                        }
                    }
                });

        },

    },


}
</script>
  
<style >
.el-select-dropdown__item {
    width: 300px;
    width: 100%;
}

.el-select {
    display: block !important;
}

.codemirror-container {
    display: block;
}
</style>
<style scoped>
@media (min-width: 1200px) {
    .video_pic {
        width: 20%;
    }
}

@media (max-width: 1200px) {
    .video_pic {
        width: 100%;
    }
}
</style>