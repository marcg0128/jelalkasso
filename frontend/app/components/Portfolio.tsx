import {ArrowUpRight, ChevronLeft, ChevronRight} from "lucide-react";
import React, {useState} from "react";

export default function Portfolio(windowWidth: number) {
    const [currentIndex, setCurrentIndex] = useState(0);


    const portfolioItems = [
        {
            imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
            title: "Event Highlights",
            description: "Besondere Momente und Atmosphäre professionell festgehalten.",
            tags: ["Eventfotografie", "Schnitt"],
            redirectUrl: "https://www.instagram.com/jk_fotovideo/"
        },
        {
            imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
            title: "Portrait Serie",
            description: "Authentische Portraits die Persönlichkeit einfangen.",
            tags: ["Photography", "Art Direction"],
            redirectUrl: "https://www.instagram.com/jk_fotovideo/"
        },
        {
            imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
            title: "Hochzeitserinnerung",
            description: "Stadtleben durch die Linse eingefangen.",
            tags: ["Photography", "Storytelling"],
            redirectUrl: "https://www.instagram.com/stories/highlights/17951190092844464/"
        },
        {
            imageUrl: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=800&q=80",
            title: "Fashion Shoot",
            description: "Kreative Mode-Fotografie mit einzigartigem Stil.",
            tags: ["Fashion", "Editorial"],
            redirectUrl: "https://www.instagram.com/jk_fotovideo/"
        },
        {
            imageUrl: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=800&q=80",
            title: "Fashion Shoot",
            description: "Kreative Mode-Fotografie mit einzigartigem Stil.",
            tags: ["Fashion", "Editorial"],
            redirectUrl: "https://www.instagram.com/jk_fotovideo/"
        }
      ];

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? portfolioItems.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === portfolioItems.length - 1 ? 0 : prev + 1));
    };

    return (
        <>
            <div id="portfolio" className="mb-8"></div>

            <section className="min-h-screen w-full py-20 bg-black">
                {/* Header with Navigation */}
                <div className="flex items-center justify-center gap-8 mb-16 px-8">
                    <button
                        onClick={prevSlide}
                        className={`bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full transition-all hover:scale-110 cursor-pointer ${
                            windowWidth < 768 ? 'translate-y-50' : ''
                        }`}
                        aria-label="Vorheriges Projekt"
                    >
                        <ChevronLeft className="w-8 h-8 text-white" />
                    </button>

                    <div className="text-center">
                        <h2 className="text-5xl md:text-7xl font-bold mb-6 text-white">Meine Projekte</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                            Ich setze kreative Ideen in Bilder und Videos um – von Events über Portraits bis hin zu
                            individuellen Aufträgen. Jedes Projekt erzählt seine eigene Geschichte.
                        </p>
                    </div>

                    <button
                        onClick={nextSlide}
                        className={`bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full transition-all hover:scale-110 cursor-pointer ${
                            windowWidth < 768 ? 'translate-y-50' : ''
                        }`}
                        aria-label="Nächstes Projekt"
                    >
                        <ChevronRight className="w-8 h-8 text-white" />
                    </button>
                </div>

                {/* Smooth Stacked Cards */}
                {/* Smooth Stacked Cards */}
                {/* Smooth Stacked Cards */}
                <div className="relative flex justify-center items-center h-[550px] overflow-hidden">
                    <div className="relative w-full h-full flex justify-center items-center">
                        {portfolioItems.map((item, idx) => {
                            const isMobile = windowWidth < 768;
                            const visibleItems = isMobile ? 3 : portfolioItems.length;

                            // Berechnung relative Position mit Loop
                            let relativePosition = ((idx - currentIndex + portfolioItems.length) % portfolioItems.length);
                            if (relativePosition > Math.floor(portfolioItems.length / 2)) {
                                relativePosition -= portfolioItems.length;
                            }

                            const baseOffset = 320;
                            const offsetX = isMobile
                                ? relativePosition * (baseOffset / 1.5)
                                : relativePosition * baseOffset;
                            const scale = isMobile
                                ? 1 - 0.2 * Math.abs(relativePosition)
                                : 1 - 0.15 * Math.abs(relativePosition);
                            // zIndex max. 40, damit Instagram-Button darüber liegt
                            const zIndex = Math.min(40, 40 - Math.abs(relativePosition) * 10);
                            const opacity = Math.max(0, 1 - 0.35 * Math.abs(relativePosition));
                            const transform = `translateX(${offsetX}px) scale(${scale})`;

                            return (
                                <div
                                    key={idx}
                                    className="absolute transition-transform duration-700 ease-in-out"
                                    style={{
                                        transform,
                                        zIndex,
                                        opacity,
                                        transformStyle: 'preserve-3d',
                                    }}
                                    onClick={() => { if (relativePosition !== 0) setCurrentIndex(idx); }}
                                >
                                    <div className="group relative w-[300px] md:w-[450px] h-[400px] md:h-[500px] rounded-2xl overflow-hidden cursor-pointer shadow-2xl">
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div
                                            className="absolute inset-0 bg-black transition-opacity duration-700"
                                            style={{ opacity: relativePosition === 0 ? 0.4 : 0.6 }}
                                        />
                                        <div
                                            className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent group-hover:opacity-80 transition-opacity duration-700"
                                            style={{ opacity: relativePosition === 0 ? 0.3 : 0.6 }}
                                        />

                                        {/* Smooth Content */}
                                        <div
                                            className={`absolute inset-0 flex flex-col justify-end p-6 md:p-8 transition-all duration-700 ease-in-out`}
                                            style={{
                                                opacity: relativePosition === 0 ? 1 : 0,
                                                transform: `translateY(${relativePosition === 0 ? '0' : '20px'})`,
                                            }}
                                        >
                                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{item.title}</h3>
                                            <p className="text-white/90 text-sm md:text-base mb-4">{item.description}</p>
                                            <div className="flex gap-2 flex-wrap">
                                                {item.tags.map((tag, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs md:text-sm"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Arrow Icon */}
                                        {relativePosition === 0 && (
                                            <div className="absolute bottom-6 right-6 w-10 h-10 md:w-12 md:h-12
                                            bg-white/20 backdrop-blur-sm rounded-full flex items-center
                                            justify-center transition-all duration-300 hover:scale-110">
                                                <a href={item.redirectUrl} target="_blank" rel="noopener noreferrer">
                                                    <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </section>
        </>
    );
}