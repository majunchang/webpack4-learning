<template>
  <div>
    <p>vue demo</p>
    <h1>123</h1>
  </div>
</template>

<script>
import './styles/index.scss'
export default {
    mounted(){
        console.log('测试log日志 是否在编译之后会被打印');
        
    }
}
</script>

<style lang="scss">
body {
  display: flex;
  justify-content: center;
}
</style>