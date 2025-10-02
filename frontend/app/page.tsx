'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Menu, X, Instagram } from 'lucide-react';

export default function Home() {
    const [scrollY, setScrollY] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

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
            <div>
                <nav className="bg-[var(--bg-dark)] w-full fixed top-0 left-0 z-50 flex items-center justify-between p-4 shadow-md">
                    <div className=" flex items-center">
                        <Image
                            src={"/logo.svg"}
                            alt="logo"
                            className=""
                        />
                    </div>
                    <div className="">
                        <ul>
                            <li><a href="#home">Home</a></li>
                            <li><a href="#about">Über mich</a></li>
                            <li><a href="#portfolio">Portfolio</a></li>
                            <li><a href="#contact">Kontakt</a></li>
                            <li><a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer"><Instagram/></a></li>
                        </ul>
                    </div>
                </nav>


            </div>


        </>
    );
}