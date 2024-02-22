<script setup>
//Importar inject de vue
import { inject } from 'vue';
import { reset } from '@formkit/core';
import AuthAPI from '@/api/AuthAPI';

const toast = inject('toast');

const handleSubmit = async ({ email }) => {
    try {
        const { data } = await AuthAPI.forgotPassword({ email });
        toast.open({
            type: 'success',
            message: data.msg,
        })
        reset('forgotPasswordForm');
    } catch (error) {
        toast.open({
            type: 'error',
            message: error.response.data.msg,
        })
    }

}

</script>
 
<template>
    <h1 class="text-6xl font-extrabold text-white text-center mt-10 ">Olvide mi contraseña</h1>
    <p class="text-2xl text-white text-center my-5">Recuperar acceso a tu cuenta</p>

    <FormKit id="forgotPasswordForm" @submit="handleSubmit" type="form" :actions="false"
        incomplete-message="No se puedo enviar, revisa los mensajes de error">

        <FormKit type="text" label="Email" name="email" placeholder="Email de Usuario" validation="required || email "
            :validation-messages="{
                required: 'El email es obligatorio',
                email: 'El email No es valido',
            }" />

        <FormKit type="submit">Enviar Instrucciones</FormKit>
    </FormKit>
</template>