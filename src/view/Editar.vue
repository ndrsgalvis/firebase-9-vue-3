<template>
    <div>
        <h1> Editar  </h1>
        <p v-if="databaseStore.loadingDoc"> Loading doc... </p>
        <form @submit.prevent="handleSubmit" v-else>
            <input type="text" placeholder="Url" v-model.trimp="url">
            <button type="submit" :disabled="databaseStore.loadingDoc">
                Actualizar
            </button>

        </form>
    </div>
</template>

<script setup>

import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useDatabaseStore } from "../stores/database";

const route = useRoute()
const databaseStore = useDatabaseStore()
const url = ref("")

onMounted(async() => {
    url.value = await databaseStore.readUrl(route.params.id)
})

const handleSubmit = async () => {
    await databaseStore.updateUrl(route.params.id, url.value)
}


</script>

