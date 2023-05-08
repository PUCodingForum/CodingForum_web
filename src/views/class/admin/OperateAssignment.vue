<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card z-index-0">

          <div class="card-body">
            <form role="form" class="mx-auto col-xl-9">
              <div class="mb-3">
                <label>*作業名稱</label>
                <input class="form-control" v-model="name" type="text" placeholder="請輸入作業名稱" required />
              </div>
              <div class="mb-3">
                <label>作業內容</label>
                <textarea class="form-control" id="content" v-model="content" rows="5" placeholder="請輸入作業內容"
                  required></textarea>
              </div>
              <div class="mb-3">
                <label>*作業時間</label>

                <el-config-provider :locale="locale">
                  <div class="block">
                    <el-date-picker v-model="time" type="datetimerange" start-placeholder="開始日期時間"
                      end-placeholder="結束日期時間" />
                  </div>
                </el-config-provider>

              </div>

              <div class="text-center">
                <soft-button color="dark" full-width variant="gradient" class="mt-2 mb-2"
                  @click.stop.prevent="assignment()">{{ showtext }}</soft-button>

                <soft-button color="warning" full-width variant="gradient" class="mb-5"
                  @click.stop.prevent="$router.go(-1)">取消</soft-button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import SoftButton from "@/components/SoftButton.vue";
import { ElMessage } from "element-plus";
import { ElConfigProvider } from 'element-plus'

import en from 'element-plus/dist/locale/en'
import dayjs from 'dayjs'

export default {
  name: "OperateAssignment",
  components: {
    SoftButton,
  },
  data() {
    return {
      locale: en,
      users: [],
      name: '',
      content: '',
      time: [],
      token: this.$cookies.get("token"),
      coding_class_id: this.$route.params.coding_class_id,
      assignment_id: this.$route.params.assignment_id,
      showtext: '發布作業',

    };
  },
  created() {
    this.$watch(
      () => ({
        coding_class_id: this.coding_class_id,
        assignment_id: this.assignment_id,
      }),
      () => {
        if (this.$route.name != 'OperateAssignment') {
          return;
        }
        console.log(this.assignment_id)
        if (this.assignment_id) {
          this.showtext = '更新作業'
          const that = this;
          this.axios
            .post("/api/class/admin/get_assignment", {
              coding_class_id: this.coding_class_id,
              assignment_id: this.assignment_id
            }, {
              headers: {
                'Authorization': `Bearer ` + this.token
              }
            })
            .then((res) => {
              console.log(res.data.success)
              this.name = res.data.success.name
              this.content = res.data.success.content
              this.time.push(res.data.success.start_at)
              this.time.push(res.data.success.end_at)

            }).catch(function (error) {
              ElMessage.error(error.response.data.error);
              that.$router.push({ name: 'Assignment', params: { coding_class_id: this.coding_class_id } });
            });
        }
      },
      { deep: true, immediate: true }
    );
  },
  methods: {
    assignment() {
      if (!this.token) {
        ElMessage.error("請先登入以進行操作");
        this.$router.push({ name: 'Sign In' });
      }
      this.axios
        .post("/api/class/admin/assignment", {
          coding_class_id: this.coding_class_id,
          name: this.name,
          content: this.content,
          start_at: dayjs(this.time[0]).format("YYYY-MM-DD HH:mm:ss"),
          end_at: dayjs(this.time[1]).format("YYYY-MM-DD HH:mm:ss"),
          assignment_id: this.assignment_id,
        }, {
          headers: {
            'Authorization': `Bearer ` + this.token
          }
        })
        .then((res) => {

          console.log(res);

          this.$router.push({
            name: 'Assignment', params: { coding_class_id: this.coding_class_id }
          });

          ElMessage({
            message: res.data.success,
            type: "success",
            duration: 3000,
          });
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response);

            ElMessage.error(error.response.data.error);

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