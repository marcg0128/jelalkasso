"use client";

import CountUp from "@/components/CountUp";
import React from "react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const portfolioItems = [
        { title: "Projekt A", description: "Beschreibung A", imageName: "/images/projects/1.png" },
        { title: "Projekt B", description: "Beschreibung B", imageName: "/images/projects/2.png" },
        { title: "Projekt C", description: "Beschreibung C", imageName: "/images/projects/3.png" },
        { title: "Projekt D", description: "Beschreibung D", imageName: "/images/projects/4.png" },
        { title: "Projekt E", description: "Beschreibung E", imageName: "/images/projects/5.png" },
        { title: "Projekt F", description: "Beschreibung F", imageName: "/images/projects/6.png" }
    ];

export default function Portfolio() {
    const [currentProjekt, setCurrentProjekt] = useState<string | null>(null);
    const [moreDetailsProjekt, setMoreDetailsProject] = useState<string | null>(null);


    const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
    const isAutoScrollingRef = useRef(false);
    const debounceTimeoutRef = useRef<number | null>(null);
    const autoScrollEndTimeoutRef = useRef<number | null>(null);

    function scrollToProject(index: number) {
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

        function handleScroll() {
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
            const TARGET_OFFSET = -20; // negativ = höher, positiv = tiefer
            const offset = elementCenterY + TARGET_OFFSET - lineY;

            const MIN_OFFSET = 20; // minimaler Abstand, ab dem wir zentrieren
            const DEBOUNCE_MS = 1000; // wartezeit um scroll-events zu gruppieren
            const AUTO_SCROLL_END_MS = 500; // wie lange wir Auto-Scroll als aktiv betrachten

            if (Math.abs(offset) > MIN_OFFSET) {
                // debounce: warte kurz, gruppiere Scroll-Events
                cleanupTimeout(debounceTimeoutRef);
                debounceTimeoutRef.current = window.setTimeout(() => {
                    // set flag damit handleScroll ignoriert wird während smooth scroll läuft
                    isAutoScrollingRef.current = true;

                    // scrollBy verwendet viewport-differenz, offset ist korrekt (beide sind viewport-Koords)
                    window.scrollBy({ top: offset, behavior: "smooth" });

                    // nach einiger Zeit (geschätzt) gehen wir davon aus, dass der smooth scroll vorbei ist
                    cleanupTimeout(autoScrollEndTimeoutRef);
                    autoScrollEndTimeoutRef.current = window.setTimeout(() => {
                        isAutoScrollingRef.current = false;
                        autoScrollEndTimeoutRef.current = null;
                    }, AUTO_SCROLL_END_MS);

                    debounceTimeoutRef.current = null;
                }, DEBOUNCE_MS);
            }
        }

        // listener
        window.addEventListener("scroll", handleScroll, { passive: true });

        // initial run
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            cleanupTimeout(debounceTimeoutRef);
            cleanupTimeout(autoScrollEndTimeoutRef);
        };
    }, []); // leer: portfolioItems sind konstant in deinem Beispiel




    return (


            <div className="flex  items-start justify-between gap-4 h-[83vh]  mt-70 mb-300">
                <div className="flex items-start justify-center gap-4 h-[97vh] ml-47 mt-60">
                    <div className={`sticky top-50 transition-all duration-700 ease-in-out ${
                        moreDetailsProjekt ? '-translate-x-[200%] opacity-0' : 'translate-x-0 opacity-100'
                    }`}>
                        <h1
                            id="portfolio-title"
                            className="text-5xl font-bold mb-6 inline-block after:inline-block
                            after:ml-20 after:w-20 after:h-0.5 after:bg-[#EAEAEA] after:align-middle
                            rounded-4xl "
                        >
                            Portfolio
                        </h1>
                        <div className="mt-10 ">
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



                    <div className="flex flex-col items-start justify-start ml-10 mr-10">
                        {portfolioItems.map((item, index) => (
                            <div
                                className={`mb-15 cursor-pointer transition-all duration-700 ease-in-out ${
                                    moreDetailsProjekt 
                                        ? currentProjekt === item.title
                                            ? '-translate-x-[200%] -translate-y-[40%]'
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
                            </div>
                        ))}

                    </div>

                    {/*<ul className="flex flex-col items-end ml-20 overflow-y-auto snap-y gap-8">*/}
                    {/*    {portfolioItems.map((item, index) => (*/}
                    {/*        <li className="mb-20 snap-center" key={index}>*/}

                    {/*            <h2 className="text-5xl font-bold mt-4">{item.title}</h2>*/}

                    {/*        </li>*/}
                    {/*    ))}*/}

                    {/*</ul>*/}
                </div>
                <div className="flex-1  flex items-start justify-center  sticky top-0     ">
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