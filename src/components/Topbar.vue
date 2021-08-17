<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" :to="{name:'home'}">
        Clone Vue
      </router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link 
            class="nav-link"
            :to="{name:'home'}"
            active-class="active"
            exact
            >
            Home
          </router-link>
        </li>
        <template v-if="isLoggedIn">
          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'createArticle'}">
              <i class="ion-compose"></i> &nbsp; New Article
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'settings'}">
              <i class="ion-gear-a"></i> &nbsp; Settings 
            </router-link>
          </li>
          <li class="nav-item">
            <router-link 
              class="nav-link"
              :to="{name:'userProfile', parmas:{slug:currentUser.username}}">
              <img class="user-pic" :src="currentUser.image" />
              &nbsp;
              {{currentUser.username}}
            </router-link>
          </li>
        </template>
        <template v-if="isAnonymous">
          <li class="nav-item">
            <router-link 
              class="nav-link" 
              :to="{name:'login'}"
              active-class="active"
              >
              Sign In
            </router-link>
          </li>
          <li class="nav-item">
            <router-link 
              class="nav-link"
              :to="{name:'register'}"
              active-class="active"
              >
              Sign Up
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
  import {getterType} from '@/store/modules/auth'
  import {mapState,mapGetters} from 'vuex'
  export default{
    name:'Topbar',
    computed:{
      ...mapState({
        //currentUser:state=>state.auth.currentUser,
        // isLoggedIn:state=>state.auth.isLoggedIn
      }),
      ...mapGetters({
          currentUser:getterType.currentUser,
        isLoggedIn:getterType.isLoggedIn,
          isAnonymous:getterType.isAnonymous,
      }),
        // currentUser(){
        //  return this.$store.getters[getterType.currentUser]
        // },
        // isLoggedIn(){
        //  return this.$store.getters[getterType.isLoggedIn]
        // },
        // isAnonymous(){
        //  return this.$store.getters[getterType.isAnonymous]
        // }
    }
  }
</script>
