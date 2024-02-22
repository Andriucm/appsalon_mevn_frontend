<script setup>
import { inject } from 'vue'
import { useRouter } from "vue-router";
import AuthAPI from '../../api/AuthAPI';

const router = useRouter()
const toast = inject('toast')

const handleSubmit = async (formData) => {
    try {
        const { data: {token} } = await AuthAPI.login(formData)
        localStorage.setItem('AUTH_TOKEN', token)
        router.push({name: 'my-appointments'})

    } catch (error) {
        toast.open({
            message: error.response.data.msg,
            type: 'error'
        })
    }
}
</script>
 
<template>
    <h1 class="text-6xl font-extrabold text-white text-center mt-10 ">Inicia Sesión</h1>
    <p class="text-2xl text-white text-center my-5">Inserta tu cuenta de AppSalón</p>

    <FormKit id="loginForm" @submit="handleSubmit" type="form" :actions="false"
        incomplete-message="No se puedo enviar, revisa los mensajes de error">

        <FormKit type="text" label="Email" name="email" placeholder="Email de Usuario" validation="required || email "
            :validation-messages="{
                required: 'El email es obligatorio',
                email: 'El email No es valido',
            }" />
        <FormKit type="password" label="Contraseña" name="password" placeholder="Contraseña de Usuario "
            validation="required " :validation-messages="{
                required: 'La contraseña es obligatorio',
            }" />

        <FormKit type="submit">
            Iniciar sesión
        </FormKit>
    </FormKit>
</template>