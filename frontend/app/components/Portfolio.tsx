"use client";

import CountUp from "@/components/CountUp";
import React from "react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const portfolioItems = [
        { title: "Projekt A", description: "Beschreibung A", imageName: "/images/projects/1.png", detailedText1: "Die Mathias Fahrschule bietet moderne Ausbildung, klare Anleitung und ein entspanntes Lernumfeld – für einen sicheren Weg zum Führerschein." },
        { title: "Projekt B", description: "Beschreibung B", imageName: "/images/projects/2.png" },
        { title: "Projekt C", description: "Beschreibung C", imageName: "/images/projects/3.png" },
        { title: "Projekt D", description: "Beschreibung D", imageName: "/images/projects/4.png" },
        { title: "Projekt E", description: "Beschreibung E", imageName: "/images/projects/5.png" },
        { title: "Projekt F", description: "Beschreibung F", imageName: "/images/projects/6.png" }
    ];

function VideoCard({redirectUrl, media }: { redirectUrl?: string,  media?: string }) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (!videoRef.current) return;

        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const redirectTo = () => {
        if (redirectUrl) {
            window.open(redirectUrl, '_blank');
        }
    };

    return (
        <div className={`relative rounded-4xl shadow-md overflow-hidden h-[40vh] w-[190%] ${
            redirectUrl ? 'hover:cursor-pointer' : ''
        }`}
            onClick={() => redirectTo()}
        >

            {media && (media.endsWith('.mp4') || media.endsWith('.MOV'))  && (
                <>
                    <video
                        ref={videoRef}
                        className="absolute inset-0 w-full h-full object-cover"
                        controls={false}
                        playsInline
                        onEnded={() => setIsPlaying(false)}
                    >
                        <source src={media} type="video/mp4" />
                    </video>

                    {/* Custom Play/Pause Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();   // verhindert Redirect
                            togglePlay();
                        }}
                        className="absolute bottom-3 right-0 z-50 -translate-x-1/2 bg-black/50 px-6 py-3 rounded-full backdrop-blur-md hover:bg-black/70 transition-colors hover:cursor-pointer"
                    >
                        {!isPlaying && (
                            <Image src="/icons/spielen.svg" alt="Play" width={20} height={20} />
                        )}
                        {isPlaying && (
                            <Image src="/icons/pause.svg" alt="Pause" width={20} height={20} />
                        )}
                    </button>
                </>
            )}


            {/*shadow gradient*/}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/70 to-transparent z-40"></div>

        </div>
    );
}

export default function Portfolio() {
    const [currentProjekt, setCurrentProjekt] = useState<string | null>(null);
    const [moreDetailsProjekt, setMoreDetailsProject] = useState<string | null>(null);

    const portfolioContainerRef = useRef<HTMLDivElement | null>(null);
    const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
    const isAutoScrollingRef = useRef(false);
    const debounceTimeoutRef = useRef<number | null>(null);
    const autoScrollEndTimeoutRef = useRef<number | null>(null);

    function scrollToProject(index: number) {
        if (moreDetailsProjekt) return;
        const el = itemRefs.current[index];
        const title = document.getElementById("portfolio-title");
        if (!el || !title) return;

        // Linie berechnen
        const rect = title.getBoundingClientRect();
        const afterStyles = window.getComputedStyle(title, "::after");
        const afterHeight = parseFloat(afterStyles.height) || 0;
        const afterMarginTop = parseFloat(afterStyles.marginTop) || 0;
        const lineY = rect.top + afterMarginTop + afterHeight / 2;

        // Element-Mitte
        const r2 = el.getBoundingClientRect();
        const elementCenterY = r2.top + r2.height / 2;

        // Gleicher Offset wie beim Auto-Scroll
        const TARGET_OFFSET = -15;
        const offset = elementCenterY + TARGET_OFFSET - lineY;

        // Auto-Scrolling sperren
        isAutoScrollingRef.current = true;

        window.scrollBy({ top: offset, behavior: "smooth" });

        // Nach dem Scroll wieder freigeben
        window.setTimeout(() => {
            isAutoScrollingRef.current = false;
        }, 500);

        // Aktiv setzen
        setCurrentProjekt(portfolioItems[index].title);
    }

    function openLearnMore(projectTitle: string) {
        if (moreDetailsProjekt) {
            setMoreDetailsProject(null);
            return;
        }
        setMoreDetailsProject(projectTitle);
    }

    useEffect(() => {
        function cleanupTimeout(ref: React.MutableRefObject<number | null>) {
            if (ref.current !== null) {
                window.clearTimeout(ref.current);
                ref.current = null;
            }
        }

        function isInPortfolioSection(): boolean {
            if (!portfolioContainerRef.current) return false;

            const rect = portfolioContainerRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Prüfe ob der Portfolio-Bereich im Viewport ist
            // Du kannst die Schwellenwerte nach Bedarf anpassen
            const isVisible = rect.top < viewportHeight && rect.bottom > 0;

            return isVisible;
        }

        function handleScroll() {
            // Wenn wir außerhalb des Portfolio-Bereichs sind, nicht reagieren
            if (moreDetailsProjekt != null) return;

            if (!isInPortfolioSection()) {
                return;
            }

            // Wenn wir gerade programmgesteuert scrollen, ignorieren
            if (isAutoScrollingRef.current) return;

            const title = document.getElementById("portfolio-title");
            if (!title) return;

            const rect = title.getBoundingClientRect();
            const afterStyles = window.getComputedStyle(title, "::after");

            const afterHeight = parseFloat(afterStyles.height) || 0;
            const afterMarginTop = parseFloat(afterStyles.marginTop) || 0;

            // Y-Position der Linie (viewport-Koordinaten)
            const lineY = rect.top + afterMarginTop + afterHeight / 2;

            let closestIndex = 0;
            let closestDistance = Infinity;

            itemRefs.current.forEach((el, index) => {
                if (!el) return;
                const r = el.getBoundingClientRect();
                const elementY = r.top + r.height / 2;
                const distance = Math.abs(lineY - elementY);
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = index;
                }
            });

            const selected = portfolioItems[closestIndex];
            setCurrentProjekt(selected.title);

            // Auto-Zentrierung nur starten, wenn nötig
            const el = itemRefs.current[closestIndex];
            if (!el) return;

            const r2 = el.getBoundingClientRect();
            const elementCenterY = r2.top + r2.height / 2;
            const TARGET_OFFSET = -20;
            const offset = elementCenterY + TARGET_OFFSET - lineY;

            const MIN_OFFSET = 20;
            const DEBOUNCE_MS = 1000;
            const AUTO_SCROLL_END_MS = 500;

            if (Math.abs(offset) > MIN_OFFSET) {
                cleanupTimeout(debounceTimeoutRef);
                debounceTimeoutRef.current = window.setTimeout(() => {
                    isAutoScrollingRef.current = true;
                    window.scrollBy({ top: offset, behavior: "smooth" });

                    cleanupTimeout(autoScrollEndTimeoutRef);
                    autoScrollEndTimeoutRef.current = window.setTimeout(() => {
                        isAutoScrollingRef.current = false;
                        autoScrollEndTimeoutRef.current = null;
                    }, AUTO_SCROLL_END_MS);

                    debounceTimeoutRef.current = null;
                }, DEBOUNCE_MS);
            }
        }

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            cleanupTimeout(debounceTimeoutRef);
            cleanupTimeout(autoScrollEndTimeoutRef);
        };
    }, [moreDetailsProjekt]);

    useEffect(() => {
        if (moreDetailsProjekt) {
            // Scrollen blockieren
            document.body.style.overflow = 'hidden';
        } else {
            // Scrollen wieder erlauben
            document.body.style.overflow = 'unset';
        }

        // Cleanup beim Unmount
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [moreDetailsProjekt]);

    return (
        <div
            ref={portfolioContainerRef}
            className="flex items-start justify-between gap-4 h-[83vh] mt-70 mb-300"
        >
            <div className="flex items-start justify-center gap-4 h-[97vh] ml-47 mt-60">
                <div className={`sticky top-50 transition-all duration-700 ease-in-out ${
                    moreDetailsProjekt ? '-translate-x-[200%] opacity-0' : 'translate-x-0 opacity-100'
                }`}>
                    <h1
                        id="portfolio-title"
                        className="text-5xl font-bold mb-50 inline-block after:inline-block
                        after:ml-20 after:w-20 after:h-0.5 after:bg-[#EAEAEA] after:align-middle
                        rounded-4xl "
                    >
                        Portfolio
                    </h1>
                </div>

                <div className="flex flex-col items-start justify-start ml-10 mr-10">
                    {portfolioItems.map((item, index) => (
                        <div
                            className={`mb-15 cursor-pointer transition-all duration-700 ease-in-out ${
                                moreDetailsProjekt 
                                    ? currentProjekt === item.title
                                        ? '-translate-x-[200%] -translate-y-[5%]'
                                        : 'translate-x-[200%] opacity-0'
                                    : ''
                            }`}
                            key={index}
                            onClick={() => scrollToProject(index)}
                            ref={(el) => { itemRefs.current[index] = el; }}
                            data-index={index}
                        >
                            <h2
                                className={`text-5xl font-bold mt-4 ${
                                    currentProjekt === item.title
                                        ? "text-[#EAEAEA]\""
                                        : "text-[#888888]"
                                }`}
                            >
                                {item.title}
                            </h2>
                            <div className={`flex justify-around w-[300%] min-h-[70vh] max-h-[80vh] p-10  rounded-4xl  overflow-y-auto ${
                                moreDetailsProjekt
                                    ? currentProjekt === item.title
                                        ? ''
                                        : 'hidden'
                                    : 'hidden'
                            }`}>
                                <div className="flex flex-col justify-center items-center">

                                    <p className="w-[100px] break-all mb-10 ">
                                        Eine moderne Fahrschule mit erfahrenen Lehrern, persönlicher Betreuung und einer angenehmen Lernatmosphäre – für einen sicheren und entspannten Weg zum Führerschein.
                                    </p>

                                    <VideoCard
                                        media="/images/reviews/Kilian Fürstle.MOV"


                                    />

                                </div>
                                <div className="flex flex-col items-center justify-center ">

                                    <VideoCard
                                        media="/images/reviews/Kilian Fürstle.MOV"


                                    />

                                    <p className="w-[100px] break-all mb-10 text-center">
                                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                                    </p>


                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex-1 flex items-start justify-center sticky top-0">
                <div>
                    {portfolioItems.map((item, index) => (
                        <div
                            key={index}
                            className={`w-full h-screen top-0 left-0 absolute ${
                                currentProjekt === item.title ? "opacity-100 z-10" : "opacity-0 z-0"
                            }`}
                        >
                            <img
                                src={item.imageName}
                                alt={item.title}
                                className="w-full h-full object-cover "
                            />
                            <div className="absolute bottom-[5%] left-[50%] w-[50%] translate-x-[-50%] py-6
                            bg-[#121212] text-white p-4 rounded-4xl text-center
                            flex gap-8 items-center justify-center text-[18px]">
                                <div className="text-[#888888] font-semibold">{item.description}</div>
                                <div className="text-[#EAEAEA] font-bold cursor-pointer relative group inline-block">
                                  <span onClick={() => openLearnMore(item.title)}>Mehr Erfahren</span>
                                  <span className="absolute left-0 -bottom-0.5 h-[1px] bg-[#EAEAEA] w-full transform scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}