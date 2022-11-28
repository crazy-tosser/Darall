<template>
  <div class="d-flex align-center flex-column">
    <div class="text-center" v-if="loading">
        <v-progress-circular indeterminate color="primary" ></v-progress-circular>
    </div>
    <v-card width="1000px"  class="pa-2" v-else variant="outlined" >
            <v-table class="ma-3">
               
                <thead>
                <tr>
                    <th class="text-left">id</th>
                    <th class="text-left">Название</th>
                    <th class="text-left">Короткое Название</th>
                    <th class="text-left">Категория</th>
                    <th class="text-left">Цена</th>
                    <th class="text-left">Вес</th>
                    <th class="text-left">Калории</th>
                    <th class="text-left">Теги</th>
                    <th class="d-flex justify-end align-center">
                        <v-btn size="x-small"  variant="outlined" color="primary"  @click="editId=undefined; dialog=true"  >Добавить</v-btn>
                    </th>
                </tr>
                </thead>
               <tbody>
                    <tr v-if="products.length == 0" class="text-center"><td colspan="3">Нет ни одной добавленной категории</td></tr>
                    <tr v-else
                        v-for="item in products"
                        :key="item.id"
                    >
                        <td>{{ item.id }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.short_name }}</td>
                        <td>{{ getCategoryName(item.categoryId) }}</td>
                        <td>{{ item.price }}</td>
                        <td>{{ item.weight }}</td>
                        <td>{{ item.calories }}</td>
                        <td>
                            <v-chip
                                v-for="tag in item.tag"
                                :key="tag.tagId"
                                variant="outlined"
                                class="ml-1 mt-1"
                            >
                            {{ getTagName(tag.tagId)}}
                            </v-chip>
                        </td>
                        <td  class="d-flex justify-end align-center">
                            <v-btn
                                variant="outlined"
                                size="x-small"
                                icon
                                color="info"
                                @click="editId= item.id; dialog=true"
                            >
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn
                                class="ml-3"
                                variant="outlined"
                                size="x-small"
                                icon
                                color="info"
                                @click="del(item.id)"
                            >
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-card>
        <MainDialog v-model="dialog" v-model:edit-id="editId"></MainDialog>
  </div>
</template>

<script setup lang="ts">
    import MainDialog from './MainDialog.vue'
    import { useStore } from '@/plugins/store'
    import { computed, onMounted, ref } from 'vue'
    import { MainActions } from '@/store/main/actions'
    import { ICategories, IProducts, ITags } from '@/store/main/types';

    const store = useStore();
    const loading = ref(true)
    const dialog = ref(false)
    const editId = ref<number>()

    const products = computed(() => store.getters.getProducts)
    const tags = computed<ITags[]>(()=> store.getters.getTags)
    const categories = computed<ICategories[]>(() => store.getters.getCategories)
    onMounted(()=>{
        loading.value=true
        store.dispatch(MainActions.GET_PROPDUCTS).finally(()=>{loading.value = false})

    })
    const del = (id: number) => {
        loading.value=true
        store.dispatch(MainActions.DEL_PROPDUCTS, id)
            .then( ()=> {
                     store.dispatch(MainActions.GET_PROPDUCTS)}
                     )
            .finally(()=>{loading.value = false})
    }
    
    const getTagName = (tag: number) => {
        return tags.value.find(i  => i.id == tag)?.name
    }
    const getCategoryName = (id: number) => {
        return categories.value.find(i  => i.id == id)?.name
    }
</script>

<style>

</style>