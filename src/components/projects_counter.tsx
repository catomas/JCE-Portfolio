"use client";

import { dataCounter } from "@/lib/data";
import CountUp from "react-countup";

export const ProjectsCounter = () => {
  return (
    <div className="  grid justify-between grid-cols-2 gap-3 md:flex md:grid-cols-4 md:gap-6">
      {dataCounter.map(
        ({ id, endCounter, text, lineRight, lineRightMobile }) => (
          <div key={id} className={`${lineRight && "ltr"}`}>
            <div
              className={` px-4 border-2 border-transparent ${
                lineRight && " md:border-e-secondary100 "
              } ${lineRightMobile && " border-e-secondary100"}`}
            >
              <p className="flex mb-2 text-2xl font-extrabold md:text-4xl text-primary400">
                +{" "}
                <CountUp
                  className="font-workSans"
                  end={endCounter}
                  start={0}
                  duration={5}
                />
              </p>
              <p className=" font-vollkorn text-xs uppercase max-w-[100px]">
                {text}
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
};
