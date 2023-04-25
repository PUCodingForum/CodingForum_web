<template>
    <div class="container-fluid" v-for="user in users">
        <router-link class="" :to="{ name: 'Profile', params: { user_account: user.account } }">

            <div class="mt-4 mx-4 overflow-hidden card card-body blur shadow-blur user_cover" :style="{
                    backgroundImage:
                        'url(' + user.cover_url + ')',
                    backgroundPositionY: '50%',
                    backgroundSize: 'cover'
                }">
                <div class="row gx-4">
                    <div class="col-auto">
                        <div class="avatar avatar-xl position-relative">
                            <img :src="user.pic_url" alt="" class="shadow-sm w-100 border-radius-lg"
                                style="background-color: antiquewhite;" />
                        </div>
                    </div>
                    <div class="col-auto my-auto">
                        <div class="h-100">
                            <h5 class="mb-1" style="    
                            background-color: black;
                            color: white;
                            border-radius: 5px;">
                                {{ user.name }}
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        </router-link>
    </div>
</template>
  
<script>
import { ElMessage } from "element-plus";

import SoftButton from "../components/SoftButton.vue";

export default {
    name: "alluser",
    components: {
        SoftButton
    },
    data() {
        return {
            users: [],
        };
    },
    created() {
        this.axios
            .get("/api/auth/get_all_user", {
            }, {
            })
            .then((res) => {
                this.users = res.data.success
                console.log(res.data.success);
            })
    },
    methods: {
        upload() {
            this.$router.push({ name: 'Upload' });
        },
    },
};
</script>
<style scoped>
@media (min-width: 1200px) {}
</style>