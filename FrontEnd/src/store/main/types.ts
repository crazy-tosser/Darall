export interface MainState {
    error:       boolean,
    error_text:  string,
    tags:        ITags[],
    categories:  ICategories[],
    products:    IProducts[]
}

export interface ITags{
    id: number,
	name: string
}

export interface ICategories{
    id: number,
	name: string,
    created?: string
}

export interface IProducts{
    id?:              number,
	name:             string,
    short_name:       string,
    image:            string,
	price:            number,
	weight:           number,
	calories:         number,
    categoryId:       number,
    tag?:             ITagList[],
  
}
export interface ITagList{
    tagId: number,
}

export const DefaultProducts = <IProducts>{
	name:             '',
    short_name:       '',
    image:            '',
	price:            0,
	weight:           0,
	calories:         0,
    categoryId:       0  
  
}