<script setup>
import { inject } from "vue";
import { reset}  from '@formkit/vue';
import AuthApi from '../../api/AuthAPI';

const toast = inject('toast');



const handleSubmit = async ({ password_confirm, ...formData }) => {

    try {
        const { data } = await AuthApi.register(formData);

        toast.open({
            message: data.msg,
            type: 'success'
        })

        reset('registerForm');
        
    } catch (error) {
        console.log(error);
        toast.open({
            message: error.response.data.msg,
            type: 'error'
        })
       
    }
}
</script>
 
<template>
    <h1 class="text-6xl font-extrabold text-white text-center mt-10 ">Crea una cuenta</h1>
    <p class="text-2xl text-white text-center my-5">Crea una cuenta en AppSalón</p>

    <FormKit id="registerForm" @submit="handleSubmit" type="form" :actions="false"
        incomplete-message="No se puedo enviar, revisa los mensajes de error">
        <FormKit type="text" label="Nombre" name="name" placeholder="Tu nombre" validation="required || length:3 "
            :validation-messages="{
                required: 'El nombre es obligatorio',
                length: 'El nombre debe tener al menos 3 caracteres',
            }" />
        <FormKit type="text" label="Email" name="email" placeholder="Tu email de registro" validation="required || email "
            :validation-messages="{
                required: 'El email es obligatorio',
                email: 'El email No es valido',
            }" />
        <FormKit type="password" label="Contraseña" name="password"
            placeholder="Tu contraseña de registro - Min 8 caracteres" validation="required || length:8 "
            :validation-messages="{
                required: 'La contraseña es obligatorio',
                length: 'La contraseña debe tener al menos 8 caracteres',
            }" />

        <FormKit type="password" label="Repetir contraseña" name="password_confirm" placeholder="Repite tu contraseña "
            validation="required || confirm " :validation-messages="{
                required: 'La contraseña es obligatorio',
                confirm: 'La contraseña no coincide',
            }" />

        <FormKit type="submit">
            Crear cuenta
        </FormKit>
    </FormKit>
</template>