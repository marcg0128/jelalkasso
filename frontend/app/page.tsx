'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimation } from "framer-motion";
import { ChevronLeft, ChevronRight, Instagram } from 'lucide-react';
import { useInView } from "react-intersection-observer";

// Animations-Wrapper
const FadeInWhenVisible = ({ children, direction = "up" }: { children: React.ReactNode, direction?: "up" | "left" | "right" }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

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
            transition={{ duration: 0.6, ease: "easeOut" }}
            variants={variants}
        >
            {children}
        </motion.div>
    );
};



const navItems = [
    { id: "home", label: "Start" },
    { id: "about", label: "Über mich" },
];

const navItemsRight = [
    { id: "portfolio", label: "Portfolio" },
    { id: "contact", label: "Kontakt" },
];

export default function Home() {
    const [scrollY, setScrollY] = useState(0);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [active, setActive] = useState("home");

    const portfolioItems = [
        { id: 1, title: "Hochzeitsmomente", description: "Eine Foto- und Videoreportage, die Emotionen authentisch einfängt und den Tag in einzigartigen Bildern erzählt.", imageUrl: "/images/Download.jpeg" },
        { id: 2, title: "Event-Highlights", description: "Professionelle Aufnahmen, die Atmosphäre, Energie und besondere Momente eines Events eindrucksvoll festhalten.", imageUrl: "/images/Download.jpeg" },
        { id: 3, title: "Porträtserie", description: "Kreative Porträts mit Fokus auf Persönlichkeit und Ausdruck, die modern und authentisch inszeniert sind.", imageUrl: "/images/Download.jpeg" },
        { id: 4, title: "Imagefilm & Business", description: "Ein visueller Auftritt, der Unternehmen, Marken und Produkte professionell präsentiert und Vertrauen schafft.", imageUrl: "/images/Download.jpeg" }
    ];

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % portfolioItems.length);
    const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + portfolioItems.length) % portfolioItems.length);
    const goToSlide = (index: number) => setCurrentIndex(index);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof typeof errors]) setErrors(prev => ({ ...prev, [name]: '' }));
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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setSubmitStatus(''), 3000);
            } else setSubmitStatus('error');
        } catch {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const calcLogoSizeWidth = () => (scrollY > 800 ? 120 : 220);
    const calcLogoSizeHeight = () => (scrollY > 800 ? 150 : 330);

    return (
        <>
            <div id="home"></div>
            <div className="nav">
                <nav className="bg-black w-full fixed top-0 left-0 z-50 flex items-center justify-center px-6 py-3 shadow-md transition-all duration-500 ease-in-out">
                    <div className="flex items-center w-full max-w-5xl justify-center relative mb-8">
                        <ul className={`relative md:flex items-center gap-12 text-white font-medium transition-all duration-500 ease-in-out ${scrollY > 800 ? 'mt-5' : 'mt-40'}`}>
                            {navItems.map(item => (
                                <li key={item.id} className="relative">
                                    <a
                                        href={`#${item.id}`}
                                        onClick={() => setActive(item.id)}
                                        className="relative px-6 py-3 rounded-full"
                                    >
                                        {item.label}
                                        {active === item.id && (
                                            <motion.div
                                                layoutId="highlight"
                                                className="absolute inset-0 bg-white/10 rounded-full"
                                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                            />
                                        )}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <div className={`absolute left-1/2 top-[-8rem] pointer-events-none transition-all duration-500 ease-in-out ${scrollY > 800 ? '-translate-x-[40em] translate-y-15' : '-translate-x-1/2'}`}>
                            <Image
                                src={"/logo.svg"}
                                alt="logo"
                                className="filter brightness-0 invert h-auto pointer-events-none transition-all duration-500 ease-in-out"
                                width={calcLogoSizeWidth()}
                                height={calcLogoSizeHeight()}
                                priority
                            />
                        </div>

                        <ul className={`relative md:flex items-center gap-12 text-white font-medium ml-[43px] transition-all duration-500 ease-in-out ${scrollY > 800 ? 'mt-5' : 'mt-40'}`}>
                            {navItemsRight.map(item => (
                                <li key={item.id} className="relative">
                                    <a
                                        href={`#${item.id}`}
                                        onClick={() => setActive(item.id)}
                                        className="relative px-6 py-3 rounded-full"
                                    >
                                        {item.label}
                                        {active === item.id && (
                                            <motion.div
                                                layoutId="highlight"
                                                className="absolute inset-0 bg-white/10 rounded-full"
                                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                            />
                                        )}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
            </div>

            <div id="intro" className="min-h-screen flex flex-col items-center justify-center bg-white text-black px-6 py-20 relative">
                Video
                <div className="fixed bottom-8 right-8 z-40">
                    <a
                        href="https://www.instagram.com/jk_fotovideo/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative w-16 h-16 backdrop-blur-md bg-white/10 rounded-full flex items-center justify-center transition-all duration-300 border-0 hover:shadow-xl hover:ring-2 hover:ring-white/30 active:scale-95 before:absolute before:inset-[-10px] before:rounded-full before:backdrop-blur-sm before:-z-10"
                    >
                        <Instagram
                            width={32}
                            height={32}
                            className="text-white transition-transform duration-300 mix-blend-difference"
                        />
                    </a>
                </div>
            </div>

            <div id="about" className="mb-20"></div>
            <section className="min-h-screen flex flex-col items-center px-6 py-20">
                <FadeInWhenVisible direction="up">
                    <h1 className="text-6xl mb-8">Über mich</h1>
                </FadeInWhenVisible>
                <FadeInWhenVisible direction="up">
                    <p className="text-4xl max-w-3xl">
                        Hi, ich bin Jelal Kasso – leidenschaftlicher Fotograf und Videograf. Ich liebe es, besondere Momente einzufangen und Geschichten durch Bilder und Videos zu erzählen. Jedes Projekt ist für mich eine neue Gelegenheit, Kreativität mit Technik zu verbinden und einzigartige Erinnerungen zu schaffen.
                    </p>
                </FadeInWhenVisible>
                <FadeInWhenVisible direction="up">
                    <p className="text-3xl max-w-3xl text-gray-500 mt-8">
                        In den letzten Jahren durfte ich mit Menschen aus den unterschiedlichsten Bereichen arbeiten – von persönlichen Shootings über Hochzeiten bis hin zu kreativen Projekten und Events. Jedes Projekt ist für mich einzigartig, und ich lege großen Wert darauf, meine Arbeit individuell auf die Wünsche und Persönlichkeit meiner Kunden abzustimmen.
                        <br/><br/>
                        Mit Kreativität, technischer Präzision und einem Auge für Details schaffe ich Bilder und Videos, die nicht nur ästhetisch überzeugen, sondern auch Gefühle wecken. Mein Ziel ist es, Erinnerungen zu gestalten, die Menschen bewegen und eine Geschichte erzählen, die noch lange nachwirkt.
                    </p>
                </FadeInWhenVisible>
            </section>

            <section id="projects" className="flex flex-col mt-100">
                <div className="min-h-screen w-full px-8 py-20 ">
                    <FadeInWhenVisible direction="left">
                        <h2 className="text-7xl font-semibold mb-16 text-center">Portfolio</h2>
                    </FadeInWhenVisible>

                    <div className="relative">
                        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                            <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                                {portfolioItems.map((item) => (
                                    <div key={item.id} className="min-w-full">
                                        <FadeInWhenVisible direction="right">
                                            <div className="flex flex-col h-full">
                                                <div className="w-full flex-1">
                                                    <div className="relative h-[70vh] overflow-hidden">
                                                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                                                    </div>
                                                </div>
                                                <div className="w-full py-12 px-16">
                                                    <h3 className="text-5xl font-bold mb-4">{item.title}</h3>
                                                    <p className="text-2xl text-gray-600 leading-relaxed">{item.description}</p>
                                                </div>
                                            </div>
                                        </FadeInWhenVisible>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-4 rounded-full shadow-lg transition-all hover:scale-110 z-10 cursor-pointer"
                            aria-label="Vorheriges Projekt"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-800" />
                        </button>

                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-4 rounded-full shadow-lg transition-all hover:scale-110 z-10 cursor-pointer"
                            aria-label="Nächstes Projekt"
                        >
                            <ChevronRight className="w-6 h-6 text-gray-800" />
                        </button>

                        <div className="flex justify-center gap-3 mt-8">
                            {portfolioItems.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`cursor-pointer transition-all duration-300 rounded-full ${currentIndex === index ? 'w-12 h-3 bg-white/10' : 'w-3 h-3 bg-gray-400 hover:bg-gray-600'}`}
                                    aria-label={`Gehe zu Projekt ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="min-h-screen flex flex-col items-center px-6 py-20">
                <FadeInWhenVisible direction="left">
                    <h1 className="text-6xl mb-8">Speaking & Workshops</h1>
                </FadeInWhenVisible>
                <FadeInWhenVisible direction="right">
                    <p className="text-4xl max-w-6xl">
                        Fotografie und Videografie sind für mich nicht nur ein Beruf, sondern auch eine Leidenschaft, die ich gerne mit anderen teile. Neben meiner Arbeit an Projekten halte ich regelmäßig Vorträge und Workshops, in denen ich mein Wissen und meine Erfahrungen weitergebe. Dabei geht es um Themen wie Bildgestaltung, Storytelling mit der Kamera, den kreativen Prozess hinter einem Projekt sowie den Einsatz moderner Technik und Tools.
                        <br/><br/>
                        Mir ist es wichtig, nicht nur theoretisches Wissen zu vermitteln, sondern auch praktische Einblicke zu geben, die sofort angewendet werden können. Ob in kleinen Gruppen, bei Events oder in individuellen Sessions – mein Ziel ist es, Menschen zu inspirieren, ihre eigene Kreativität zu entdecken und neue Wege in der Fotografie und Videografie zu gehen.
                    </p>
                </FadeInWhenVisible>
            </section>

            <div id="contact" className="mb-20"></div>
            <section className="min-h-screen">
                    <div className=" mb-20">
                        <FadeInWhenVisible direction={"up"}>
                            <div className="h-screen bg-gradient-to-b  flex items-center px-50 gap-8">
                                <div className="w-1/3">
                                    <h2 className="text-5xl font-bold mb-4">Lass uns zusammenarbeiten.</h2>
                                    <p className="text-lg">
                                        Ob für ein Shooting, ein Event oder ein individuelles Projekt – ich freue mich
                                        darauf, deine Ideen in Bildern und Videos zum Leben zu erwecken. Schreib mir
                                        einfach, und wir finden gemeinsam den passenden Weg.
                                    </p>
                                </div>
                                <div className="w-2/3 flex items-center justify-center">
                                    <div className="w-full max-w-lg p-8">
                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                                                Name*
                                            </label>
                                            <input
                                                className={`shadow appearance-none border ${errors.name ? 'border-red-500' : 'border'} rounded-2xl w-full p-5 text-gray-700 leading-tight focus:outline-none focus:ring-2  transition-all`}
                                                id="name"
                                                name="name"
                                                type="text"
                                                placeholder="Dein Name"
                                                value={formData.name}
                                                onChange={handleFormChange}
                                            />
                                            {errors.name && (
                                                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                            )}
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                                                E-Mail*
                                            </label>
                                            <input
                                                className={`shadow appearance-none border ${errors.email ? 'border-red-500' : 'border'} rounded-2xl w-full p-5 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-whitetransition-all`}
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="deine@email.com"
                                                value={formData.email}
                                                onChange={handleFormChange}
                                            />
                                            {errors.email && (
                                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                            )}
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-bold mb-2" htmlFor="message">
                                                Nachricht*
                                            </label>
                                            <textarea
                                                className={`shadow appearance-none border ${errors.message ? 'border-red-500' : 'border'} rounded-2xl w-full p-5 text-gray-700 leading-tight focus:outline-none focus:ring-2  resize-none transition-all`}
                                                id="message"
                                                name="message"
                                                rows={8}
                                                placeholder="Erzähl mir von deinem Projekt..."
                                                value={formData.message}
                                                onChange={handleFormChange}
                                            ></textarea>
                                            {errors.message && (
                                                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <button
                                                className="bg-white/10 hover:bg-gray-900 text-white font-bold p-3 px-6 rounded-xl focus:outline-none focus:shadow-outline transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                                type="button"
                                                onClick={sendEmail}
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? 'Wird gesendet...' : 'Senden'}
                                            </button>
                                        </div>

                                        {submitStatus === 'success' && (
                                            <div className="mt-4 p-4 bg-green-100 border border-green-500 rounded-lg text-green-700">
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

                    </div>
            </section>

            <section>
                <div className="w-full bg-black text-white py-6 flex flex-col items-center">
                    <div className="flex items-center gap-4 mb-4">
                        <Instagram className="w-6 h-6"/>
                        <a href="https://www.instagram.com/jelal.kasso/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                            @jelal.kasso
                        </a>
                    </div>
                    <p className="text-sm">&copy; {new Date().getFullYear()} Jelal Kasso. Alle Rechte vorbehalten.</p>
                </div>
            </section>
        </>
    );
}
