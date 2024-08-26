import AppointmentForm from "@/components/AppointmentForm";
import Hero from "@/components/Hero";

const Appointment = () => {
  return (
    <>
      <Hero
        title={"Schedule Your appointment | Trauma Care Institute"}
        imageUrl={"/signin.png"}
      />
      <AppointmentForm />
    </>
  );
};

export default Appointment;
