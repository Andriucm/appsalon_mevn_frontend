<script setup>
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';

const user = useUserStore()
const route = useRoute();
</script>
 
<template>
    <div class="flex justify-between">
        <h1 class="text-2xl lg:text-6xl font-black text-white">App Salón</h1>

        <div class="flex flex-col space-y-5">
            <div class="flex gap-2 items-center justify-end">
                <p class="text-white text-right"> Hola: {{ user.getUserName }}</p>
                <button @click="user.logout()" type="button"
                    class="bg-red-600 hover:bg-red-700 p-2 text-white uppercase text-xs font-extrabold rounded-lg">Cerrar
                    Sesión</button>
            </div>
            <nav class="flex gap-2 items-center justify-end">
                <RouterLink :to="{ name: 'my-appointments' }"
                    class="p-3 text-gray-200 uppercase text-sx font-black rounded-lg"
                    :class="route.name === 'my-appointments' ? 'bg-blue-700' : 'bg-transparent'">Mis Citas</RouterLink>
                <RouterLink :to="{ name: 'new-appointment' }"
                    class="p-3 text-gray-200 uppercase text-sx font-black rounded-lg bg-blue-700 "
                    :class="route.name === 'new-appointment' ? 'bg-blue-700' : 'bg-transparent'"> Nueva Cita</RouterLink>
            </nav>
        </div>
    </div>
    <main>
        <RouterView />
    </main>
</template>
