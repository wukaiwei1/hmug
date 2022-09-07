<template>
  <view>
    <van-card :thumb-link="`/subPackages/goods_detail/goods_detail?id=${item.goods_id}`" v-for="item in goods"
      :key="item.goods_id" :price="item.goods_price | tofixed" :title="item.goods_name"
      :thumb="item.goods_big_logo||defaultPic" />
  </view>
</template>

<script>
  import {
    getGoodsList
  } from '@/api'
  import toast from '@/utils/toast.js'
  export default {
    data() {
      return {
        queryData: {
          query: '', //关键字
          cid: '', //分类id
          pagenum: 1, //页码
          pagesize: 10 //每页数量
        },
        goods: [],
        total: '',
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
        loading: false
      }
    },

    methods: {
      async loadGoodsList(stopPullFn) {
        this.loading = true
        const {
          goods,
          total
        } = await getGoodsList(this.queryData)
        this.goods = [...this.goods, ...goods]
        this.total = total
        this.loading = false
        stopPullFn && stopPullFn()
      }
    },
    onLoad(options) {
      this.queryData.query = options.query
      this.loadGoodsList()
    },
    // 监视下拉
    onPullDownRefresh() {
      // 重置数据
      this.queryData = {
        query: this.queryData.query, //关键字
        cid: '', //分类id
        pagenum: 1, //页码
        pagesize: 10 //每页数量
      }
      this.goods = []
      this.total = ''
      // 重新获取数据
      this.loadGoodsList(() => {
        uni.stopPullDownRefresh()
      })
    },
    // 上拉
    onReachBottom() {
      if (this.goods.length >= this.total) return toast('没有更多数据了~')
      if (this.loading) return
      this.queryData.pagenum++
      this.loadGoodsList()
    }
  }
</script>

<style lang="scss">

</style>
