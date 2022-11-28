import { MainState } from "./types";

export const state: MainState = {
    error: false,
    error_text: '',
	tags: [],
    categories: [{id: 0, name: 'Без категории'}],
    products: []
}