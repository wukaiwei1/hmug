<template>
  <view>
    <view class="topSearch">
      <view class="search_btn">搜索</view>
    </view>
    <!-- banner -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="banners" :circular="true">
      <swiper-item v-for="item in banners" :key="item.goods_id">
        <image @click="goGoodDetail(item.goods_id)" :src="item.image_src" mode="aspectFit"></image>
      </swiper-item>
    </swiper>
    <!-- 分类导航区域 -->
    <view class="nav-list">
      <view @click="clickNav(item)" class="nav-item" v-for="(item, i) in navs" :key="i">
        <image :src="item.image_src" class="nav-img"></image>
      </view>
    </view>
    <!-- 楼层区域 -->
    <view class="floor-list">
      <!-- 楼层 item 项 -->
      <view class="floor-item" v-for="(item, i) in floors" :key="i">
        <!-- 楼层标题 -->
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        <!-- 内容部分 -->
        <view class="floor-img-box">
          <!-- 左侧大图片的盒子 -->
          <view class="left-img-box" @click="goodList(item.product_list[0].navigator_url)">
            <image class="left-img" :src="item.product_list[0].image_src"
              :style="{width:item.product_list[0].image_width+'rpx'}">
            </image>
          </view>
          <!-- 右侧 4 个小图片的盒子 -->
          <view class="right-img-box">
            <view class="right-img-item" v-for="(item2,i) in item.product_list" :key="i" v-if="i !== 0"
              @click="goodList(item2.navigator_url)">
              <image class="image" :style="{width:item2.image_width+'rpx'}" :src="item2.image_src">
              </image>
            </view>
          </view>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
  import {
    getBanner,
    getNavs,
    getFloors
  } from '@/api'
  export default {
    data() {
      return {
        banners: [],
        navs: [],
        floors: []
      };
    },
    methods: {
      // 获取轮播图数据
      async loadBanner() {
        const res = await getBanner()
        this.banners = res
      },
      async loadNavs() {
        const res = await getNavs()
        this.navs = res
      },
      // 点击跳转商品详情页
      goGoodDetail(id) {
        uni.navigateTo({
          url: '/subPackages/goods_detail/goods_detail?id=' + id
        })
      },
      // 获取楼层数据
      async getFloors() {
        const res = await getFloors()
        this.floors = res
      },
      // 点击导航栏
      clickNav(item) {
        if (item.name === "分类") {
          uni.switchTab({
            url: "/pages/cate/cate"
          })
        }
      },
      // 点击图片
      goodList(url) {
        uni.navigateTo({
          url: '/subPackages/goods_list/goods_list' + url.slice(url.indexOf("?"))
        })
      }
    },
    // 页面加载钩子函数
    onLoad() {
      this.loadBanner()
      this.loadNavs()
      this.getFloors()
    }
  }
</script>

<style lang="scss">
  .topSearch {
    width: 750rpx;
    height: 175rpx;
    background-color: #c00000;
    display: flex;
    justify-content: center;
    overflow: hidden;

    .search_btn {
      width: 550rpx;
      height: 60rpx;
      margin-top: 90rpx;
      background-color: #fff;
      border-radius: 30rpx;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .banners {
    width: 750rpx;
    height: 341rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;

    .nav-img {
      width: 128rpx;
      height: 140rpx;
    }
  }

  .floor-title {
    height: 60rpx;
    width: 100%;
    display: flex;
  }

  .right-img-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .image {
      height: 190rpx;
    }
  }

  .floor-img-box {
    display: flex;
    padding-left: 10rpx;

    .left-img {
      height: 392rpx !important;
    }
  }
</style>
