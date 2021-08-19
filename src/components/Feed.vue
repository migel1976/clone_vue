<template>
  <div>
    Feed
    {{apiUrl}}
  </div>
</template>
<script>
  import {actionTypes} from '@/store/modules/feed'
  export default{
    name:'Feed',
    props:{
      apiUrl:{
        type:String,
        requied:true
      }
    },
    mounted(){
      this.$store.dispatch(actionTypes.getFeed,{apiUrl:this.apiUrl})
    }
  }
</script>

