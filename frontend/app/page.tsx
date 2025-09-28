'use client';
import React from 'react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';



export default function Home() {
    const [scrollY, setScrollY] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const headerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrollY(currentScrollY);

            // Navbar wird sichtbar nach 200px scrollen
            setIsScrolled(currentScrollY > 200);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    const getSubtitleTransform = () => {
        const progress = Math.min(scrollY / 300, 1);
        const opacity = 1 - progress;
        const translateY = -(scrollY * 0.3);

        return {
            transform: `translateY(${translateY}px)`,
            opacity: opacity
        };
    };

    const maxScroll = 200; // Maximaler Scroll für vollständige Animation
    const scale = Math.max(0.17, 1 - (scrollY / maxScroll));

    return (
        <>
            {/* Sticky Header/Navbar */}
            <div
                className={`fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm transition-all duration-500 ${
                    isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
                }`}
            >
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                        <a href="#start" className="hover:text-blue-600 transition-colors">

                        </a>
                    </h2>
                    <nav className="flex items-center">
                        <div className="flex space-x-6 justify-end">
                            <a href="#start" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">Home</a>
                            <a href="#about" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">About</a>
                            <a href="#projects" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">Projects</a>
                            <a href="#contact" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">Contact</a>
                        </div>
                        <div className="ml-8">
                            <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">Blog</a>
                        </div>
                    </nav>
                </div>
            </div>

            <div className="flex min-h-screen flex-col justify-between pl-30 mt-50">
                <div className="flex items-start justify-between">
                    <div>
                        <h1
                            className={`text-[10rem] font-bold sticky top-1 z-51`}
                            style={{
                                transform: `scale(${scale})`,
                                transformOrigin: 'top left',
                                transition: 'transform .2s linear',
                            }}
                        >
                            Jelal Kasso
                        </h1>

                        <section id="start" className="relative">
                            <div>
                                <div
                                    className="transition-all duration-200 ease-out"
                                    style={getSubtitleTransform()}
                                >
                                    <p className="text-2xl mt-4">Photographer | Videographer | Filmmaker</p>
                                </div>

                                <div
                                    className="mt-10 flex transition-all duration-300"
                                    style={{
                                        opacity: Math.max(0, 1 - (scrollY / 300)),
                                        transform: `translateY(${scrollY * 0.2}px)`
                                    }}
                                >
                                    <a
                                        href="https://www.instagram.com/jk_fotovideo/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative w-15 h-15 bg-gradient-to-br rounded-full flex items-center
                                                   justify-center transition-all duration-300 shadow-lg border-1 border-gray-500
                                                   hover:border-gray-300"
                                    >
                                        <Image
                                            src="/instagram.svg"
                                            alt="Instagram"
                                            width={32}
                                            height={32}
                                            className="filter brightness-0 invert transition-transform duration-300"
                                        />
                                    </a>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Box rechts neben dem Namen */}
                    <div
                        className="mr-20 mt-10 transition-all duration-300 "
                    >
                        <div className="w-96 h-100 border-4 border-red-500 rounded-3xl bg-white shadow-lg">
                            {/* Hier können Sie Inhalt für die Box hinzufügen */}
                            <div className="w-full h-full flex items-center justify-center">
                                <p className="text-gray-600 text-center">Box Content</p>
                            </div>
                        </div>
                    </div>
                </div>

                <section id="start-spacer" className="h-20"></section>

                <section id="about" className="min-h-screen">
                    <div
                        className="mt-100"
                        id="about"
                        style={{
                            transform: `translateY(${scrollY * 0.1}px)`
                        }}
                    >
                        <h2 className="text-4xl font-semibold mb-4">Über mich</h2>
                        <p className="text-lg max-w-3xl">
                            Hi, ich bin Jelal Kasso – leidenschaftlicher Fotograf und Videograf. Ich liebe es, besondere Momente
                            einzufangen und Geschichten durch Bilder und Videos zu erzählen. Jedes Projekt ist für mich
                            eine neue Gelegenheit, Kreativität mit Technik zu verbinden und einzigartige Erinnerungen zu
                            schaffen.
                        </p>
                    </div>

                    <div className="mt-20 mb-20">
                        <div className="h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
                            <div className="text-center">
                                <h2 className="text-4xl font-bold mb-4">Portfolio</h2>
                                <p className="text-gray-600">Hier kommen deine Projekte...</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}