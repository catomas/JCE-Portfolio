import Nav from "./navbar";
import ThemeSwitch from "./theme-switch";

const Header = () => {
  return (
    <>
      <header className="z-[999] font-vollkorn relative w-full ">
        <Nav />
        <ThemeSwitch />
      </header>
    </>
  );
};

export default Header;
