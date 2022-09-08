<template>
    <div>
        <h1>Login</h1>
   </div>
   <form action="" @submit.prevent="handleLogin"  >
        <input v-model.trim="email" type="email" placeholder="user">
        <input v-model.trim="password" type="password" placeholder="pass">
        <button type="submit" :disabled="userStore.loadingUser"> Ingresar </button>
   </form>
</template>

<script setup>

import { ref } from 'vue';
import { useUserStore } from "../stores/user";
// import { useRouter } from 'vue-router';
    
    const userStore = useUserStore()
    // const route = useRouter() 

    const email = ref('adgalvisv@gmail.com')
    const password = ref('')

    const handleLogin = async() => {
        if (!email.value | password.value.length < 6) {
            return alert('Completa los datos')
        }
        await userStore.loginUser(email.value, password.value)
        // route.push('/')
    }

</script>

