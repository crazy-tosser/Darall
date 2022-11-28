import { GetterTree } from "vuex"
import { RootState } from "@/plugins/store"
import { MainState } from "./types"

export const getters: GetterTree<MainState, RootState> = {
	getTags: state => state.tags,
    getTagById: state => (id: number): string=> { const name = state.tags.find( i => i.id == id)?.name 
                                                  return name ? name: ''  },

    getCategories: state => state.categories,
    getCategoriesById: state => (id: number): string=> { const name = state.categories.find( i => i.id == id)?.name 
        return name ? name: ''  },

    getProducts: state => state.products,
    getProductsById: state => (id: number) => state.products.find( i => i.id == id) ,

    getError: state => state.error,
    getErrorMsg: state => state.error_text,
}