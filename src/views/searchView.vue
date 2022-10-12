<template>
    <div class="index-search">
        <van-nav-bar>
            <template #left>
                <van-icon name="arrow-left" size=".6rem"/>
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
                placeholder="请输入您喜欢的搜索"
            >
                <template #button>
                    <van-button size="small" type="primary" @click="search">搜索</van-button>
                </template>
            </van-field>
        </van-cell-group>
        <van-list>
            <van-cell v-for="(item, index) in list" :key="list.id">
                <span>{{item.title}}</span>
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
                        title: '爱我'
                    },
                    {
                        id: '002',
                        title: '爱我不'
                    },
                    {
                        id: '003',
                        title: 'bu爱我'
                    }
                ],
            };
        },
        methods: {
            search() {
                
            }
        }
    }
</script>
<style scoped>
    .index-search{
        width: 100%;
    }
</style>