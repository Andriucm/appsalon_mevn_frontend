<script setup>
import { useUserStore } from "../../stores/user";
import Loader from "@/components/Loader.vue";
import Appointment from "@/components/Appointment.vue";

const user = useUserStore();
</script>
 
<template>
    <h1 class="text-4xl font-extrabold text-white mt-10 ">Mis Citas</h1>
    <p class="text-lg text-white mt-5">Administrar próximas citas</p>

    <Loader v-if="user.loading" />
    <div v-else>
        <p v-if="user.noAppointments" class="text-white text-2xl text-center mt-5">No tines citas pendientes</p>
        <div v-else class="grid grid-cols-1 gap-5 mt-10">
            <Appointment v-for="appointment in user.userAppointments" :key="appointment._id" :appointment="appointment" />
        </div>
    </div>
</template>