<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :goods-item="item"/>
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem'

  export default {
    name: "GoodsList",
    components: {
      GoodsListItem
    },
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods {
    display: flex;   /* 元素设置flex布局 默认组件内所以元素都会集中到一行 将组件内元素设置flex=1  则表示均分该空间*/
    flex-wrap: wrap;     /* 当设置弹性布局时，我们需要设置一个固定宽度，同时开始弹性包裹，也就是每一行根据宽度大小自动选择包裹几个 */
    justify-content: space-around;

    padding: 2px;
  }
</style>
