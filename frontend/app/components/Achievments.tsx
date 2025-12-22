import Image from 'next/image';
import React from "react";
import { useState } from "react";
import CountUp from "@/components/CountUp";

function AchievmentsCards({title, number, icon, backgroundImage}: {title: string; number: number; icon: string; backgroundImage?: string}) {
    const [cardOpen, setCardOpen] = useState(false);

    return (
        <div className="relative h-[65vh] w-[450px] overflow-hidden rounded-4xl">
            {/* Hintergrundbild - immer sichtbar, füllt kompletten Container */}
            <div className="absolute inset-0 -m-1">
                <Image
                    src={backgroundImage || "/images/default-background.jpg"}
                    alt={`${title} Background`}
                    fill
                    className="object-cover scale-105"
                />
            </div>

            {/* Vorderseite Card - schiebt sich nach oben */}
            <div className={`absolute inset-0 bg-[#1C1C1C] transition-transform duration-700 ease-in-out ${cardOpen ? '-translate-y-full' : 'translate-y-0'}`}>
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
                            className="count-up-text"
                        />
                        {(title === "Views") && <span className="text-7xl font-light ml-2">Mio.</span>}
                    </div>
                    <p className="text-5xl font-light text-center px-10 text-[#FFFFFF]/70">{title}</p>
                </div>
            </div>

            {/* Header wenn geöffnet - erscheint oben */}
            <div className={`absolute top-0 left-0 right-0 z-20 flex items-center gap-4 p-8 transition-all duration-700 ${cardOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}>
                <Image
                    src={"/icons/" + icon + ".svg"}
                    alt={title}
                    width={50}
                    height={50}
                    className="object-contain p-2 bg-[#2C2C2C]/80 backdrop-blur-sm rounded-full"
                />
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-light">+{number}</span>
                    {(title === "Views") && <span className="text-2xl font-light">Mio.</span>}
                    <span className="text-2xl font-light text-[#FFFFFF]/80 ml-2">{title}</span>
                </div>
            </div>

            {/* Plus Button - bleibt immer sichtbar */}
            <div className="absolute bottom-8 right-10 z-30 bg-[#2C2C2C] rounded-full">
                <button
                    className="p-2 hover:scale-105 transition-transform duration-300 cursor-pointer"
                    onClick={() => setCardOpen(!cardOpen)}
                >
                    <Image
                        src="/icons/plus.svg"
                        alt="Toggle Icon"
                        width={35}
                        height={35}
                        className={`object-contain transform transition-transform duration-300 ${cardOpen ? 'rotate-45' : 'rotate-0'}`}
                    />
                </button>
            </div>
        </div>
    );
}

const achievmentsData = [
    {
        title: "Zufriedene Kunden",
        number: 40,
        icon: "daumen-hoch",
        backgroundImage: "/images/achievments/customers-bg.jpg"
    },
    {
        title: "Partner",
        number: 8,
        icon: "handedruck",
        backgroundImage: "/images/achievments/partners-bg.jpg"
    },
    {
        title: "Views",
        number: 10,
        icon: "auge",
        backgroundImage: "/images/achievments/views-bg.png"
    }
];

export default function Achievments() {
    return (
        <div className="px-47 mb-50">
            <h1 className="text-5xl font-bold mb-5">Erfolge</h1>
            <div className="mb-8 flex items-end">
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
            <div className="mb-8 flex gap-20 overflow-x-auto pb-10">
                {achievmentsData.map((achievment, index) => (
                    <div key={index} className="mb-10">
                        <AchievmentsCards
                            title={achievment.title}
                            number={achievment.number}
                            icon={achievment.icon}
                            backgroundImage={achievment.backgroundImage}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}