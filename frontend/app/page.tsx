'use client';
import React from 'react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Home() {
    const [scrollY, setScrollY] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const headerRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState<{name?: string; email?: string; message?: string}>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');

    const [currentIndex, setCurrentIndex] = useState(0);

  const portfolioItems = [
        {
          id: 1,
          title: "Hochzeitsmomente",
          description: "Eine Foto- und Videoreportage, die Emotionen authentisch einfängt und den Tag in einzigartigen Bildern erzählt.",
          imageUrl: " https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop"
        },
        {
          id: 2,
          title: "Event-Highlights",
          description: "Professionelle Aufnahmen, die Atmosphäre, Energie und besondere Momente eines Events eindrucksvoll festhalten.",
          imageUrl: " https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=800&h=600&fit=crop"
        },
        {
          id: 3,
          title: "Porträtserie",
          description: "Kreative Porträts mit Fokus auf Persönlichkeit und Ausdruck, die modern und authentisch inszeniert sind.",
          imageUrl: " https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=600&fit=crop"
        },
        {
          id: 4,
          title: "Imagefilm & Business",
          description: "Ein visueller Auftritt, der Unternehmen, Marken und Produkte professionell präsentiert und Vertrauen schafft.",
          imageUrl: " https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop"
        }
    ];

     const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % portfolioItems.length);
     };

     const prevSlide = () => {
         setCurrentIndex((prev) => (prev - 1 + portfolioItems.length) % portfolioItems.length);
     };

     const goToSlide = (index: number ) => {
        setCurrentIndex(index);
     };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrollY(currentScrollY);
            setIsScrolled(currentScrollY > 200);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors: {name?: string; email?: string; message?: string} = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name ist erforderlich';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'E-Mail ist erforderlich';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Ungültige E-Mail-Adresse';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Nachricht ist erforderlich';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const sendEmail = async () => {
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus('');

        try {
            // Hier deine API Integration
            const response = await fetch('http://localhost:8000/sendMail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setSubmitStatus(''), 3000);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Fehler beim Senden:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const getSubtitleTransform = () => {
        const progress = Math.min(scrollY / 300, 1);
        const opacity = 1 - progress;
        const translateY = -(scrollY * 0.3);

        return {
            transform: `translateY(${translateY}px)`,
            opacity: opacity
        };
    };

    const maxScroll = 200;
    const scale = Math.max(0.17, 1 - (scrollY / maxScroll));

    return (
        <>
            {/* Blue Light Gradient from Top Left */}
            <div
                className="fixed top-[-50px] left-[-50px] w-180 h-180 pointer-events-none z-52"
                style={{
                    background: 'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0.1) 40%, transparent 70%)',
                    filter: 'blur(10px)'
                }}
            ></div>

            {/* Sticky Header/Navbar */}
            <div
                className={`fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm transition-all duration-500 ${
                    isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
                }`}
            >
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                        <a href="#start" className="hover:text-blue-600 transition-colors">
                            Jelal Kasso
                        </a>
                    </h2>
                    <nav className="flex items-center">
                        <div className="flex space-x-6 justify-end">
                            <a href="#start" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">Start</a>
                            <a href="#about" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">Über mich</a>
                            <a href="#projects" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">Projekte</a>
                            <a href="#contact" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">Kontakt</a>
                        </div>
                    </nav>
                </div>
            </div>

            <div className="flex min-h-screen flex-col justify-between pl-30 mt-50 text-[#ededed]  ">
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
                <div className="flex items-start justify-between">
                    <div>
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
                        <section id="about" className="min-h-screen">
                            <div
                                className="mt-150 mb-10 px-12"
                                style={{
                                    transform: `translateY(${scrollY * 0.1}px)`
                                }}
                            >
                                <h2 className="text-7xl font-semibold mb-4">Über mich</h2>
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
                            </div>
                        </section>
                    </div>

                    {/* Box rechts neben dem Namen */}
                    <aside className="sticky top-24 self-start z-40">
                        <div className="w-96 h-100 border-4 border-red-500 rounded-3xl bg-white shadow-lg overflow-hidden">
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                                <p className="text-gray-400 text-center text-xl">Profilbild</p>
                            </div>
                        </div>
                    </aside>
                </div>

                <section id="projects" className="min-h-screen flex flex-col mt-100">
                    <div className="w-full px-8 py-20">
                        <h2 className="text-7xl font-semibold mb-16 ">Portfolio</h2>

                        <div className="relative">
                            <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white">
                                <div
                                    className="flex transition-transform duration-500 ease-out"
                                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                                >
                                    {portfolioItems.map((item) => (
                                        <div key={item.id} className="min-w-full">
                                            <div className="flex flex-col h-full">
                                                <div className="w-full flex-1">
                                                    <div className="relative h-[70vh] overflow-hidden">
                                                        <img
                                                            src={item.imageUrl}
                                                            alt={item.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className="w-full py-12 px-16">
                                                    <h3 className="text-5xl font-bold  mb-4">{item.title}</h3>
                                                    <p className="text-2xl text-gray-600 leading-relaxed">{item.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Navigation Buttons */}
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
                                <ChevronRight className="w-6 h-6 text-gray-800 " />
                            </button>

                            {/* Dot Indicators */}
                            <div className="flex justify-center gap-3 mt-8">
                                {portfolioItems.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        className={`cursor-pointer transition-all duration-300 rounded-full ${
                                            currentIndex === index
                                                ? 'w-12 h-3 bg-gray-800'
                                                : 'w-3 h-3 bg-gray-400 hover:bg-gray-600'
                                        }`}
                                        aria-label={`Gehe zu Projekt ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>



                <section id="contact" className="min-h-screen">
                    <div className="mt-20 mb-20">
                        <div className="h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center px-12 gap-8">
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
                                            className={`shadow appearance-none border ${errors.name ? 'border-red-500' : 'border'} rounded-2xl w-full p-5 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
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
                                            className={`shadow appearance-none border ${errors.email ? 'border-red-500' : 'border'} rounded-2xl w-full p-5 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
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
                                            className={`shadow appearance-none border ${errors.message ? 'border-red-500' : 'border'} rounded-2xl w-full p-5 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all`}
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
                                    <div className="flex items-center justify-between ">
                                        <button
                                            className="bg-[#2758a8] hover:bg-[#2b64c2] text-white font-bold p-3
                                                       px-6 rounded-xl focus:outline-none transition-all duration-270
                                                        disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
                                                        hover:shadow-[0_0_20px_rgba(39,88,168,0.5)]"
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
                    </div>
                </section>
            </div>
        </>
    );
}