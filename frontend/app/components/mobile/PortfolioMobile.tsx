"use client";

import React, { useEffect, useRef, useState } from "react";

const portfolioItems = [
    { title: "Projekt A", imageName: "/images/projects/1.png" },
    { title: "Projekt B", imageName: "/images/projects/2.png" },
    { title: "Projekt C", imageName: "/images/projects/3.png" },
    { title: "Projekt D", imageName: "/images/projects/4.png" }
];

export default function PortfolioMobile() {
    const [currentProjekt, setCurrentProjekt] = useState<string | null>(null);

    const carouselRef = useRef<HTMLDivElement | null>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const container = carouselRef.current;
        if (!container) return;
        const containerEl = container as HTMLDivElement;

        function onScroll() {
            const centerX = containerEl.scrollLeft + containerEl.clientWidth / 2;

            let closestIndex = 0;
            let closestDistance = Infinity;

            itemRefs.current.forEach((el, index) => {
                if (!el) return;

                const elCenter =
                    el.offsetLeft + el.offsetWidth / 2;

                const distance = Math.abs(centerX - elCenter);

                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = index;
                }
            });

            setCurrentProjekt(portfolioItems[closestIndex].title);
        }

        container.addEventListener("scroll", onScroll, { passive: true });
        onScroll();

        return () => container.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div className="relative h-[70vh] flex flex-col">

            {/* BACKGROUND */}
            <div className="relative flex-1 overflow-hidden">
                {portfolioItems.map((item) => (
                    <div
                        key={item.title}
                        className={`absolute inset-0 transition-opacity duration-500 ${
                            currentProjekt === item.title ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <img
                            src={item.imageName}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>

            <div className="bg-[#121212] mb-20">
                <div
                    ref={carouselRef}
                    className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 no-scrollbar"

                >
                    {portfolioItems.map((item, index) => (
                        <div
                            key={item.title}
                            ref={(el) => { itemRefs.current[index] = el; }}
                            className="snap-center min-w-[60%]  text-white rounded-2xl p-6 text-center"
                        >
                            <h2
                                className={`text-2xl transition-colors ${
                                    currentProjekt === item.title
                                        ? "font-bold text-white"
                                        : "text-gray-400"
                                }`}
                            >
                                {item.title}
                            </h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
}
