<template>
    <div class="index-search">
        <van-nav-bar>
            <template #left>
                <van-icon @click="back" name="arrow-left" size=".6rem"/>
            </template>
            <template #title>
                <div class="search__title">搜索</div>
            </template>
            <template #right></template>
        </van-nav-bar>
        <van-cell-group>
            <van-field
                v-model="searchText"
                center
                clearable
                label=""
                placeholder="请输入您喜欢的搜索内容11" 
            >
                <template #button>
                    <van-button size="small" type="primary" @click="search">搜索</van-button>
                </template>
            </van-field>
        </van-cell-group>
        <van-list>
            <van-cell v-for="(item, index) in list" :key="item.id">
                <span>{{item.title}}</span>
                <van-icon class="search__list-close" name="close" size="0.3rem" @click="close(index)"></van-icon>
            </van-cell>
        </van-list>
    </div>
</template>
<script>
    /*eslint-disable*/
    export default{
        data() {
            return {
                searchText: '',
                list: [
                    {
                        id: '001',
                        title: '夜曲-周杰伦'
                    },
                    {
                        id: '002',
                        title: '西街-李荣浩'
                    },
                    {
                        id: '003',
                        title: '甜蜜蜜-邓丽君'
                    }
                ],
            };
        },
        methods: {
            back() {
                this.$router.go(-1)
            },
            search() {
                let index = this.list.length + 1
                this.list.push({
                    id: `00${index}`,
                    title: Math.random().toFixed(2) + `东方明珠`
                });
            },
            close(index) {
                this.list.splice(index, 1)
            }
        }
    }
</script>
<style scoped lang="less">
    .index-search{
        width: 100%;
        .search__list-close{
            float: right;
            margin-right: 5px;
        }
    }
</style>