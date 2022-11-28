import { MutationTree } from "vuex";
import { ICategories, IProducts, ITags, MainState } from "./types";


export enum MainMutations {
	SET_ERROR = "SET_ERROR",
	SET_TAGS = "SET_TAGS",
	SET_CATEGORIES = "SET_CATEGORIES",
	SET_PROPDUCTS = "SET_PROPDUCTS",
	CLEAR_ERROR = "CLEAR_ERROR"
}

export const mutations: MutationTree<MainState> = {
	[MainMutations.SET_ERROR] (state, data) {
		state.error = true
		state.error_text = data
	},
	[MainMutations.CLEAR_ERROR] (state) {
		state.error = false
		state.error_text = ''
	},
	[MainMutations.SET_TAGS] (state, data: ITags[]) {
		state.tags = data
	},
	[MainMutations.SET_CATEGORIES] (state, data: ICategories[]) {
		state.categories = data
	},
	[MainMutations.SET_PROPDUCTS] (state, data: IProducts[]) {
		state.products = data
	}

}