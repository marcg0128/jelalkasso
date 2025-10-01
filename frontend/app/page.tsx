'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';

export default function Home() {
    const [scrollY, setScrollY] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [burgerOpen, setBurgerOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    const portfolioItems = [
        { id: 1, title: "Hochzeitsmomente", description: "Eine Foto- und Videoreportage, die Emotionen authentisch einfängt und den Tag in einzigartigen Bildern erzählt.", imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop" },
        { id: 2, title: "Event-Highlights", description: "Professionelle Aufnahmen, die Atmosphäre, Energie und besondere Momente eines Events eindrucksvoll festhalten.", imageUrl: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=800&h=600&fit=crop" },
        { id: 3, title: "Porträtserie", description: "Kreative Porträts mit Fokus auf Persönlichkeit und Ausdruck, die modern und authentisch inszeniert sind.", imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=600&fit=crop" },
        { id: 4, title: "Imagefilm & Business", description: "Ein visueller Auftritt, der Unternehmen, Marken und Produkte professionell präsentiert und Vertrauen schafft.", imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop" }
    ];

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % portfolioItems.length);
    const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + portfolioItems.length) % portfolioItems.length);
    const goToSlide = (index: number) => setCurrentIndex(index);

    useEffect(() => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrollY(currentScrollY);
            setIsScrolled(currentScrollY > window.innerHeight * 0.2);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
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

    const getSubtitleTransform = () => {
        if (windowSize.height === 0) return { transform: 'translateY(0px)', opacity: 1 };
        const progress = Math.min(scrollY / (windowSize.height * 0.3), 1);
        return { transform: `translateY(${-scrollY * 0.3}px)`, opacity: 1 - progress };
    };

    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }, []);

    const maxScroll = windowSize.height > 0 ? windowSize.height * 0.5 : 400;
    const minScale = windowSize.width < 768 ? 0.5 : 0.15;
    const scaleFactor = Math.max(minScale, 1 - scrollY / maxScroll);

    return (
        <>
            {/* Blue Light Gradient */}
            <div className="fixed top-[-50px] left-[-50px] w-180 h-180 pointer-events-none z-52" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0.1) 40%, transparent 70%)', filter: 'blur(10px)' }}></div>

            {/* Navbar */}
            <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                isMobile || isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "opacity-0 pointer-events-none"
            }`}>
                <div className="container mx-auto px-[2vw] py-[1.5vh] flex items-center justify-between z-49">
                    <h2 className="text-[clamp(1rem,2.5vw,1.5rem)] font-semibold">
                        <a href="#start" className="hover:text-blue-600 transition-colors"></a>
                    </h2>

                    {/* Desktop Navbar */}
                    <nav className="hidden md:flex items-center space-x-[2vw]">
                        <a href="#start" className="text-[clamp(0.75rem,1.2vw,1rem)] font-medium text-gray-700 hover:text-gray-900 transition-colors">Start</a>
                        <a href="#about" className="text-[clamp(0.75rem,1.2vw,1rem)] font-medium text-gray-700 hover:text-gray-900 transition-colors">Über mich</a>
                        <a href="#projects" className="text-[clamp(0.75rem,1.2vw,1rem)] font-medium text-gray-700 hover:text-gray-900 transition-colors">Projekte</a>
                        <a href="#contact" className="text-[clamp(0.75rem,1.2vw,1rem)] font-medium text-gray-700 hover:text-gray-900 transition-colors">Kontakt</a>
                    </nav>

                    {/* Mobile Burger Button */}
                    <div className="md:hidden text-white">
                        <button onClick={() => setBurgerOpen(!burgerOpen)} className="relative w-[6vw] h-[6vw] min-w-[24px] min-h-[24px]">
                            <Menu
                                className={`absolute inset-0 w-full h-full transition-all duration-300 ${
                                    burgerOpen ? "opacity-0 scale-0 rotate-90" : "opacity-100 scale-100 rotate-0"
                                }`}
                            />
                            <X
                                className={`absolute inset-0 w-full h-full transition-all duration-300 ${
                                    burgerOpen ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-0 -rotate-90"
                                }`}
                            />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden absolute top-full left-0 w-full bg-white shadow-lg flex flex-col items-center py-[3vh] space-y-[2vh] transition-all duration-500 ease-in-out
                    ${burgerOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"}`}
                >
                    <a href="#start" className="text-[clamp(1rem,4vw,1.25rem)] font-medium text-gray-700 hover:text-gray-900" onClick={() => setBurgerOpen(false)}>Start</a>
                    <a href="#about" className="text-[clamp(1rem,4vw,1.25rem)] font-medium text-gray-700 hover:text-gray-900" onClick={() => setBurgerOpen(false)}>Über mich</a>
                    <a href="#projects" className="text-[clamp(1rem,4vw,1.25rem)] font-medium text-gray-700 hover:text-gray-900" onClick={() => setBurgerOpen(false)}>Projekte</a>
                    <a href="#contact" className="text-[clamp(1rem,4vw,1.25rem)] font-medium text-gray-700 hover:text-gray-900" onClick={() => setBurgerOpen(false)}>Kontakt</a>
                </div>
            </div>

            <div className="flex flex-col justify-between px-[3vw] md:px-[5vw] mt-[5vh] text-[#ededed]">
                {/* Hero */}
                <h1
                    className={`sticky top-[1vh] font-bold transition-transform duration-200 ${
                        burgerOpen ? "opacity-0 pointer-events-none" : "z-51"
                    }`}
                    style={{
                        transform: `scale(${scaleFactor})`,
                        transformOrigin: "top left",
                        fontSize: isMobile ? "clamp(3rem, 12vw, 6rem)" : "clamp(6rem, 15vw, 12rem)"
                    }}
                >
                    Jelal Kasso
                </h1>

                {/* Mobile Profile Image */}
                <div className="w-full md:hidden mt-[3vh]">
                    <div className="w-full aspect-[0.7] border-[0.5vw] border-red-500 rounded-3xl bg-white shadow-lg overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                            <p className="text-gray-400 text-center text-[clamp(1rem,4vw,1.5rem)]">Profilbild</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-start justify-between gap-[4vw]">
                    <div className="flex-1">
                        <section id="start" className="relative">
                            <div className="transition-all duration-200 ease-out" style={getSubtitleTransform()}>
                                <p className="text-[clamp(1rem,2.5vw,1.75rem)] mt-[2vh]">Photographer | Videographer | Filmmaker</p>
                            </div>

                            <div className="mt-[3vh] md:mt-[5vh] flex transition-all duration-300">
                                <a href="https://www.instagram.com/jk_fotovideo/" target="_blank" rel="noopener noreferrer"
                                    className="group relative w-[clamp(3rem,8vw,4rem)] h-[clamp(3rem,8vw,4rem)] bg-gradient-to-br rounded-full flex items-center justify-center transition-all duration-300 shadow-lg border border-gray-500 hover:border-gray-300">
                                    <Image src="/instagram.svg" alt="Instagram" width={32} height={32} className="filter brightness-0 invert transition-transform duration-300 w-[50%] h-[50%]" />
                                </a>
                            </div>
                        </section>

                        {/* About */}
                        <section id="about" className="mt-[30vh] md:mt-[60vh]">
                            <div className="px-[2vw] md:px-[3vw]" style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
                                <h2 className="text-[clamp(2rem,6vw,5rem)] font-semibold mb-[2vh]">Über mich</h2>
                                <p className="text-[clamp(1rem,2.5vw,2.5rem)] max-w-full md:max-w-[80%] leading-relaxed">
                                    Hi, ich bin Jelal Kasso – leidenschaftlicher Fotograf und Videograf. Ich liebe es, besondere Momente einzufangen und Geschichten durch Bilder und Videos zu erzählen. Jedes Projekt ist für mich eine neue Gelegenheit, Kreativität mit Technik zu verbinden und einzigartige Erinnerungen zu schaffen.
                                </p>
                                <br/>
                                <p className="text-[clamp(0.875rem,2vw,1.875rem)] max-w-full md:max-w-[80%] text-gray-500 leading-relaxed">
                                    In den letzten Jahren durfte ich mit Menschen aus den unterschiedlichsten Bereichen arbeiten – von persönlichen Shootings über Hochzeiten bis hin zu kreativen Projekten und Events. Jedes Projekt ist für mich einzigartig, und ich lege großen Wert darauf, meine Arbeit individuell auf die Wünsche und Persönlichkeit meiner Kunden abzustimmen.
                                    <br/><br/>
                                    Mit Kreativität, technischer Präzision und einem Auge für Details schaffe ich Bilder und Videos, die nicht nur ästhetisch überzeugen, sondern auch Gefühle wecken. Mein Ziel ist es, Erinnerungen zu gestalten, die Menschen bewegen und eine Geschichte erzählen, die noch lange nachwirkt.
                                </p>
                            </div>
                        </section>
                    </div>

                    {/* Desktop Profile Image */}
                    <aside className="w-full md:w-[clamp(20rem,25vw,28rem)] mt-[3vh] md:mt-0 sticky top-[12vh] self-start z-40 hidden md:block">
                        <div className="w-full h-[clamp(25rem,40vh,35rem)] border-[0.4vw] border-red-500 rounded-3xl bg-white shadow-lg overflow-hidden">
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                                <p className="text-gray-400 text-center text-[clamp(1rem,1.5vw,1.5rem)]">Profilbild</p>
                            </div>
                        </div>
                    </aside>
                </div>

                {/* Portfolio */}
                <section id="projects" className="mt-[25vh] md:mt-[60vh] flex flex-col">
                    <div className="w-full px-[2vw] md:px-[3vw] py-[10vh]">
                        <h2 className="text-[clamp(2rem,6vw,5rem)] font-semibold mb-[8vh]">Portfolio</h2>
                        <div className="relative">
                            <div className="relative overflow-hidden rounded-[clamp(1.5rem,3vw,3rem)] shadow-2xl bg-white">
                                <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                                    {portfolioItems.map((item) => (
                                        <div key={item.id} className="min-w-full">
                                            <div className="flex flex-col h-full">
                                                <div className="w-full flex-1">
                                                    <div className="relative h-[50vh] md:h-[70vh] overflow-hidden">
                                                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                                                    </div>
                                                </div>
                                                <div className="w-full py-[3vh] md:py-[6vh] px-[4vw] md:px-[6vw]">
                                                    <h3 className="text-[clamp(1.5rem,4vw,3.5rem)] font-bold mb-[2vh]">{item.title}</h3>
                                                    <p className="text-[clamp(0.875rem,2vw,1.5rem)] text-gray-600 leading-relaxed">{item.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button onClick={prevSlide} className="absolute left-[1vw] md:left-[2vw] top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-[clamp(0.75rem,2vw,1.5rem)] rounded-full shadow-lg transition-all hover:scale-110 z-10">
                                <ChevronLeft className="w-[clamp(1rem,3vw,2rem)] h-[clamp(1rem,3vw,2rem)] text-gray-800" />
                            </button>
                            <button onClick={nextSlide} className="absolute right-[1vw] md:right-[2vw] top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-[clamp(0.75rem,2vw,1.5rem)] rounded-full shadow-lg transition-all hover:scale-110 z-10">
                                <ChevronRight className="w-[clamp(1rem,3vw,2rem)] h-[clamp(1rem,3vw,2rem)] text-gray-800" />
                            </button>

                            <div className="flex justify-center gap-[clamp(0.5rem,1vw,1rem)] mt-[3vh] md:mt-[4vh]">
                                {portfolioItems.map((_, index) => (
                                    <button key={index} onClick={() => goToSlide(index)}
                                        className={`cursor-pointer transition-all duration-300 rounded-full ${currentIndex === index ? 'w-[clamp(2rem,4vw,3rem)] h-[clamp(0.5rem,0.8vh,0.75rem)] bg-gray-800' : 'w-[clamp(0.5rem,0.8vh,0.75rem)] h-[clamp(0.5rem,0.8vh,0.75rem)] bg-gray-400 hover:bg-gray-600'}`} />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact */}
                <section id="contact" className="mt-[10vh]">
                    <div className="flex flex-col md:flex-row items-center px-[2vw] md:px-[3vw] py-[6vh] gap-[4vw] bg-gradient-to-b from-gray-50 to-gray-100">
                        <div className="w-full md:w-1/3">
                            <h2 className="text-[clamp(1.75rem,4.5vw,3.5rem)] font-bold mb-[2vh]">Lass uns zusammenarbeiten.</h2>
                            <p className="text-[clamp(0.875rem,1.5vw,1.25rem)] leading-relaxed">Ob für ein Shooting, ein Event oder ein individuelles Projekt – ich freue mich darauf, deine Ideen in Bildern und Videos zum Leben zu erwecken. Schreib mir einfach, und wir finden gemeinsam den passenden Weg.</p>
                        </div>
                        <div className="w-full md:w-2/3">
                            <div className="w-full max-w-[600px] p-[2vw] md:p-[3vw]">
                                <div className="mb-[2vh]">
                                    <label className="block text-gray-700 font-bold mb-[1vh] text-[clamp(0.875rem,1.5vw,1.125rem)]" htmlFor="name">Name*</label>
                                    <input
                                        className={`shadow appearance-none border ${errors.name ? 'border-red-500' : 'border'} rounded-2xl w-full p-[clamp(1rem,2vw,1.5rem)] text-[clamp(0.875rem,1.5vw,1.125rem)] text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                                        id="name" name="name" type="text" placeholder="Dein Name"
                                        value={formData.name} onChange={handleFormChange}
                                    />
                                    {errors.name && <p className="text-red-500 text-[clamp(0.75rem,1.2vw,0.875rem)] mt-[0.5vh]">{errors.name}</p>}
                                </div>
                                <div className="mb-[2vh]">
                                    <label className="block text-gray-700 font-bold mb-[1vh] text-[clamp(0.875rem,1.5vw,1.125rem)]" htmlFor="email">E-Mail*</label>
                                    <input
                                        className={`shadow appearance-none border ${errors.email ? 'border-red-500' : 'border'} rounded-2xl w-full p-[clamp(1rem,2vw,1.5rem)] text-[clamp(0.875rem,1.5vw,1.125rem)] text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                                        id="email" name="email" type="email" placeholder="deine@email.com"
                                        value={formData.email} onChange={handleFormChange}
                                    />
                                    {errors.email && <p className="text-red-500 text-[clamp(0.75rem,1.2vw,0.875rem)] mt-[0.5vh]">{errors.email}</p>}
                                </div>
                                <div className="mb-[2vh]">
                                    <label className="block text-gray-700 font-bold mb-[1vh] text-[clamp(0.875rem,1.5vw,1.125rem)]" htmlFor="message">Nachricht*</label>
                                    <textarea
                                        className={`shadow appearance-none border ${errors.message ? 'border-red-500' : 'border'} rounded-2xl w-full p-[clamp(1rem,2vw,1.5rem)] text-[clamp(0.875rem,1.5vw,1.125rem)] text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all`}
                                        id="message" name="message" rows={6} placeholder="Erzähl mir von deinem Projekt..."
                                        value={formData.message} onChange={handleFormChange}
                                    ></textarea>
                                    {errors.message && <p className="text-red-500 text-[clamp(0.75rem,1.2vw,0.875rem)] mt-[0.5vh]">{errors.message}</p>}
                                </div>
                                <div className="flex items-center justify-between">
                                    <button onClick={sendEmail} disabled={isSubmitting}
                                        className="bg-[#2758a8] hover:bg-[#2b64c2] text-white font-bold px-[clamp(1.5rem,3vw,2.5rem)] py-[clamp(0.75rem,1.5vh,1.25rem)] text-[clamp(0.875rem,1.5vw,1.125rem)] rounded-xl transition-all duration-270 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(39,88,168,0.5)]">
                                        {isSubmitting ? 'Wird gesendet...' : 'Senden'}
                                    </button>
                                </div>
                                {submitStatus === 'success' && <div className="mt-[2vh] p-[2vh] bg-green-100 border border-green-500 rounded-lg text-green-700 text-[clamp(0.875rem,1.5vw,1.125rem)]">Nachricht erfolgreich gesendet! ✓</div>}
                                {submitStatus === 'error' && <div className="mt-[2vh] p-[2vh] bg-red-100 border border-red-500 rounded-lg text-red-700 text-[clamp(0.875rem,1.5vw,1.125rem)]">Fehler beim Senden. Bitte versuche es erneut.</div>}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}