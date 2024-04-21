<template>
  <view>
    <!-- 使用自定义的搜索组件 -->
    <my-search @click="gotosearch()"></my-search>
    <view class="scroll-view-container">
      <!-- 左侧滑动区 -->
      <scroll-view class="left-scroll-view" scroll-y="true" :style="{height: wh + 'px'}">
        <block v-for="(item, i) in cateList" :key="i">
          <view :class="['left-scroll-view-item',i === active?'active':'']" @click="activeChanged(i)">{{item.cat_name}}
          </view>
        </block>
      </scroll-view>
      <!-- 右侧滑动区 -->
      <scroll-view scroll-y="true" :style="{height:wh+'px'}" :scroll-top="scrollTop">
        <view class="cate-lv2" v-for="(item2,i2) in cateLevel2" :key="i2">
          <!-- 二级分类的标题 -->
          <view class="cate-lv2-title">/ {{item2.cat_name}} /</view>
          <!-- 当前二级分类下的三级分类列表 -->
          <view class="cate-lv3-list">
            <!-- 三级分类的item项 -->
            <view class="cate-lv3-item" v-for="(item3,i3) in item2.children" :key="i3" @click="gotoGoodsList(item3)">
              <!-- 三级分类的图片 -->
              <image :src="item3.cat_icon"></image>
              <!-- 三级分类的文本 -->
              <text>{{item3.cat_name}}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  // 导入自己封装的 mixin 模块
  import badgeMix from '@/mixins/tabbar-badge.js'

  export default {
    // 将 badgeMix 混入到当前的页面中进行使用
    mixins: [badgeMix],
    data() {
      return {
        //当前设备屏幕可使用高度
        wh: 0,
        //分类列表    
        cateList: [],
        //激活
        active: 0,
        //二级分类列表
        cateLevel2: [],
        //滚轮重置
        scrollTop: 0
      };
    },
    onLoad() {
      //获取当前设备屏幕可使用高度
      const sysInfo = uni.getSystemInfoSync()
      this.wh = sysInfo.windowHeight - 50
      //请求分类列表
      this.getCateList()
    },
    methods: {
      //获取分类列表的数据
      async getCateList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/categories')
        if (res.meta.status !== 200) return uni.$showMsg()
        this.cateList = res.message
        //为二级分类赋值
        this.cateLevel2 = res.message[0].children
      },
      activeChanged(i) {
        this.active = i
        //重新为二级分类赋值
        this.cateLevel2 = this.cateList[i].children

        this.scrollTop = this.scrollTop === 0 ? 1 : 0
      },
      // 跳转到商品列表界面
      gotoGoodsList(item) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?cid=' + item.cat_id
        })
      },
      // 搜索事件
      gotosearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">
  .scroll-view-container {
    display: flex;

    .left-scroll-view {
      width: 120px;

      .left-scroll-view-item {
        background-color: #f7f7f7;
        line-height: 60px;
        text-align: center;
        font-size: 12px;

        &.active {
          background-color: #ffffff;
          position: relative;

          &::before {
            content: ' ';
            display: block;
            width: 3px;
            height: 30px;
            background-color: #c00000;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%)
          }
        }
      }
    }
  }

  .cate-lv2-title {
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    padding: 15px 0;
  }

  .cate-lv3-list {
    display: flex;
    flex-wrap: wrap;

    .cate-lv3-item {
      width: 33.33%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;

      image {
        height: 60px;
        width: 60px;
      }

      text {
        font-size: 12px;
      }
    }
  }
</style>