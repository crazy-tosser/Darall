import axios from '@/plugins/axios'
import { ActionTree } from "vuex"
import { RootState } from "@/plugins/store"
import { ICategories, IProducts, ITags, MainState } from "./types"
import { MainMutations } from './mutations'


export enum MainActions {
	GET_TAGS = "GET_TAGS",
	ADD_TAG = "ADD_TAG",
	EDIT_TAG = "EDIT_TAG",
	DEL_TAG = "DEL_TAG",

	GET_CATEGORIES = "GET_CATEGORIES",
	ADD_CATEGORIES = "ADD_CATEGORIES",
	EDIT_CATEGORIES = "EDIT_CATEGORIES",
	DEL_CATEGORIES = "DEL_CATEGORIES",

	GET_PROPDUCTS = "GET_PROPDUCTS",
	ADD_PROPDUCTS = "ADD_PROPDUCTS",
	EDIT_PROPDUCTS = "EDIT_PROPDUCTS",
	DEL_PROPDUCTS = "DEL_PROPDUCTS"
}

export const actions: ActionTree<MainState, RootState> =  {
	async [MainActions.GET_TAGS] ({ commit }) {
		
		await axios.get('/tags')
			.then(response => {
				commit(MainMutations.SET_TAGS, response.data)
			
				}
			)
			.catch(error => {
				commit(MainMutations.SET_ERROR, error)

			})
	},
	async [MainActions.ADD_TAG] ({ commit }, data) {
		await axios.post('/tags',data)
			.then(response => {
				//commit(MainMutations.SET_TAGS, response.data)
				
				}
			)
			.catch(error => {
				commit(MainMutations.SET_ERROR, error)
			})
	},
	async [MainActions.EDIT_TAG] ({ commit }, data: ITags) {
		await axios.put('/tags/'+data.id, data)
			.then(response => {
				//commit(MainMutations.SET_TAGS, response.data)
				
				}
			)
			.catch(error => {
				commit(MainMutations.SET_ERROR, error)
			})
	},
	async [MainActions.DEL_TAG] ({ commit }, data: number) {
		await axios.delete('/tags/'+data)
			.then(response => {
				//commit(MainMutations.SET_TAGS, response.data)
				
				}
			)
			.catch(error => {
				commit(MainMutations.SET_ERROR, error)
			})
	},

	async [MainActions.GET_CATEGORIES] ({ commit }) {
		
		await axios.get('/categories')
			.then(response => {
				commit(MainMutations.SET_CATEGORIES, response.data)
			
				}
			)
			.catch(error => {
				commit(MainMutations.SET_ERROR, error)

			})
	},
	async [MainActions.ADD_CATEGORIES] ({ commit }, data) {
		await axios.post('/categories',data)
			.then(response => {
				//commit(MainMutations.SET_TAGS, response.data)
				
				}
			)
			.catch(error => {
				commit(MainMutations.SET_ERROR, error)
			})
	},
	async [MainActions.EDIT_CATEGORIES] ({ commit }, data: ICategories) {
		await axios.put('/categories/'+data.id, data)
			.then(response => {
				//commit(MainMutations.SET_TAGS, response.data)
				
				}
			)
			.catch(error => {
				commit(MainMutations.SET_ERROR, error)
			})
	},
	async [MainActions.DEL_CATEGORIES] ({ commit }, data: number) {
		await axios.delete('/categories/'+data)
			.then(response => {
				//commit(MainMutations.SET_TAGS, response.data)
				
				}
			)
			.catch(error => {
				commit(MainMutations.SET_ERROR, error)
			})
	},

	async [MainActions.GET_PROPDUCTS] ({ commit }) {
		
		await axios.get('/products')
			.then(response => {
				commit(MainMutations.SET_PROPDUCTS, response.data)
			
				}
			)
			.catch(error => {
				commit(MainMutations.SET_ERROR, error)

			})
	},
	async [MainActions.ADD_PROPDUCTS] ({ commit }, data) {
		await axios.post('/products',data)
			.then(response => {
				//commit(MainMutations.SET_TAGS, response.data)
				
				}
			)
			.catch(error => {
				commit(MainMutations.SET_ERROR, error)
			})
	},
	async [MainActions.EDIT_PROPDUCTS] ({ commit }, data) {
		await axios.put('/products/'+ data.product.id, data)
			.then(response => {
				//commit(MainMutations.SET_TAGS, response.data)
				
				}
			)
			.catch(error => {
				commit(MainMutations.SET_ERROR, error)
			})
	},
	async [MainActions.DEL_PROPDUCTS] ({ commit }, data: number) {
		await axios.delete('/products/'+data)
			.then(response => {
				//commit(MainMutations.SET_TAGS, response.data)
				
				}
			)
			.catch(error => {
				commit(MainMutations.SET_ERROR, error)
			})
	},
}
