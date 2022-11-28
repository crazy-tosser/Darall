import { Module } from "vuex"
import { RootState } from "@/plugins/store"
import { MainState } from "./types"
import { state } from "./state"
import { getters } from "./getters"
import { mutations } from "./mutations"
import { actions } from "./actions"


export const main: Module<MainState, RootState> = {
	state,
	getters,
	mutations,
	actions
}
