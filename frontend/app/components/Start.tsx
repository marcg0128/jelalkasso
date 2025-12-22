
"use client";
import Image from "next/image";

import { useEffect, useState } from "react";


export default function Start() {
    const [hover, setHover] = useState(false);

    const [scrollX, setScrollX] = useState(0);

    const maxTranslate =800;

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setScrollX(scrollY * 0.4); // Geschwindigkeit (0.4 = moderat)
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    const titleStyle = (delay: number) => ({
        opacity: hover ? 1 : 0,
        transform: hover ? "translateY(0px)" : "translateY(20px)",
        transition: `all 0.4s ease ${delay}s`
    });
    return (
        <div className="w-full h-screen px-47 mb-30">
            {/*aligns perfect with the title "Jelal Kasso"*/}

            <div className="min-h-screen md:flex flex-col  items-center justify-center mt-10 relative">

                <div className="self-start flex items-start justify-between w-full">
                    <div className="bg-[#1C1C1C] max-w-80 p-5 h-auto mt-10 flex flex-col items-center justify-center
                                    rounded-4xl translate-y-13 hover:cursor-pointer hover:scale-105 transition-transform duration-300
                                    cursor-pointer relative"
                        onClick={() => window.open('https://www.instagram.com/jk_fotovideo/', '_blank')}>
                        <Image
                            src="/images/start_foto_sub.jpeg"
                            alt="Jelal Kasso Logo"
                            width={300}
                            height={150}
                            className="object-contain rounded-2xl"
                        />

                        <div>
                            <p className="text-[1.2vw] text-[#EAEAEA]/85  mt-3">Ich erschaffe Bilder & Videos, die Marken bewegen.  </p>
                        </div>
                        <div className="absolute bottom-4 right-4">
                            <div className="w-12 h-12 rounded-full bg-white/10  flex items-center justify-center hover:scale-105 transition-transform duration-300">
                                <Image
                                    src="/icons/pfeil-oben-rechts.svg"
                                    alt="Arrow Icon"
                                    width={20}
                                    height={20}
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="self-end ml-10 max-w-xs translate-y-7">
                        <p className="text-3xl  text-white">
                            Meine Mission ist es, mit Fotografie und Film Emotionen zu wecken, Geschichten zu erzählen
                            und Erinnerungen zu schaffen, die bleiben.
                        </p>
                    </div>
                </div>



                 <div className="sticky top-32 mb-60  z-10 ">
                    <div className="self-start px-3 translate-y-15">
                        <p className="text-[1.8vw] text-[#EAEAEA]/85" style={titleStyle(0.1)}>Fotograf</p>
                        <p className="text-[1.8vw] text-[#EAEAEA]/75" style={titleStyle(0.2)}>Videograf</p>
                        <p className="text-[1.8vw] text-[#EAEAEA]/55" style={titleStyle(0.3)}>Editer</p>
                    </div>

                    <h1
                        className="leading-[1] mt-17"
                        style={{
                            fontSize: "11vw",
                            fontWeight: "bold",
                            transform: `translateX(-${Math.min(scrollX * 2.2, maxTranslate)}px)`
                        }}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                    >
                        JELAL&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;KASSO
                    </h1>
                </div>

                <div
                    className=" bottom-0 sticky z-50"
                    style={{
                        transform: `translateX(-${Math.min(scrollX * 0.8, maxTranslate-500)}px)`
                    }}
                >
                    <Image
                        src="/images/mainImage.png"
                        alt="Jelal Kasso Logo"
                        width={800}
                        height={400}
                        className="grayscale "
                    />
                </div>


            </div>

        </div>

    );
}