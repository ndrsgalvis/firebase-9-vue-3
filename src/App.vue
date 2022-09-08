
<template>
  <div v-if="!userStore.loadingSession">
    <h1 > App </h1>
    <nav> 
      <router-link to="/" v-if="userStore.userData"> Home</router-link>
      <router-link to="/register" v-if="!userStore.userData"> Register</router-link>
      <router-link to="/login" v-if="!userStore.userData"> Login</router-link>
      <button @click="userStore.logoutUser" v-if="userStore.userData"> Logout</button>
    </nav>

    <router-view></router-view>
</div>
<h1 v-else>Loading user...</h1>
</template>

<script setup>

import { useUserStore } from "./stores/user";

  const userStore = useUserStore()

</script>