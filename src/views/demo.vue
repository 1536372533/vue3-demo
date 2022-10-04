<template>
   <div styleName="agreement">
  <input
    id="radio"
    checked
    type="radio"
  />
  <label htmlFor="radio"></label>
  <span styleName="agreementContent">我已阅读并同意《<a href="#">xxxxxx</a>》</span>
</div>
</template>

<script>
export default{
    name:'AppDEmo'
}
</script>

<style lang="less" scoped>
input[type="radio"] {
  width: 1rem;
  height: 1rem;
  opacity: 0;
}

label {
  position: absolute;
  left: 4vw;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: 1px solid #999;
}
//选中后label样式
input:checked+label {
  width: 1rem;
  height: 1rem;
  background-color: #fff;
  border: 1px solid #999;
}
//选中后labe内的内容
input:checked+label::after {
  position: absolute;
  content: "";
  width: 2.5vw;
  height: 2.5vw;
  top: 0.5vw;
  left: 0.5vw;
  border-radius: 50%;
  background-color: #C8321F;
  border: 1px solid #C8321F;
}
 
</style>
