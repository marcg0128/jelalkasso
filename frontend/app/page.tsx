'use client';
import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import {motion, useAnimation} from "framer-motion";
import {ChevronLeft, ChevronRight, Instagram, Menu, X, ArrowUpRight} from 'lucide-react';
import {useInView} from "react-intersection-observer";

import NavBar from "./components/NavBar";
import Start from "./components/Start";
import Portfolio from "@/app/components/Portfolio";
import Reviews from "@/app/components/Reviews";

// Animations-Wrapper
const FadeInWhenVisible = ({children, direction = "up"}: {
    children: React.ReactNode,
    direction?: "up" | "left" | "right"
}) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({triggerOnce: true, threshold: 0.2});

    useEffect(() => {
        if (inView) controls.start("visible");
    }, [controls, inView]);

    const variants = {
        hidden: {
            opacity: 0,
            x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
            y: direction === "up" ? 50 : 0
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0
        }
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            transition={{duration: 0.6, ease: "easeOut"}}
            variants={variants}
        >
            {children}
        </motion.div>
    );
};

export default function Home() {
    const [scrollY, setScrollY] = useState(0);
    const [formData, setFormData] = useState({name: '', email: '', message: ''});
    const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [active, setActive] = useState("home");
    const [menuOpen, setMenuOpen] = useState(false);






    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
        if (errors[name as keyof typeof errors]) setErrors(prev => ({...prev, [name]: ''}));
    };

    const validateForm = () => {
        const newErrors: { name?: string; email?: string; message?: string } = {};
        if (!formData.name.trim()) newErrors.name = 'Name ist erforderlich';
        if (!formData.email.trim()) newErrors.email = 'E-Mail ist erforderlich';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Ungültige E-Mail-Adresse';
        if (!formData.message.trim()) newErrors.message = 'Nachricht ist erforderlich';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const sendEmail = async () => {
        if (!validateForm()) return;
        setIsSubmitting(true);
        setSubmitStatus('');
        try {
            const response = await fetch('http://localhost:8000/sendMail', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                setSubmitStatus('success');
                setFormData({name: '', email: '', message: ''});
                setTimeout(() => setSubmitStatus(''), 3000);
            } else setSubmitStatus('error');
        } catch {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        setWindowWidth(window.innerWidth); // beim ersten Render
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    };



    return (
        <>

            {/* Navbar */}
            <div id="home"></div>
            <div className="flex items-center justify-between px-[10%] py-4 fixed top-0 left-0 w-full  z-50 ">
                <Image src={"/logo.svg"} alt="Logo" width="90" height="90"
                       className=""/>
                <NavBar></NavBar>

            </div>

            <Start></Start>

            <Portfolio></Portfolio>

            <Reviews></Reviews>

            <h1 className="text-3xl md:text-9xl flex items-center justify-center h-full mt-100 mb-100">Work in Progress...</h1>


            {/* Intro */}


            {/*/!* Über mich *!/*/}
            {/*<div id="about" className="mb-60"></div>*/}
            {/*<section className="min-h-screen flex flex-col items-center px-6 py-20">*/}
            {/*    <FadeInWhenVisible direction="up">*/}
            {/*        <h1 className="text-4xl md:text-6xl mb-8 ">Über mich</h1>*/}
            {/*    </FadeInWhenVisible>*/}
            {/*    <FadeInWhenVisible direction="up">*/}
            {/*        <p className="text-xl md:text-4xl max-w-3xl ">*/}
            {/*            Hi, ich bin Jelal Kasso – leidenschaftlicher Fotograf und Videograf. Ich liebe es, besondere*/}
            {/*            Momente einzufangen und Geschichten durch Bilder und Videos zu erzählen. Jedes Projekt ist für*/}
            {/*            mich eine neue Gelegenheit, Kreativität mit Technik zu verbinden und einzigartige Erinnerungen*/}
            {/*            zu schaffen.*/}
            {/*        </p>*/}
            {/*    </FadeInWhenVisible>*/}
            {/*    <FadeInWhenVisible direction="up">*/}
            {/*        <p className="text-lg md:text-3xl max-w-3xl text-gray-500 mt-8 ">*/}
            {/*            In den letzten Jahren durfte ich mit Menschen aus den unterschiedlichsten Bereichen arbeiten –*/}
            {/*            von persönlichen Shootings über Hochzeiten bis hin zu kreativen Projekten und Events. Jedes*/}
            {/*            Projekt ist für mich einzigartig, und ich lege großen Wert darauf, meine Arbeit individuell auf*/}
            {/*            die Wünsche und Persönlichkeit meiner Kunden abzustimmen.*/}
            {/*            <br/><br/>*/}
            {/*            Mit Kreativität, technischer Präzision und einem Auge für Details schaffe ich Bilder und Videos,*/}
            {/*            die nicht nur ästhetisch überzeugen, sondern auch Gefühle wecken. Mein Ziel ist es, Erinnerungen*/}
            {/*            zu gestalten, die Menschen bewegen und eine Geschichte erzählen, die noch lange nachwirkt.*/}
            {/*        </p>*/}
            {/*    </FadeInWhenVisible>*/}
            {/*</section>*/}


            {/* Kontakt */}
            <div id="contact" className="mb-20"></div>
            <section className="min-h-screen flex flex-col items-center px-6 py-20">
                <FadeInWhenVisible direction={"up"}>
                    <div className="flex flex-col md:flex-row items-center gap-8 w-full max-w-6xl">
                        <div className="w-full md:w-1/3">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center md:text-left">
                                Lass uns starten
                            </h2>
                            <p className="text-lg md:text-xl text-center md:text-left">
                                Ob für ein Shooting, ein Event oder ein individuelles Projekt – ich freue mich
                                darauf, deine Ideen in Bildern und Videos zum Leben zu erwecken. Schreib mir
                                einfach, und wir finden gemeinsam den passenden Weg.
                            </p>
                        </div>
                        <div className="w-full md:w-2/3 flex items-center justify-center">
                            <div className="w-full max-w-lg p-4 md:p-8">
                                {/* Name */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Name*</label>
                                    <input
                                        className={`shadow appearance-none border ${errors.name ? 'border-red-500' : 'border'} rounded-2xl w-full p-4 md:p-5 text-gray-700 leading-tight focus:outline-none focus:ring-2 transition-all`}
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Dein Name"
                                        value={formData.name}
                                        onChange={handleFormChange}
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                </div>
                                {/* Email */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2"
                                           htmlFor="email">E-Mail*</label>
                                    <input
                                        className={`shadow appearance-none border ${errors.email ? 'border-red-500' : 'border'} rounded-2xl w-full p-4 md:p-5 text-gray-700 leading-tight focus:outline-none focus:ring-2 transition-all`}
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="deine@email.com"
                                        value={formData.email}
                                        onChange={handleFormChange}
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>
                                {/* Nachricht */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2"
                                           htmlFor="message">Nachricht*</label>
                                    <textarea
                                        className={`shadow appearance-none border ${errors.message ? 'border-red-500' : 'border'} rounded-2xl w-full p-4 md:p-5 text-gray-700 leading-tight focus:outline-none focus:ring-2 resize-none transition-all`}
                                        id="message"
                                        name="message"
                                        rows={6}
                                        placeholder="Erzähl mir von deinem Projekt..."
                                        value={formData.message}
                                        onChange={handleFormChange}
                                    ></textarea>
                                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                                </div>
                                <div className="flex items-center justify-between">
                                    <button
                                        className="bg-[#DAA520]/50 hover:bg-[#DAA520]/30 text-white font-bold p-3 px-6 rounded-xl focus:outline-none focus:shadow-outline transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                        type="button"
                                        onClick={sendEmail}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Wird gesendet...' : 'Senden'}
                                    </button>
                                </div>

                                {submitStatus === 'success' && (
                                    <div
                                        className="mt-4 p-4 bg-green-100 border border-green-500 rounded-lg text-green-700">
                                        Nachricht erfolgreich gesendet! ✓
                                    </div>
                                )}
                                {submitStatus === 'error' && (
                                    <div className="mt-4 p-4 bg-red-100 border border-red-500 rounded-lg text-red-700">
                                        Fehler beim Senden. Bitte versuche es erneut.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </FadeInWhenVisible>
            </section>

            {/* Footer */}
            <section>
                <div className="w-full bg-black text-white py-6 flex flex-col items-center">
                    <div className="flex items-center gap-4 mb-4">
                        <Instagram className="w-6 h-6"/>
                        <a href="https://www.instagram.com/jelal.kasso/" target="_blank" rel="noopener noreferrer"
                           className="hover:underline">
                            @jelal.kasso
                        </a>
                    </div>
                    <p className="text-sm">&copy; {new Date().getFullYear()} Jelal Kasso. Alle Rechte vorbehalten.</p>
                </div>
            </section>
        </>
    );
}
