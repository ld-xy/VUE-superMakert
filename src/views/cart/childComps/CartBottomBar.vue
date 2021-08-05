<template>
    <div class="bottom-bar">
        <div class="button">
            <check-button :is-check='isSelectAll' class="check-button" @click.native="checkAll"></check-button>
            <span>全选</span>
        </div>
        <div class="total-price">
            合计：{{totalPrice}}
        </div>
        <div class="calculate" @click="calcClick">
            去计算({{counted}})
        </div>
    </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import {mapGetters} from 'vuex'
export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },                    //并且这个计算属性还会随着属性修改而改变
  computed: {          //当需要计算等，需要存储并且可能多次使用时候，就要使用计算属性，必须使用set，get，但是get可省略，必须要是return
    ...mapGetters(['cartList']),
    totalPrice () {
    //   return '￥' + this.$store.state.cartList.filter(item => {
      return '￥' + this.cartList.filter(item => {  // mapGetters结构之后这样写
          return item.checked}).reduce((preValue,item) => {        // reduce函数就是将剩下的遍历，第一个参数是遍历的上一次的值
              return preValue + item.price * item.count            //item是每次遍历的item，最后的0是初始值
          },0).toFixed(2) // toFixed(2) 计算结果保留2位小数
    },
    counted () {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll () {
        // 1. filter会将数组全部遍历完
        // if(this.cartList.length === 0) return false
    //   return !(this.cartList.filter(item => !item.checked).length) // 对未被选中的商品长度进行取反，0取反为true
    // 2. find只找到一个就不找了，性能会高一点
      if(this.cartList.length === 0) return false  // 购物车中没有商品时，默认不选中
      return !(this.cartList.find(item => !item.checked)) // (括号里面有值的情况下再取反，结果就为false)
    // 3.简单遍历，也会全部遍历完
    // for(let item of this.cartList){
    //     if(!item.checked){ // 没有选中的情况为真
    //             return false
    //         }
    //     }
    //         return true
    }
  },
  methods: {
    checkAll () {
      if(this.isSelectAll){ // 全部选中时
        this.cartList.forEach(item => item.checked = false)
      }else {
        this.cartList.forEach(item => item.checked = true)
      }
    //   上述代码可以做一个简化
    // this.cartList.forEach(item => item.checked = !this.isSelectAll)  平常的代码可以这样做简化，但此时不行，因为isSelectAll又会影响其他的地方，相互影响
    },
    calcClick () {
      if(!this.isSelectAll){
        this.$toast.show('请选择购买的商品',1000)
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar {
    height: 40px;
    line-height: 40px;
    background-color: #eee;
    position: relative;
    z-index: 99;
    display: flex;
    text-align: center;
    font-size: 14px;
}
.button {
    display: flex;          /* 方便子元素设置均分或者，居中 felx : 1 */
    align-items: center;    /* 将设置了flex流式布局的组件设置居中 */
    margin-left: 8px;
    width: 60px;
}
.check-button {
    width: 18px;
    height: 18px;
    line-height: 20px;
    margin-right: 5px;
}
.total-price {
    margin-left: 20px;
    flex: 1;
}
.calculate {
    width: 100px;
    background-color: pink;
}
</style>
