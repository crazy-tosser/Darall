<template>
    <div class="d-flex align-center flex-column">
       
        <div class="text-center" v-if="loading">
            <v-progress-circular
            indeterminate
            color="primary"
            ></v-progress-circular>
        </div>
           
        <v-card width="500px"  class="pa-2"  variant="outlined" v-else>
            <v-table class="ma-3">
                <thead>
                <tr>
                    <th class="text-left">id</th>
                    <th class="text-left">Название тега</th>
          
                    <th class="d-flex justify-end align-center">
                        <v-btn size="x-small"  variant="outlined" color="primary" @click="editId=undefined; dialog=true" >Добавить</v-btn>
                    </th>
                </tr>
                </thead>
                <tbody>
                    <tr v-if="tags.length == 0" class="text-center"><td colspan="3">Нет ни одного добавленного тега</td></tr>
                    <tr v-else
                        v-for="item in tags"
                        :key="item.id"
                    >
                        <td>{{ item.id }}</td>
                        <td>{{ item.name }}</td>
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


        <TagsDialog v-model="dialog" v-model:edit-id="editId"></TagsDialog>
        
    </div>
</template>

<script setup lang="ts">
    import TagsDialog from './TagsDialog.vue'
    import { useStore } from '@/plugins/store'
    import { computed, onMounted, ref } from 'vue'
    import { MainActions } from '@/store/main/actions'

    const store = useStore();
    const loading = ref(true)
    const dialog = ref(false)
    const editId = ref<number>()

    const tags = computed(() => store.getters.getTags)
    onMounted(()=>{
        loading.value=true
        store.dispatch(MainActions.GET_TAGS).finally(()=>{loading.value = false})

    })
    const del = (id: number) => {
        loading.value=true
        store.dispatch(MainActions.DEL_TAG, id)
            .then( ()=> {
                     store.dispatch(MainActions.GET_TAGS)}
                     )
            .finally(()=>{loading.value = false})
    }
</script>

<style>

</style>