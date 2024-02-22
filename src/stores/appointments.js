import { ref, computed, onMounted, inject, watch } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import AppointmentAPI from "@/api/AppointmentAPI";
import { convertToISO, convertToDDMMYYYY } from "@/helpers/date";
import { useUserStore } from "@/stores/user";

export const useAppointmentsStore = defineStore("appointments", () => {
  const appointmentID = ref("");
  const services = ref([]);
  const date = ref("");
  const hours = ref([]);
  const time = ref("");
  const appointmentsByDate = ref([]);

  const toast = inject("toast");
  const router = useRouter();
  const user = useUserStore();

  onMounted(() => {
    const startHour = 10;
    const endHour = 19;

    for (let hour = startHour; hour <= endHour; hour++) {
      hours.value.push(hour + ":00");
    }
  });

  watch(date, async () => {
    time.value = "";
    if (date.value === "") return;
    //Obtenemos las citas
    const { data } = await AppointmentAPI.getByDate(date.value);
    console.log(data);

    if (appointmentID.value) {
      appointmentsByDate.value = data.filter(
        (appointment) => appointment._id !== appointmentID.value
      );
      const currentAppointment = data.filter(
        (appointment) => appointment._id === appointmentID.value
      )[0].time;
      time.value = currentAppointment;
    } else {
      appointmentsByDate.value = data;
    }
  });

  function setSelectedAppointment(appointment) {
    console.log(appointment);
    services.value = appointment.services;
    date.value = convertToDDMMYYYY(appointment.date);
    time.value = appointment.time;
    appointmentID.value = appointment._id;
  }

  function onServiceSelected(service) {
    if (
      services.value.some(
        (selectedService) => selectedService._id === service._id
      )
    ) {
      services.value = services.value.filter(
        (selectedService) => selectedService._id !== service._id
      );
    } else {
      if (services.value.length === 2) {
        alert("Solo puedes seleccionar dos servicios");
        return;
      }
      console.log("Servicio añadido");
      services.value.push(service);
    }
  }

  async function saveAppointment() {
    const appointments = {
      services: services.value.map((service) => service._id),
      date: convertToISO(date.value),
      time: time.value,
      totalAmount: totalAmount.value,
    };
    if (appointmentID.value) {
      try {
        const { data } = await AppointmentAPI.update(
          appointmentID.value,
          appointments
        );
        toast.open({
          message: data.msg,
          type: "success",
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const { data } = await AppointmentAPI.create(appointments);
        toast.open({
          message: data.msg,
          type: "success",
        });
      } catch (error) {
        console.log(error);
      }
    }
    router.push({ name: "my-appointments" });
    clearAppointmentData();
    user.getUserAppointments();
  }

  function clearAppointmentData() {
    services.value = [];
    date.value = "";
    time.value = "";
    appointmentID.value = "";
  }
  async function cancelAppointment(id) {
    if (confirm("¿Estás seguro de cancelar la cita?")) {
      try {
        const { data } = await AppointmentAPI.delete(id);
        toast.open({
          message: data.msg,
          type: "success",
        });
        user.userAppointments = user.userAppointments.filter(
          (appointment) => appointment._id !== id
        );
      } catch (error) {
        toast.open({
          message: error.response.data.msg,
          type: "error",
        });
      }
    }
  }

  const isServiceSelected = computed(() => {
    return (id) => services.value.some((service) => service._id === id);
  });

  const noServicesSelected = computed(() => services.value.length === 0);

  const totalAmount = computed(() => {
    return services.value.reduce((total, service) => total + service.price, 0);
  });

  const isValidReservation = computed(() => {
    return services.value.length > 0 && date.value && time.value;
  });

  const isDateSelected = computed(() => (date.value ? true : false));

  const disableTime = computed(() => {
    return (hour) => {
      return appointmentsByDate.value.find(
        (appointment) => appointment.time === hour
      );
    };
  });

  return {
    onServiceSelected,
    saveAppointment,
    setSelectedAppointment,
    clearAppointmentData,
    cancelAppointment,
    isServiceSelected,
    services,
    date,
    hours,
    time,
    isValidReservation,
    totalAmount,
    noServicesSelected,
    isDateSelected,
    disableTime,
  };
});
