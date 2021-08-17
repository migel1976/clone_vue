import authApi from '@/api/auth'
import {setItem} from '@/helpers/persistanceStorage'

const state={
	isLoading:false,
	isSubmitting:false,
	currentUser:null,
	validationErrors:null,
	isLoggedIn:null
}
export const mutationTypes={
	registerStart:'[auth] registerStart',
	registerSuccess:'[auth] registerSuccess',
	registerFailure:'[auth] registerFailure',

	loginStart:'[auth] registerStart',
	loginSuccess:'[auth] registerSuccess',
	loginFailure:'[auth] registerFailure',

	getCurrentUserStart:'[auth] getCurrentUserStart',
	getCurrentUserSuccess:'[auth] getCurrentUserSuccess',
	getCurrentUserFailure:'[auth] getCurrentUserFailure'
}

export const actionTypes={
	register:'[auth] register',
	login:'[auth] login',
	getCurrentUser:'[auth] getCurrentUser'
}

export const getterType={
	currentUser:'[auth] currentUser',
	isLoggedIn:'[auth] isLoggedIn',
	isAnonymous:'[auth] isAnonymous'
}

export const getters={
	[getterType.currentUser]:state=>{
		return state.currentUser
	},
	[getterType.isLoggedIn]:state=>{
		return Boolean(state.isLoggedIn)
	},
	[getterType.isAnonymous]:state=>{
		return state.isLoggedIn===false
	}
}

const mutations={
	[mutationTypes.registerStart](state){
		state.isSubmitting=true
		state.validationErrors=null
	},
	[mutationTypes.registerSuccess](state,payload){
		state.isSubmitting=false
		state.currentUser=payload
		state.isLoggedIn=true
	},
	[mutationTypes.registerFailure](state,payload){
		state.isSubmitting=false
		state.validationErrors=payload
	},
	[mutationTypes.loginStart](state){
		state.isSubmitting=true
		state.validationErrors=null
	},
	[mutationTypes.loginSuccess](state,payload){
		state.isSubmitting=false
		state.currentUser=payload
		state.isLoggedIn=true
	},
	[mutationTypes.loginFailure](state,payload){
		state.isSubmitting=false
		state.validationErrors=payload
	},
	[mutationTypes.getCurrentUserStart](state){
		state.isLoading=true
	},
	[mutationTypes.getCurrentUserSuccess](state,payload){
		state.isLoading=false
		state.currentUser=payload
		state.isLoggedIn=true
	},
	[mutationTypes.getCurrentUserFailure](state){
		state.isLoggedIn=false
		state.currentUser=null
		state.isLoading=false
	}
}

const actions={
	[actionTypes.register](context,credentials){
		return new Promise(resolve=>{
			context.commit(mutationTypes.registerStart)
			authApi
				.register(credentials)
				.then(response=>{
					console.log('response',response)
					context.commit(mutationTypes.registerSuccess,response.data.user)
					setItem('accessToken',response.data.user.token)
					resolve(response.data.user)
				})
				.catch(result=>{
					console.log('result errors',result)
					context.commit(mutationTypes.registerFailure,result.response.data.errors)
				})
		})
	},
	[actionTypes.login](context,credentials){
		return new Promise(resolve=>{
			context.commit(mutationTypes.loginStart)
			authApi
				.login(credentials)
				.then(response=>{
					context.commit(mutationTypes.loginSuccess,response.data.user)
					setItem('accessToken',response.data.user.token)
					resolve(response.data.user)
				})
				.catch(result=>{
					context.commit(mutationTypes.loginFailure,result.response.data.errors)
				})
		})
	},
	[actionTypes.getCurrentUser](context){
		return new Promise(resolve=>{
			context.commit(mutationTypes.getCurrentUserStart)
			authApi
				.getCurrentUser()
				.then(response=>{
					context.commit(mutationTypes.getCurrentUserSuccess,response.data.user)
					resolve(response.data.user)
				})
				.catch(()=>{
					context.commit(mutationTypes.getCurrentUserFailure)
				})
		})
	}


}
			

export default {
	state,
	mutations,
	actions,
	getters
}
