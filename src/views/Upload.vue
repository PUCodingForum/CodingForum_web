<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card z-index-0">

          <div class="card-body">
            <form role="form" @submit.prevent="post" class="mx-auto col-xl-9">
              <div class="mb-3">
                <label>影片網址(只限Youtube)</label>
                <input class="form-control" v-model="video_url" id="video_url" type="text" placeholder="請貼入網址"
                  name="video_url" required />
              </div>
              <div class="mb-3">
                <label>內容</label>
                <input class="form-control" v-model="content" id="content" type="text" placeholder="請輸入文章內容"
                  name="content" required />
              </div>

              <div class="mb-3">
                <label>請選擇題目</label>
                <el-select ref="elselect" :key="selreload" v-model="select_uva" popper-class="virtualSelect"
                  @visible-change="visibleVirtualoptions" filterable remote :remote-method="remoteMethod"
                  placeholder="請選擇題目" no-data-text="找不到題目" loading-text="題目加載中...">
                  <virtual-list ref="VirtualList" :key="reload" style="max-height: 245px; overflow-y: auto;"
                    :data-key="'id'" :data-sources="uvas" :data-component="itemComponent" :keeps="20" />
                </el-select>
              </div>
              <div class="text-center">
                <soft-button color="dark" full-width variant="gradient" class="my-4 mb-2">上傳</soft-button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import virtualList from 'vue3-virtual-scroll-list'
import ElOptionNode from '@/components/el-option-node';
import SoftButton from "@/components/SoftButton.vue";
import { ElMessage } from "element-plus";

export default {
  name: "Upload",
  components: {
    'virtual-list': virtualList,
    SoftButton,
  },
  data() {
    return {
      uvas: [],
      itemComponent: ElOptionNode,
      virtualoptions: [],
      reload: 0,
      selreload: 0,
      temp: '',
      video_url: '',
      content: '',
      select_uva: null,
      token: this.$cookies.get("token"),
    };
  },
  created() {

    this.axios
      .get("/api/forum/get_uva", {
      })
      .then((res) => {
        this.virtualoptions = res.data.success
        this.uvas = this.virtualoptions;
        this.reload++;
      })
  },

  methods: {
    remoteMethod(query) {
      if (query !== '') {
        this.reload++
        this.uvas = this.virtualoptions.filter(item => {
          return item.show.toLowerCase()
            .indexOf(query.toLowerCase()) > -1;
        });
      } else {
        this.uvas = this.virtualoptions;
      }
    },
    visibleVirtualoptions(bool) {
      if (!bool) {
        // this.selreload++
      }
      if (this.select_uva) {
        this.$refs.VirtualList.scrollToIndex(this.select_uva.value - 3)

      }
    },
    post() {
      if (!this.token) {
        ElMessage.error("請先登入以進行操作");
        this.$router.push({ name: 'Sign In' });
      }
      if (!this.select_uva) {
        ElMessage.error("請選擇題目");
      } else {
        this.axios
          .post("/api/forum/post", {
            serial: this.select_uva.serial,
            video_url: this.video_url,
            content: this.content,
          }, {
            headers: {
              'Authorization': `Bearer ` + this.token
            }
          })
          .then((res) => {

            console.log(res);

            this.$router.push({
              name: 'Dashboard',
              params: {
              }
            });

            ElMessage({
              message: "上傳成功",
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
      }
    },

  },


}
</script>

<style>
.el-select-dropdown__item {
  width: 300px;
}

.el-select {
  display: block !important;
}
</style>