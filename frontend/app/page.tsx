'use client';
import React from 'react';
import Image from 'next/image';


export default function Home() {


  return (
      <>
          <div className="container mx-auto px-4 py-6 flex items-center justify-between opacity-0 transition-opacity">
                <h2 className="mr-4"><a href="#start">Jelal Kasso</a></h2>
                <nav className="flex items-center">
                <div className="flex space-x-4 justify-end w-full">
                    <a href="#" className="text-lg font-medium text-gray-700 hover:text-gray-900">Home</a>
                    <a href="#about" className="text-lg font-medium text-gray-700 hover:text-gray-900">About</a>
                    <a href="#projects" className="text-lg font-medium text-gray-700 hover:text-gray-900">Projects</a>
                    <a href="#contact" className="text-lg font-medium text-gray-700 hover:text-gray-900">Contact</a>
                </div>
                <div className="ml-8">
                    <a href="#" className="text-lg font-medium text-blue-600 hover:text-blue-800">Blog</a>
                </div>
            </nav>
          </div>
          <div className="flex min-h-screen flex-col items-center justify-between p-18">

            <section id="start">
                <h1 className="text-[10rem] font-bold"><span>Jelal</span><span className="ml-120">Kasso</span></h1>
                <div className="">
                    <p className="text-2xl mt-4">Photographer | Videographer | Filmmaker</p>
                </div>

                <div className="mt-16 flex justify-center">
                    <a
                        href="https://www.instagram.com/jk_fotovideo/" // Hier deine Instagram URL eintragen
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative w-15 h-15 bg-gradient-to-br rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl border-1"
                    >
                        {/* Mit lokalem SVG */}
                        <Image
                            src="/instagram.svg" // Pfad zu deinem lokalen SVG
                            alt="Instagram"
                            width={32}
                            height={32}
                            className="filter brightness-0 invert group-hover:scale-110 transition-transform duration-300"
                        />

                    </a>
                </div>


                <div className="mt-150" id="about">
                    <h2 className="text-4xl font-semibold mb-4">Über mich</h2>
                    <p className="text-lg max-w-3xl">
                        Hi, ich bin JK – leidenschaftlicher Fotograf und Videograf. Ich liebe es, besondere Momente
                        einzufangen und Geschichten durch Bilder und Videos zu erzählen. Jedes Projekt ist für mich
                        eine neue Gelegenheit, Kreativität mit Technik zu verbinden und einzigartige Erinnerungen zu
                        schaffen.
                    </p>

                </div>

            </section>
          </div>
      </>
  );
}