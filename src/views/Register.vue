<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <p class="text-xs-center">
            <router-link :to="{name:'login'}">
              Need an account
            </router-link>
          </p>
            Validation Error
            <form @submit.prevent="onSubmit">
              <fieldset class="form-group">
                <input type="text"
                       class="form-control form-control-lg"
                       placeholder="Username"
                       />
              </fieldset>
              <fieldset class="form-group">
                <input type="text"
                       class="form-control form-control-lg"
                       placeholder="e-mail"
                       />
              </fieldset>
              <fieldset class="form-group">
                <input type="password"
                       class="form-control form-control-lg"
                       placeholder="password"
                       />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Sign Up
              </button>
            </form>
            <button
              @click="increaseCounter"
              >Increase counter</button>
              {{count}}
            <button
              @click="decrementCounter"
              >Уменьшить счетчик</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
 export default{
   name:'Register',
   computed:{
     count(){
       return this.$store.state.count
     },
   },
   methods:{
     onSubmit(){
       alert('aloha')
     },
     increaseCounter(){
       this.$store.commit('increment')
     },
     decrementCounter(){
       this.$store.commit('dicrement')
     }
   }
 }
</script>

