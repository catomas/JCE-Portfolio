"use client";

import { experiencesData } from "@/lib/data_experience";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";

export default function Experience() {
  return (
    <VerticalTimeline lineColor="#e5e7eb">
      {experiencesData.map((item, index) => (
        <VerticalTimelineElement
          key={index}
          visible={true}
          contentStyle={{
            background: "#f3f4f6",
            boxShadow: "none",
            border:
              item.category === "Certificación"
                ? "3px solid rgba(117, 131, 73, 0.3)"
                : "1px solid rgba(152, 50, 50, 0.05)",
            textAlign: "left",
            padding: "1.3rem 2rem",
          }}
          date={item.date}
          icon={item.icon}
          iconStyle={{
            background: item.category === "Certificación" ? "#c2d979" : "white",
            fontSize: "1.5rem",
          }}
          contentArrowStyle={{
            borderRight: "0.4rem solid #9ca3af",
          }}
        >
          <div className="flex justify-between ">
            <h3 className="font-semibold  md:text-lg  lg:text-xl ">
              {item.title}
            </h3>
            <div className="hidden sm:block  ml-3 mb-3">
              {item.category === "Educación" && (
                <span className=" h-8 text-xs text-white bg-primary p-2   rounded-xl">
                  {item.category}
                </span>
              )}

              {item.category === "Trabajo" && (
                <span className=" h-8 text-xs text-white  bg-[#dba913] p-2 rounded-xl">
                  {item.category}
                </span>
              )}

              {item.category === "Certificación" && (
                <span className=" h-8 text-xs text-gray-700 bg-primary100 p-2 rounded-xl">
                  {item.category}
                </span>
              )}
            </div>
          </div>
          <p className="!font-normal !my-2 whitespace-pre-line">
            {item.location}
          </p>
          <p className="!mt-1 !font-normal text-gray-700 italic ">
            &quot;{item.description}&quot;
          </p>

          <div className=" sm:hidden absolute bottom-4 right-2 my-2">
            {item.category === "Educación" && (
              <span className=" h-8 text-xs text-white bg-primary p-2   rounded-xl">
                {item.category}
              </span>
            )}

            {item.category === "Trabajo" && (
              <span className=" h-8 text-xs text-white  bg-[#dba913] p-2 rounded-xl">
                {item.category}
              </span>
            )}

            {item.category === "Certificación" && (
              <span className=" h-8 text-xs text-gray-700 bg-primary100 p-2 rounded-xl">
                {item.category}
              </span>
            )}
          </div>
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  );
}
