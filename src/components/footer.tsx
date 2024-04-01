export const Footer = () => {
  return (
    <footer
      className={` flex-col  font-vollkorn mt-auto flex w-full justify-center text-xs  pb-8`}
    >
      <div className="flex justify-center">
        <span className={`antialiased  font-bold`}>
          Juan Carlos Echeverri F.{" "}
        </span>
        <span> | Avalúos</span>
        <span> © {new Date().getFullYear()}</span>
      </div>

      <div className="flex  justify-center ml-2">
        <span>Ubicación: Medellín, Colombia</span>
      </div>
    </footer>
  );
};
