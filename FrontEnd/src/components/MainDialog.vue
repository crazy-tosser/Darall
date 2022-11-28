<template>

            <v-dialog
                v-model="show"
            >

            <div class="d-flex align-center flex-column">
                <div class="text-center" v-if="loading">
                    <v-progress-circular
                    indeterminate
                    color="primary"
                    ></v-progress-circular>
                </div>
                <v-card width="800px" v-else >
                    <v-card-text>
                        <v-row justify="center">
                            <v-col  cols="8"> 
                           
                                <v-row justify="center">
                                    <v-col  cols="8"> 
                                        <v-text-field 
                                            label="Название"
                                                variant="outlined"
                                                hide-details="auto"
                                                v-model="val.name">
                                        </v-text-field>
                                    </v-col>
                                    <v-col  cols="4">
                                        <v-text-field 
                                            label="Короткое Название"
                                                variant="outlined"
                                                hide-details="auto"
                                                v-model="val.short_name">
                                        </v-text-field>
                                    </v-col>
                                    
                                </v-row>
                                <v-row justify="center">
                                    <v-col cols="12">
                                        <v-autocomplete
                                            v-model="val.categoryId"
                                            :items="categories"
                                            item-title="name"
                                            item-value="id"
                                            label="Категория"
                                        ></v-autocomplete>
                                    </v-col>
                                </v-row>
                                <v-row justify="center">
                                    <v-col  cols="4"> 
                                        <v-text-field 
                                            label="Цена"
                                                variant="outlined"
                                                hide-details="auto"
                                                v-model="val.price">
                                        </v-text-field>
                                    </v-col>
                                    <v-col  cols="4">
                                        <v-text-field 
                                            label="Вес"
                                                variant="outlined"
                                                hide-details="auto"
                                                v-model="val.weight">
                                        </v-text-field>
                                    </v-col>
                                    <v-col  cols="4">
                                        <v-text-field 
                                            label="Калории"
                                                variant="outlined"
                                                hide-details="auto"
                                                v-model="val.calories">
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row justify="center">
                                    <v-col  cols="12">
                                        <div class="pa-4">
                                            <h2 class="text-caption mb-2">
                                                Добавьте тегов к блюду
                                            </h2>
                                        
                                            <v-chip-group
                                                v-model="selectedTags"
                                                selected-class="text-primary"
                                                column
                                                multiple
                                            >
                                                <v-chip
                                                    v-for="tag in tags"
                                                    :key="tag.id"
                                                    filter
                                                    variant="outlined"
                                                >
                                                {{ tag.name }}
                                                </v-chip>
                                            </v-chip-group>
                                        </div>
                                    
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col  cols="4"> 
                                <v-img
                                    src="/placeholder.png"
                                    
                                    max-width="500"
                                    max-height="300"
                                    >
                                    
                                </v-img>
                                <div class="ma-2 d-flex justify-center">
                                    <v-btn depressed  disabled>Загрузить</v-btn>
                                </div>
                                <div >
                                    
                                    <div class="text-center">Загрузка изображений пока не доступна, может быть потом</div>
                                    <div class="text-center">¯\_(ツ)_/¯</div>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions class="d-flex flex-row justify-space-between" >
                        <v-btn color="primary"  @click="ok">{{editId ? 'Сохранить':'Добавить'}}</v-btn>
                        <v-btn color="primary"  @click="close">Отмена</v-btn>
                    </v-card-actions>
                </v-card>
            </div>
            </v-dialog>
  
</template>

<script setup lang="ts">
    import { computed, ref, watch } from 'vue';
    import { useStore } from '@/plugins/store'
    import { MainActions } from '@/store/main/actions'
    import { DefaultProducts, IProducts, ITags } from '@/store/main/types';

    const props = defineProps(
	{
		modelValue: {
			type: Boolean,
			required: true
		},
		editId: {
			type: Number
		},
	})
    const emits = defineEmits(['update:modelValue','update:editId'])
    const show = computed(()=>props.modelValue)
    const tags = computed<ITags[]>(()=> store.getters.getTags)
    const categories = computed(() => store.getters.getCategories)
    const selectedTags = ref<number[]>([])
    const store = useStore();
    

    watch(()=>props.modelValue, ()=>{
        console.log(store.getters.getProductsById(props.editId))
        props.editId ? val.value = store.getters.getProductsById(props.editId) : val.value = JSON.parse(JSON.stringify(DefaultProducts))
        props.editId ?? val.value.tag ? val.value.tag?.forEach(i => selectedTags.value.push(tags.value.findIndex(x => x.id == i.tagId))) : selectedTags.value=[]
    })
    const loading = ref(false)
    const val = ref<IProducts>(JSON.parse(JSON.stringify(DefaultProducts)))
    const rules = [
        (value: string) => !!value || 'Обязательное поле',
        (value: string) => (value && value.length >= 3) || 'Минимум 3 символа',
      ]

    const ok = () => {
        let isVal = true
        // rules.forEach( i => { if (isVal && i(val.value)!=false) isVal=false})
        // console.log (isVal) 
        let tagsArray = <number[]>[]
        selectedTags.value.forEach(i => {tagsArray.push(tags.value[i].id)})
       

        if (props.editId) {
            loading.value = true
            store.dispatch(MainActions.EDIT_PROPDUCTS, {product: val.value, tags: tagsArray})
                .finally(()=>{
                        loading.value = false
                        store.dispatch(MainActions.GET_PROPDUCTS)
                        close()
                    })

        } else {
            loading.value = true
            store.dispatch(MainActions.ADD_PROPDUCTS, {product: val.value, tags: tagsArray})
                .finally(()=>{
                        loading.value = false
                        store.dispatch(MainActions.GET_PROPDUCTS)
                        close()
                    })
        }
    }

    const close = ()=>{
        val.value = JSON.parse(JSON.stringify(DefaultProducts))
        selectedTags.value = []
        emits('update:editId', undefined)
        emits('update:modelValue', false)
    }
</script>

<style>

</style>