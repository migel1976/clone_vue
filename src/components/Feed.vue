<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-if="error">Something bad happened</div>
    <div v-if="feed">
      <div class="article-preview" v-for="(article,index) in feed.articles" :key="index">
        <div class="article-meta">
          <router-link 
            :to="{name:'userProfile',params:{slug:article.author.username}}">
            <img :src="article.author.image"/>
          </router-link>
          <div class="info">
            <router-link
              :to="{
                name:'username',
                params:{slug:article.author.username}
                }"
              class="author">
            {{article.author.username}}
            </router-link>
            <span class="date">{{article.createdAt}}</span>
          </div>
          <div class="pull-xs-right">        
            Add to Favorites

          </div>
        </div>
          <router-link 
            :to="{name:'userProfile',params:{slug:article.author.username}}">
            <h1>{{article.title}}</h1>
            <p>{{article.description}}</p>
            <span>Read more...</span>
            TAG LIST
          </router-link>
      </div>        
    </div>        
  </div>        
</template>
<script>
  import {mapState} from 'vuex'
  import {actionTypes} from '@/store/modules/feed'
  export default{
    name:'Feed',
    props:{
      apiUrl:{
        type:String,
        requied:true
      }
    },
    computed:{
      ...mapState({
        isLoading: state=>state.feed.isLoading,
        feed: state=>state.feed.data,
        error: state=>state.feed.error
      })
    },
    mounted(){
      this.$store.dispatch(actionTypes.getFeed,{apiUrl:this.apiUrl})
    }
  }
</script>

