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

                <textarea class="form-control" id="content" v-model="content" rows="5" placeholder="請輸入文章內容"
                  required></textarea>

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
              <div class="mb-3">
                <label>請選擇程式語言</label>
                <el-select v-model="code_select" class="" placeholder="請選擇程式語言">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item" />
                </el-select>
              </div>
              <div class="mb-3">
                <label>請輸入程式碼</label>
                <Codemirror v-model:value="code" :options="cmOptions" border ref="cmRef" height="400" width="100%"
                  @change="onChange" @input="onInput" @ready="onReady" :key="selete_loading">
                </Codemirror>
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
import Codemirror from "codemirror-editor-vue3"

// language
import "codemirror/mode/clike/clike.js";
import "codemirror/mode/python/python.js";
// placeholder
import "codemirror/addon/display/placeholder.js";
// theme
import "codemirror/theme/lucario.css";


export default {
  name: "Upload",
  components: {
    'virtual-list': virtualList,
    SoftButton,
    Codemirror,
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
      options: [{ value: 'text/x-csrc', label: 'C' }, { value: 'text/x-c++src', label: 'C++' }, { value: 'text/x-java', label: 'Java' }, { value: 'python', label: 'Python' }],
      code_select: { value: 'text/x-csrc', label: 'C' },
      selete_loading: 0,
      cmOptions: {
        mode: 'text/x-csrc', // Language mode
        theme: 'lucario', // Theme
        indentWithTabs: true,
        smartIndent: true,
        lineNumbers: true,
        lineWrapping: true,
        matchBrackets: true,
        autofocus: true,
      },
      code: ''
    };
  },
  created() {
    this.$watch(
      () => ({
        code_select: this.code_select,
      }),
      () => {
        if (this.$route.name != 'Upload') {
          return;
        }
        this.cmOptions = {
          mode: this.code_select.value,
          theme: "lucario",
          indentWithTabs: true,
          smartIndent: true,
          lineNumbers: true,
          lineWrapping: true,
          matchBrackets: true,
          autofocus: true,
        },
          this.selete_loading++
      },
      { deep: true, immediate: true }
    );
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
            code: this.code,
            code_type: this.code_select.label,
            code_editor_type: this.code_select.value,
          }, {
            headers: {
              'Authorization': `Bearer ` + this.token
            }
          })
          .then((res) => {

            console.log(res);

            this.$router.push({
              name: 'Video', params: { post_id: res.data.post_id }
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