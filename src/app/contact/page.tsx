import { ContactForm } from "@/components/contact_form";
import { ContactMe } from "../../components/contact_me";
const ContactPage = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full ">
      <div className="  lg:w-1/2">
        <ContactMe />
      </div>
      <div className="lg:w-1/2">
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactPage;
