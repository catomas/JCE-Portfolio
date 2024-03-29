import { BsSun } from "react-icons/bs";

const ThemeSwitch = () => {
  return (
    <button className="  bg-white w-[3rem] h-[3rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all ">
      <BsSun />
    </button>
  );
};

export default ThemeSwitch;
