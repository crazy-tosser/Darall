import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { main } from '@/store/main/index'



export interface RootState {}
export const key: InjectionKey<Store<RootState>> = Symbol()



export const store = createStore<RootState>({
	state: {},
	modules:{
		main,
	
	}
})

export function useStore () {
	return baseUseStore(key)
  }