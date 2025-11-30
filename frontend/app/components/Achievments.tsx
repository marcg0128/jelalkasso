import Image from 'next/image';
import VariableProximity from "@/components/VariableProximity";
import React from "react";
import { useRef } from "react";
import CountUp from "@/components/CountUp";

function AchievmentsCards({title, number, icon}: {title: string; number: number; icon: string}) {
    return (
        <div className="flex flex-col items-center bg-[#1C1C1C] h-[65vh] w-[450px] rounded-4xl">
            <div className="flex flex-col items-center mt-36">
                <Image
                    src={"/icons/" + icon + ".svg"}
                    alt={title}
                    width={120}
                    height={120}
                    className="object-contain mb-5 p-5 bg-[#2C2C2C] rounded-full"
                />
                <div className="text-7xl font-light mb-5">
                    + <CountUp
                        to={number}
                        separator="."
                        duration={1}
                        className="count-up-text "

                    />
                    {(title === "Views")  && <span className="text-7xl font-light ml-2">Mio.</span>}


                </div>
                <p className="text-5xl font-light text-center px-10 text-[#FFFFFF]/70">{title}</p>
                <div className="bg-[#2C2C2C]">
                    <button className=" ">
                        <Image
                            src="/icons/plus.svg"
                            alt="Arrow Icon"
                            width={40}
                            height={40}
                            className="object-contain mt-10 transform  hover:scale-105 transition-transform duration-300"

                        />
                    </button>
                </div>

            </div>
        </div>
    );
}

const achievmentsData = [
    {
        title: "Zufriedene Kunden",
        number: 40,
        icon: "daumen-hoch"
    },
    {
        title: "Partner",
        number: 8,
        icon: "handedruck"
    },
    {
        title: "Views",
        number: 10,
        icon: "auge"
    }
];

export default function Achievments() {
    return (
        <div className="px-47 mb-50   ">
            <h1 className="text-5xl font-bold mb-5">Erfolge</h1>
            <div className="mb-8 flex items-end ">
                <Image
                    src="/icons/marker.svg"
                    alt="marker"
                    width={23}
                    height={23}
                    className="object-contain"
                />
                <span className="ml-3 text-[16px] text-[#EAEAEA]/55">
                    im Kreis Minden-Lübbecke
                </span>
            </div>
            <div className="mb-8 flex  gap-20 overflow-x-auto pb-10">
                {achievmentsData.map((achievment, index) => (
                    <div key={index} className="mb-10">
                        <AchievmentsCards
                            title={achievment.title}
                            number={achievment.number}
                            icon={achievment.icon}
                        />
                    </div>
                ))}
            </div>




        </div>
    );
}