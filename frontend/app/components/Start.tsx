"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Start() {
    const [hover, setHover] = useState(false);
    const [scrollX, setScrollX] = useState(0);
    const maxTranslate = 800;

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setScrollX(scrollY * 0.4);
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
        <div className="w-full min-h-screen px-4 sm:px-8 md:px-47 mb-10 md:mb-30">
            <div className="min-h-screen md:flex flex-col items-center justify-center mt-10 relative">

                {/* Top Section - Desktop Layout */}
                <div className="hidden md:flex self-start items-start justify-between w-full">
                    {/* Card */}
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
                            <p className="text-[1.2vw] text-[#EAEAEA]/85 mt-3">
                                Ich erschaffe Bilder & Videos, die Marken bewegen.
                            </p>
                        </div>
                        <div className="absolute bottom-4 right-4">
                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:scale-105 transition-transform duration-300">
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

                    {/* Mission Text */}
                    <div className="self-end ml-10 max-w-xs translate-y-7">
                        <p className="text-3xl text-white">
                            Meine Mission ist es, mit Fotografie und Film Emotionen zu wecken, Geschichten zu erzählen
                            und Erinnerungen zu schaffen, die bleiben.
                        </p>
                    </div>
                </div>

                {/* Mobile Top Section - Mission Text only */}
                <div className="md:hidden w-full mt-[17vh]">
                    <p className="text-xl text-white">
                        Meine Mission ist es, mit Fotografie und Film Emotionen zu wecken, Geschichten zu erzählen
                        und Erinnerungen zu schaffen, die bleiben.
                    </p>
                </div>

                {/* Main Title Section */}
                <div className="md:sticky md:top-32 mb-20 md:mb-60 z-10 mt-16 md:mt-0 hidden md:block">
                    <div className="self-start px-3 md:translate-y-15">
                        <p className="text-lg md:text-[1.8vw] text-[#EAEAEA]/85" style={titleStyle(0.1)}>Fotograf</p>
                        <p className="text-lg md:text-[1.8vw] text-[#EAEAEA]/75" style={titleStyle(0.2)}>Videograf</p>
                        <p className="text-lg md:text-[1.8vw] text-[#EAEAEA]/55" style={titleStyle(0.3)}>Editer</p>
                    </div>

                    <h1
                        className="leading-[1] mt-8 md:mt-17 text-5xl md:text-[11vw] font-bold whitespace-nowrap overflow-hidden"
                        style={{
                            transform: typeof window !== 'undefined' && window.innerWidth >= 768
                                ? `translateX(-${Math.min(scrollX * 2.2, maxTranslate)}px)`
                                : 'none'
                        }}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                    >
                        JELAL&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;KASSO
                    </h1>
                </div>

                {/* Main Image */}
                <div
                    className="md:bottom-0 md:sticky z-40 mt-0 w-full flex justify-center"
                    style={{
                        transform: typeof window !== 'undefined' && window.innerWidth >= 768
                            ? `translateX(-${Math.min(scrollX * 0.8, maxTranslate - 500)}px)`
                            : 'none'
                    }}
                >
                    <Image
                        src="/images/mainImage.png"
                        alt="Jelal Kasso Logo"
                        width={800}
                        height={400}
                        className="grayscale w-full max-w-md md:max-w-none md:w-[800px] h-auto"
                    />
                </div>

                {/* Mobile Instagram Card - Bottom */}
                <div className="md:hidden w-full mt-10 mb-10 bottom-4 z-20 absolute md:relative -translate-y-24 md:translate-0 ">
                    <div className="bg-[#1C1C1C] w-full p-5 h-auto flex gap-2 justify-center
                                    rounded-2xl hover:cursor-pointer hover:scale-105 transition-transform duration-300
                                    cursor-pointer relative"
                        onClick={() => window.open('https://www.instagram.com/jk_fotovideo/', '_blank')}>


                        <div>
                            <p className="text-sm text-[#EAEAEA]/85 mt-3">
                                Ich erschaffe Bilder & Videos, die Marken bewegen.
                            </p>
                            <div className="mt-2">
                                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:scale-105 transition-transform duration-300">
                                    <Image
                                        src="/icons/pfeil-oben-rechts.svg"
                                        alt="Arrow Icon"
                                        width={10}
                                        height={10}
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                        <Image
                            src="/images/start_foto_sub.jpeg"
                            alt="Jelal Kasso Logo"
                            width={150}
                            height={50}
                            className=" rounded-2xl  right-4 top-4"
                        />

                    </div>
                </div>

            </div>
        </div>
    );
}