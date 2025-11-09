"use client";

import CountUp from "@/components/CountUp";
import React from "react";
import {useState} from "react";

export default function Portfolio() {
    const [currentProjekt, setCurrentProjekt] = useState(null);

    const portfolioItems = [
        {
            title: "Projekt A",
            description: "Beschreibung von Projekt A",
            imageName: "/images/projekt-a.jpg"
        },
        {
            title: "Projekt B",
            description: "Beschreibung von Projekt B",
            imageName: "/images/projekt-b.jpg"
        },
        {
            title: "Projekt C",
            description: "Beschreibung von Projekt C",
            imageName: "/images/projekt-c.jpg"
        }
    ];
    return (


            <div className="flex  items-center justify-between gap-4 h-full px-60 ">
                <div className="flex  items-center justify-center gap-4 h-full">
                    <div>
                    <h1
                        className="text-5xl font-bold mb-6 inline-block after:inline-block
                        after:ml-20 after:w-20 after:h-0.5 after:bg-[#EAEAEA] after:align-middle
                        rounded-4xl "
                    >
                        Portfolio
                    </h1>
                    <div className="mt-10">
                        <div className="flex gap-10 text-6xl font-extralight ">
                            <div>
                               +<CountUp
                                from={10}
                                to={40}
                                separator="."
                                duration={3}
                                className="count-up-text"

                                />

                            </div>

                            <div>
                                +<CountUp
                                to={8}
                                separator="."
                                duration={1}
                                className="count-up-text"

                                />

                            </div>

                        </div>
                        <div className="flex text-6xl font-light gap-[130px] text-[#EAEAEA]/80">
                            <p className="text-center mt-4 text-lg w-7">
                                zufriedene Kunden
                            </p>
                            <p className="text-center mt-4 text-lg">
                                Partner
                            </p>

                        </div>

                    </div>

                </div>



                    <div className="flex flex-col items-end ml-20">
                    {portfolioItems.map((item, index) => (
                        <div className="mb-10 " key={index}>

                            <h2 className="text-5xl font-bold mt-4">{item.title}</h2>

                        </div>
                    ))}

                </div>
                </div>
                <div>

                </div>


            </div>

    );
}