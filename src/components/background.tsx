const Background = () => {
  return (
    <div className="fixed z-o inset-0 isolate h-screen w-screen overflow-hidden ">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 o-z-10 transform-gpu overflow-hidden blur-3xl -top-20   sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative  aspect-[1155/678] w-[38.125rem] -translate-x-1/2 rotate-[80deg]  bg-primary opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />

        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative bottom-20 max-h-screen  aspect-[1155/678] w-[36.125rem] rotate-[20deg] bg-primary opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>
    </div>
  );
};

export default Background;
