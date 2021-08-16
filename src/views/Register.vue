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
            <ValidationErrors 
                v-if="validationErrors"
                :validationErrors="validationErrors"
            />
            <form @submit.prevent="onSubmit">
              <fieldset class="form-group">
                <input type="text"
                       class="form-control form-control-lg"
                       placeholder="Username"
                       v-model="username"
                       />
              </fieldset>
              <fieldset class="form-group">
                <input type="text"
                       class="form-control form-control-lg"
                       placeholder="e-mail"
                       v-model="email"
                       />
              </fieldset>
              <fieldset class="form-group">
                <input type="password"
                       class="form-control form-control-lg"
                       placeholder="password"
                       v-model="password"
                       />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right"
                      :disabled="isSubmitting"
                  >
                Sign Up
              </button>
            </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {actionTypes} from '@/store/modules/auth'
 import ValidationErrors from '@/components/ValidationErrors'
 export default{
   name:'Register',
   components:{
     ValidationErrors
   },
   data(){
     return{
       email:this.email,
       password:this.password,
       username:this.username
     }
   },
   computed:{
       isSubmitting(){
           return this.$store.state.auth.isSubmitting
       },
       validationErrors(){
         return this.$store.state.auth.validationErrors
      }      
     //count(){
       //return this.$store.state.count
     //},
   },
   methods:{
     onSubmit(){
         this.$store.dispatch(actionTypes.register,
                              {email:this.email,
                               username:this.username,
                               password:this.password}
           )
           .then(user=>{
             console.log('пользователь создан',user)
             this.$router.push({name:'home'})
           })
     },
   }
 }
</script>

