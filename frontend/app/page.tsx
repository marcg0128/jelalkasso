'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Menu, X, Instagram } from 'lucide-react';

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
    const [menuOpen, setMenuOpen] = useState(false);
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

    const calcLogoSizeWidth = () => {
        if (scrollY > 700) return 120;

        return 220;
    }

    const calcLogoSizeHeight = () => {
        if (scrollY > 700) return 150;

        return 330;
    }

    return (
        <>
            <div id="home"></div>
            <div className="nav">
                <nav className="bg-black w-full fixed top-0 left-0 z-50 flex items-center justify-center px-6 py-3 shadow-md">
                    <div className="flex items-center w-full max-w-5xl justify-center relative mb-8">

                        {/* Linke Seite */}
                        <ul className={`relative md:flex items-center gap-12 text-white font-medium ${
                            scrollY > 700 ? 'mt-5' : 'mt-40'
                        }`}>
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

                        {/* Logo */}
                        <div className={`absolute left-1/2  top-[-8rem] pointer-events-none transition-all ${
                            scrollY > 700 ? '-translate-x-[40em] translate-y-15' : '-translate-x-1/2'
                        }`}>
                            <Image
                                src={"/logo.svg"}
                                alt="logo"
                                className="filter brightness-0 invert h-auto pointer-events-none"
                                width={calcLogoSizeWidth()}
                                height={calcLogoSizeHeight()}
                                priority
                            />
                        </div>

                        {/* Rechte Seite */}
                        <ul className={`relative md:flex items-center gap-12 text-white font-medium ml-[43px] ${
                            scrollY > 700 ? 'mt-5' : 'mt-40'
                        }`}>
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

            <div id="intro" className="min-h-screen flex flex-col items-center justify-center bg-white text-black px-6 py-20">
                Video
            </div>

            <div  id="about" className="mb-20"></div>

            <section className="min-h-screen flex flex-col items-center px-6 py-20">
                <h1 className="text-6xl mb-8">Über mich</h1>
                <p className="text-4xl max-w-3xl">
                                    Hi, ich bin Jelal Kasso – leidenschaftlicher Fotograf und Videograf. Ich liebe es, besondere Momente
                                    einzufangen und Geschichten durch Bilder und Videos zu erzählen. Jedes Projekt ist für mich
                                    eine neue Gelegenheit, Kreativität mit Technik zu verbinden und einzigartige Erinnerungen zu
                                    schaffen.
                </p>
                <br/>
                <p className="text-3xl max-w-3xl text-gray-500">
                    In den letzten Jahren durfte ich mit Menschen aus den unterschiedlichsten Bereichen arbeiten
                    – von persönlichen Shootings über Hochzeiten bis hin zu kreativen Projekten und Events.
                    Jedes Projekt ist für mich einzigartig, und ich lege großen Wert darauf, meine Arbeit
                    individuell auf die Wünsche und Persönlichkeit meiner Kunden abzustimmen. <br/><br/>

                    Mit Kreativität, technischer Präzision und einem Auge für Details schaffe ich Bilder und
                    Videos, die nicht nur ästhetisch überzeugen, sondern auch Gefühle wecken. Mein Ziel ist es,
                    Erinnerungen zu gestalten, die Menschen bewegen und eine Geschichte erzählen, die noch lange
                    nachwirkt.
                </p>
            </section>

        </>
    );
}