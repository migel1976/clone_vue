import authApi from '@/api/auth'

const state={
	isSubmitting:false
}

const mutations={
	registerStart(state){
		state.isSubmitting=true
	}
}

const actions={
	register(context){
		return new Promise(resolve=>{
			authApi.register(credentials)
				.then(response=>{
					console.log('response',response)
				})
		})
		// setTimeout(()=>{
		// 	context.commit('registerStart')
		// },1000)
	}
}
			

export default {
	state,
	mutations,
	actions
}
