import Image from "next/image";
import { MdLocalPhone, MdOutlineEmail } from "react-icons/md";

export const ContactMe = () => {
  return (
    <div className="  flex flex-col lg:pr-20">
      <h1 className=" font-vollkorn text-6xl md:mx-auto">Contactame</h1>
      <h2 className=" mt-4 text-2xl font-semibold">Trabajemos juntos</h2>
      <p className=" mt-4 mb-9">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam qui
        repudiandae sunt eos ab odio quasi aperiam, accusantium laborum. Sed
        praesentium neque totam sit hic, doloremque in architecto laborum quia.
      </p>
      <div className="flex ">
        <MdOutlineEmail size="25" />
        <h4 className="ml-2 font-workSans text-xl font-semibold">
          losjuanes8@hotmail.com
        </h4>
      </div>
      <div className="flex mt-2">
        <MdLocalPhone size="25" />
        <h4 className="ml-2  text-xl font-semibold">+57 3164156157</h4>
      </div>

      <Image src="/icons/phone_v4.svg" alt={""} width={500} height={500} />
    </div>
  );
};
