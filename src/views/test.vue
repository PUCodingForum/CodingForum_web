<template>
    <QuillEditor theme="snow" v-model="value" :options="editorOptions" @change="onHandleChange" />
    {{ output }}
</template>

<script>
import Quill from 'quill'
import mention from 'quill-mention' // 引入mention 组件
import 'quill-mention/dist/quill.mention.min.css'

Quill.register({
    'modules/mention': mention,
})

export default {
    name: "test",
    components: {
    },
    data() {
        return {

            userList: [{ 'value': 1, 'key': 'test' }],
            output: [],
            editorOptions: {

                placeholder: this.placeholder, // 文本提示信息

                modules: {

                    toolbar: [['bold', 'underline', { color: [] }, { list: 'ordered' }, { list: 'bullet' }]], // 定义菜单栏 （粗体，下划线，颜色，排序。其他配置的可以到官网去找）

                    mention: {  // 重点： 提醒功能配置项

                        allowedChars: /^[A-Za-z\s]*$/, // 正则匹配

                        mentionDenotationChars: ['@'], // 匹配符号，匹配到@符号弹出提醒框

                        offsetLeft: 4,

                        source: (searchTerm, renderList, mentionChar) => {

                            const values = this.userList.map(item => ({

                                id: item.value,

                                value: item.key,

                            }))

                            renderList(values, searchTerm) // 渲染函数（生成提醒框）

                        },

                        onSelect: (data, insertItem) => { // 注意：选中后的回调函数

                            const item = {

                                text: `@${data.value}`,

                                name: data.value,

                                id: data.id,

                            }

                            insertItem(data) // 注意：这个函数必须加上，有这个才会在文本框显示选中的值

                            // this.onSelectd(item) // 返回给后端的选中提醒的人
                            console.log(item)
                            if (!this.output.includes(item.id)) {
                                this.output.push(item.id)

                            }
                        },

                    },

                },

            },

        };
    },

};
</script>