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
                <v-card width="300px" v-else >
                    <v-card-text>
                        <v-text-field
                        label="Название"
                        :rules="rules"
                        variant="outlined"
                        hide-details="auto"
                        v-model="val"
                        ></v-text-field>
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
    const store = useStore();
    

    watch(()=>props.modelValue, ()=>{
        props.editId ? val.value = store.getters.getTagById(props.editId) : val.value = ''
    })
    const loading = ref(false)
    const val = ref('')
    const rules = [
        (value: string) => !!value || 'Обязательное поле',
        (value: string) => (value && value.length >= 3) || 'Минимум 3 символа',
      ]

    const ok = () => {
        let isVal = true
        // rules.forEach( i => { if (isVal && i(val.value)!=false) isVal=false})
        // console.log (isVal) 
        if (props.editId) {
            loading.value = true
            store.dispatch(MainActions.EDIT_TAG, {id: props.editId, name: val.value})
                .finally(()=>{
                        loading.value = false
                        emits('update:editId', undefined)
                        store.dispatch(MainActions.GET_TAGS)
                        emits('update:modelValue', false)
                    })

        } else {
            loading.value = true
            store.dispatch(MainActions.ADD_TAG, {name: val.value})
                .finally(()=>{
                        loading.value = false
                        store.dispatch(MainActions.GET_TAGS)
                        emits('update:modelValue', false)
                    })
        }
    }

    const close = ()=>{
        val.value = ''
        emits('update:editId', undefined)
        emits('update:modelValue', false)
    }
</script>

<style>

</style>