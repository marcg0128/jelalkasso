import Image from "next/image";
import React, { useState } from "react";
import CountUp from "@/components/CountUp";

function AchievmentsCards({
    title,
    number,
    icon,
    backgroundImage
}: {
    title: string;
    number: number;
    icon: string;
    backgroundImage?: string;
}) {
    const [cardOpen, setCardOpen] = useState(false);

    return (
        <div
            className="
                relative
                w-full
                h-[160px]
                md:h-[65vh]
                md:w-[450px]
                rounded-4xl
                overflow-hidden
                flex
                md:block
                bg-[#1C1C1C]
            "
        >
            {/* Hintergrundbild */}
            {/*<div*/}
            {/*    className="*/}
            {/*        relative*/}
            {/*        w-[40%]*/}
            {/*        md:absolute*/}
            {/*        md:inset-0*/}
            {/*        flex-shrink-0*/}
            {/*    "*/}
            {/*>*/}
            {/*    <Image*/}
            {/*        src={backgroundImage || "/images/default-background.jpg"}*/}
            {/*        alt={`${title} Background`}*/}
            {/*        fill*/}
            {/*        className="object-cover"*/}
            {/*    />*/}
            {/*</div>*/}

            {/* Content */}
            <div
                className={`
                    flex-1
                    flex
                    flex-col
                    justify-center
                    px-5
                    md:absolute
                    md:inset-0
                    md:bg-[#1C1C1C]
                    md:transition-transform
                    md:duration-700
                    md:ease-in-out
                    ${cardOpen ? "md:-translate-y-full" : "md:translate-y-0"}
                `}
            >
                <div className="flex items-center gap-4 md:flex-col ">
                    <Image
                        src={"/icons/" + icon + ".svg"}
                        alt={title}
                        width={60}
                        height={60}
                        className="
                            object-contain
                            p-3
                            bg-[#2C2C2C]
                            rounded-full
                            md:w-[120px]
                            md:h-[120px]
                        "
                    />

                    <div className="md:text-center">
                        <div className="text-3xl md:text-7xl font-light ">
                            +{" "}
                            <CountUp
                                to={number}
                                separator="."
                                duration={1}
                            />
                            {title === "Views" && (
                                <span className="ml-1">Mio.</span>
                            )}
                        </div>

                        <p className="text-lg md:text-5xl font-light text-[#FFFFFF]/70">
                            {title}
                        </p>
                    </div>
                </div>
            </div>

            {/* Header bei geöffnet (nur Desktop) */}
            <div
                className={`
                    hidden
                    md:flex
                    absolute
                    top-0
                    left-0
                    right-0
                    z-20
                    items-center
                    gap-4
                    p-8
                    transition-all
                    duration-700
                    ${cardOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"}
                `}
            >
                <Image
                    src={"/icons/" + icon + ".svg"}
                    alt={title}
                    width={50}
                    height={50}
                    className="
                        object-contain
                        p-2
                        bg-[#2C2C2C]/80
                        backdrop-blur-sm
                        rounded-full
                    "
                />
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-light">+{number}</span>
                    {title === "Views" && (
                        <span className="text-2xl font-light">Mio.</span>
                    )}
                    <span className="text-2xl font-light text-[#FFFFFF]/80 ml-2">
                        {title}
                    </span>
                </div>
            </div>

            {/* Plus Button – nur Desktop */}
            <div className="hidden md:block absolute bottom-8 right-10 z-30 bg-[#2C2C2C] rounded-full ">
                <button
                    className="p-2 hover:scale-105 transition-transform duration-300 cursor-pointer"
                    onClick={() => setCardOpen(!cardOpen)}
                >
                    <Image
                        src="/icons/plus.svg"
                        alt="Toggle Icon"
                        width={35}
                        height={35}
                        className={`transition-transform duration-300 ${
                            cardOpen ? "rotate-45" : ""
                        }`}
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
        <div className="px-4 md:px-47 mb-50">
            <h1 className="text-4xl md:text-5xl font-bold mb-5">
                Erfolge
            </h1>

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

            <div className="mb-8 flex flex-col md:flex-row gap-6 md:gap-20">
                {achievmentsData.map((achievment, index) => (
                    <AchievmentsCards
                        key={index}
                        title={achievment.title}
                        number={achievment.number}
                        icon={achievment.icon}
                        backgroundImage={achievment.backgroundImage}
                    />
                ))}
            </div>
        </div>
    );
}
