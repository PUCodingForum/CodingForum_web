<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="card z-index-0">

                    <div class="card-body">

                        <el-main style="padding:0" v-loading="data_loading" element-loading-text="載入中"
                            element-loading-background="rgb(248 248 248)">
                            <el-table :data="filteredAssignment" style="width: 100%" empty-text="目前尚無作業">
                                <el-table-column label="作業名稱" prop="name" />
                                <el-table-column label="開始時間" prop="start_at" />
                                <el-table-column label="結束時間" prop="end_at" />
                                <el-table-column align="right">
                                    <template #header>
                                        <el-input v-model="search" placeholder="作業名稱搜尋" />
                                    </template>
                                    <template #default="scope">
                                        <el-button>
                                            <router-link
                                                :to="{ name: 'AssignmentIntro', params: { coding_class_id: scope.row.coding_class_id, assignment_id: scope.row.id } }">
                                                作業介紹
                                            </router-link>
                                        </el-button>
                                        <el-button
                                            v-if="scope.row.hand_in_assignment_id == null && scope.row.in_time == true">
                                            <router-link
                                                :to="{ name: 'HandInAssignment', params: { coding_class_id: scope.row.coding_class_id, assignment_id: scope.row.id } }">
                                                繳交作業
                                            </router-link>
                                        </el-button>
                                        <el-button
                                            v-if="scope.row.hand_in_assignment_id == null && scope.row.in_time == false"
                                            disabled>
                                            超過繳交期限
                                        </el-button>
                                        <el-button
                                            v-if="scope.row.hand_in_assignment_id != null && scope.row.in_time == true">
                                            <router-link
                                                :to="{ name: 'HandInAssignment', params: { coding_class_id: scope.row.coding_class_id, assignment_id: scope.row.id, hand_in_assignment_id: scope.row.hand_in_assignment_id } }">
                                                編輯已繳作業
                                            </router-link>
                                        </el-button>
                                        <el-button
                                            v-if="scope.row.hand_in_assignment_id != null && scope.row.in_time == false">
                                            <router-link
                                                :to="{ name: 'HandInAssignment', params: { coding_class_id: scope.row.coding_class_id, assignment_id: scope.row.id, hand_in_assignment_id: scope.row.hand_in_assignment_id } }">
                                                不可編輯，查看已繳作業
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
</template>
  
<script>

import SoftButton from "@/components/SoftButton.vue";
import { ElMessage } from "element-plus";
import SelectUser from '@/components/SelectUser.vue';

export default {
    name: "Assignment",
    components: {
        SoftButton,
        SelectUser
    },
    data() {
        return {
            search: '',
            Assignment: [],
            filteredAssignment: [],
            token: this.$cookies.get("token"),
            token_user_id: this.$cookies.get("user_id"),
            token_user_account: this.$cookies.get("account"),
            coding_class_id: this.$route.params.coding_class_id,
            data_loading: true
        };
    },
    created() {
        this.$watch(
            () => ({
                coding_class_id: this.coding_class_id,
            }),
            () => {
                if (this.$route.name != 'MyAssignment') {
                    return;
                }
                if (!this.coding_class_id) {
                    this.$router.push({ name: 'MyClass' });
                    return;
                }

                const that = this;
                this.axios
                    .post("/api/class/get_assignment", {
                        coding_class_id: this.coding_class_id
                    }, {
                        headers: {
                            'Authorization': `Bearer ` + this.token
                        }
                    })
                    .then((res) => {
                        console.log(res)
                        this.Assignment = res.data.success
                        this.data_loading = false
                    }).catch(function (error) {
                        ElMessage.error(error.response.data.error)
                        that.$router.push({ name: 'MyClass' });
                    })

            },
            { deep: true, immediate: true }
        );
    },
    computed: {
        filteredAssignment() {
            return this.Assignment.filter((item) => {
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