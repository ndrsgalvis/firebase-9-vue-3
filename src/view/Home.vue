<!-- 
    OF - recorremos arrays
    IN - recorremos objetos 
 -->
<template>
    <div>
        <h1>Home</h1>
        <p>{{userStore.userData?.email}}</p>

        <form @submit.prevent="handleSubmit">
            <input type="text" placeholder="Ingrese URL" v-model="url">
            <button type="submit">Enviar</button>
        </form>

        <p v-if="databaseStore.loadingDoc" >Loading store</p>
        <ul v-else>
            <li v-for="item of databaseStore.documents" :key="item.id">
                {{ item.id }} - {{ item.name }}
                <br>
                {{ item.short }}
                <br>
                <button @click="databaseStore.deleteUrl(item.id)">Delete url</button>
                <button @click="router.push(`/editar/${item.id}`)">Edit url</button>
            </li>
        </ul>
    </div>
</template>

<script setup>
    // los .value solo se utilizan en composition api (setup)
    import { onBeforeMount, ref } from "vue";
    import { useRouter } from "vue-router";
    import { useUserStore } from "../stores/user";
    import { useDatabaseStore } from "../stores/database";
    
    const userStore = useUserStore()
    const databaseStore = useDatabaseStore()
    const router = useRouter()

    const url = ref('')
    const handleSubmit = async () =>{
        await databaseStore.addUrl(url.value)
    }

    onBeforeMount(async () => {
       await databaseStore.getUrls()
    })

</script>
