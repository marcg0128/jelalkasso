"use client";

import CountUp from "@/components/CountUp";
import React from "react";
import { useState, useEffect, useRef } from "react";

const portfolioItems = [
        { title: "Projekt A", description: "Beschreibung A", imageName: "/images/projekt-a.jpg" },
        { title: "Projekt B", description: "Beschreibung B", imageName: "/images/projekt-b.jpg" },
        { title: "Projekt C", description: "Beschreibung C", imageName: "/images/projekt-c.jpg" },
        { title: "Projekt D", description: "Beschreibung D", imageName: "/images/projekt-a.jpg" },
        { title: "Projekt E", description: "Beschreibung E", imageName: "/images/projekt-b.jpg" },
        { title: "Projekt F", description: "Beschreibung F", imageName: "/images/projekt-c.jpg" }
    ];

export default function Portfolio() {
    const [currentProjekt, setCurrentProjekt] = useState<string | null>(null);


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
            const TARGET_OFFSET = -15; // negativ = höher, positiv = tiefer
            const offset = elementCenterY + TARGET_OFFSET - lineY;

            const MIN_OFFSET = 20; // minimaler Abstand, ab dem wir zentrieren
            const DEBOUNCE_MS = 150;
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


            <div className="flex  items-center justify-between gap-4 h-full  ">
                <div className="flex  items-start justify-center gap-4 h-full ml-47">
                    <div className="sticky top-40">
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



                    <div className="flex flex-col items-end ml-20 mb-50">
                        {portfolioItems.map((item, index) => (
                            <div
                                className="mb-15 cursor-pointer"
                                key={index}
                                onClick={() => scrollToProject(index)}
                                ref={(el) => { itemRefs.current[index] = el; }}
                                data-index={index}
                            >
                                <h2
                                    className={`text-5xl font-bold mt-4 ${
                                        currentProjekt === item.title
                                            ? "text-white"
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
                <div className="">


                </div>


            </div>

    );
}