<template>
  <v-app>
    <v-app-bar flat>
      <v-container class="fill-height d-flex align-center">
        <v-avatar
          class="mr-10 ml-4"
          color="grey-darken-1"
          size="64"
        ><v-img
          src="/avatar.png"
          ></v-img>
        </v-avatar>
    
        <v-tabs
          v-model="tab"
          bg-color="transparent"
          grow
        >

					<v-tab
							v-for="link in links"
							:key="link.title"
              :value="link.component"
					>
						{{link.title}}
					</v-tab>
				</v-tabs>
        <!-- <component
								v-bind:is="tab">
						</component>
         -->

        <v-spacer></v-spacer>

      </v-container>
    </v-app-bar>
    <v-main>

      <v-window v-model="tab" class="mt-6">
        <v-window-item
          v-for="link in links"
          :key="link.title"
          :value="link.component"
        >
          <v-card
            color="basil"
            flat
          >
            <component
								:is="link.component">
						</component>
          </v-card>
        </v-window-item>
      </v-window>
    </v-main>
    <v-snackbar
      v-model="error"
      multi-line
    >
      {{ errorMsg }}

      <template v-slot:actions>
        <v-btn
          color="red"
          variant="text"
          @click="error = false"
        >
          Закрыть
        </v-btn>
      </template>
      </v-snackbar>
  </v-app>
</template>

<script setup lang="ts">
  import Main from '@/components/Main.vue'
  import Category from '@/components/Category.vue'
  import Ingredients from '@/components/Ingredients.vue'
  import Tags from '@/components/Tags.vue'
  import { ref, shallowRef, computed } from 'vue'
  import { useStore } from '@/plugins/store'
  import { MainMutations } from '@/store/main/mutations'
import { MainActions } from './store/main/actions'


  const store = useStore();
  const tab = ref(0)
  const links = ref( [
      {title:   'Основное меню', component: shallowRef(Main)},
      {title:   'Список категорий', component: shallowRef(Category)},
      {title:   'Список ингридиентов', component: shallowRef(Ingredients)},
      {title:   'Список тегов', component: shallowRef(Tags)},
      ],)


  store.dispatch(MainActions.GET_PROPDUCTS)
  store.dispatch(MainActions.GET_TAGS)
  store.dispatch(MainActions.GET_CATEGORIES)

  const error  = computed({
      get: () => store.getters.getError,
      set: () => store.commit(MainMutations.CLEAR_ERROR)
    })
	const errorMsg = computed(() => store.getters.getErrorMsg)

</script>
