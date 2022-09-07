import fly from '@/utils/request.js'
// 获取首页轮播图
export const getBanner = () => fly.get('home/swiperdata')
// 获取导航栏数据
export const getNavs = () => fly.get('home/catitems')
// 获取楼层数据
export const getFloors = () => fly.get('home/floordata')
