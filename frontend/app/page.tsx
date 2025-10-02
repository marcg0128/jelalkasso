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

    return (
        <>
            <div className="">
                <nav className="bg-black w-full fixed top-0 left-0 z-50 flex items-center justify-center px-6 py-3 shadow-md">
                    <div className="flex items-center w-full max-w-5xl justify-center relative mb-8">

                        {/* Linke Seite */}
                        <ul className="relative md:flex items-center gap-12 text-white font-medium mt-40">
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
                        <div className="absolute left-1/2 -translate-x-1/2 top-[-8rem] pointer-events-none">
                            <Image
                                src={"/logo.svg"}
                                alt="logo"
                                className="filter brightness-0 invert h-auto pointer-events-none"
                                width={220}
                                height={330}
                                priority
                            />
                        </div>

                        {/* Rechte Seite */}
                        <ul className="relative ml-12 md:flex items-center gap-12 text-white font-medium mt-40">
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



        </>
    );
}