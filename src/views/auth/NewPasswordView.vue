<script setup>
import { inject, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { reset } from '@formkit/core';
import AuthAPI from '@/api/AuthAPI';

const toast = inject('toast');
const route = useRoute();
const router = useRouter();
const { token } = route.params

const loading = ref(true);

const validToken = ref(false)

onMounted(async () => {
    try {
        const { data } = await AuthAPI.verifyPasswordResetToken(token);
        toast.open({
            type: 'success',
            message: data.msg,
        })
        validToken.value = true
    } catch (error) {
        toast.open({
            type: 'error',
            message: error.response.data.msg,
        })
    } finally {
        loading.value = false
    }
})


const handleSubmit = async ({ password }) => {

    try {
        const { data } = await AuthAPI.resetPassword(token, { password });
        toast.open({
            type: 'success',
            message: data.msg,
        })
        reset('newPasswordForm')
        setTimeout(() => {
            router.push({ name: 'login' })
        }, 3000);
    } catch (error) {
        toast.open({
            type: 'error',
            message: error.response.data.msg,
        })
    }
}
</script>
 
<template>
    <div v-if="loading" class="text-center text-white text-2xl font-black"> Cargando...</div>
    <div v-else>
        <div v-if="validToken">
            <h1 class="text-6xl font-extrabold text-white text-center mt-10 ">Restablecer contraseña</h1>
            <p class="text-2xl text-white text-center my-5">Introduce tu nueva contraseña</p>

            <FormKit id="newPasswordForm" @submit="handleSubmit" type="form" :actions="false"
                incomplete-message="No se puedo enviar, revisa los mensajes de error">

                <FormKit type="password" label="Contraseña" name="password" placeholder="Nueva contraseña - Min 8 car"
                    validation="required || length:8" :validation-messages="{
                        length: 'La contraseña debe tener al menos 8 caracteres',
                        required: 'El campo no puede estar vació',
                    }" />

                <FormKit type="submit">Guardar contraseña</FormKit>
            </FormKit>
        </div>
        <div v-else class="text-center text-white text-2xl font-black"> Token no valido</div>
    </div>
</template>