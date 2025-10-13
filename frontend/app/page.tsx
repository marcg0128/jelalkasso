'use client';
import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import {motion, useAnimation} from "framer-motion";
import {ChevronLeft, ChevronRight, Instagram, Menu, X, ArrowUpRight} from 'lucide-react';
import {useInView} from "react-intersection-observer";

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

const navItems = [
    {id: "about", label: "Über mich"},
    {id: "portfolio", label: "Portfolio"},
];

const navItemsRight = [

    {id: "speaking", label: "Speaking"},
    {id: "contact", label: "Kontakt"},
];

export default function Home() {
    const [scrollY, setScrollY] = useState(0);
    const [formData, setFormData] = useState({name: '', email: '', message: ''});
    const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [active, setActive] = useState("home");
    const [menuOpen, setMenuOpen] = useState(false);

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

    const calcLogoSizeWidth = () => {
        if (windowWidth < 640) return 140;
        if (windowWidth < 1024) return scrollY > 800 ? 100 : 180;
        return scrollY > 800 ? 120 : 220;
    };

    const calcLogoSizeHeight = () => {
        if (windowWidth < 640) return  200;
        if (windowWidth < 1024) return scrollY > 800 ? 120 : 260;
        return scrollY > 800 ? 150 : 330;
    };

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
            <div className="nav">
                <nav className="bg-black w-full fixed top-0 left-0 z-50 flex items-center justify-center
                px-6 py-10 md:py-3 shadow-md transition-all duration-500 ease-in-out">


                    <div className="flex items-center w-full max-w-5xl justify-center relative mb-8">

                        {/* Desktop Menu */}
                        <ul className={`hidden md:flex relative items-center gap-12 text-white font-medium transition-all duration-500 ease-in-out ${scrollY > 800 ? 'md:mt-5' : 'md:mt-40'}`}>
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
                                                transition={{type: "spring", stiffness: 300, damping: 25}}
                                            />
                                        )}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        {/* Logo */}
                        <div className={`absolute top-[-8rem] left-1/2 pointer-events-auto transition-transform duration-500 ease-in-out
                                        ${scrollY > 800 ? '-translate-x-1/2 translate-y-6 md:-translate-x-[40em] md:translate-y-15' : '-translate-x-1/2 translate-y-6 md:translate-y-0'}`}
                             onClick={() => scrollToSection("home")}
                             style={{cursor: "pointer"}}
                        >
                            <Image
                                src={"/logo.svg"}
                                alt="logo"
                                className="filter brightness-0 invert h-auto pointer-events-none transition-all duration-500 ease-in-out"
                                width={calcLogoSizeWidth()}
                                height={calcLogoSizeHeight()}
                                priority
                            />
                        </div>


                        {/* Desktop Right Menu */}
                        <ul className={`hidden md:flex relative items-center gap-12 text-white font-medium ml-[43px] transition-all duration-500 ease-in-out ${scrollY > 800 ? 'md:mt-5' : 'md:mt-40'}`}>
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
                                                transition={{type: "spring", stiffness: 300, damping: 25}}
                                            />
                                        )}
                                    </a>
                                </li>
                            ))}
                        </ul>


                        {/* Mobile Burger */}
                        <div className="md:hidden absolute right-6 top-6 z-50">
                            <button onClick={() => setMenuOpen(!menuOpen)} className="-translate-y-4">
                                {menuOpen ? <X className="text-white w-8 h-8"/> :
                                    <Menu className="text-white w-8 h-8"/>}
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div
                        className="md:hidden fixed top-20 left-0 w-full bg-black text-white z-40 flex flex-col items-center py-6 gap-6">
                        {navItems.concat(navItemsRight).map(item => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                onClick={() => {
                                    setActive(item.id);
                                    setMenuOpen(false);
                                }}
                                className="text-2xl font-semibold"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                )}
            </div>

            {/* Intro */}
            <div id="intro"
                 className="min-h-screen flex flex-col items-center justify-center bg-white text-black px-6 py-20">
                <p className="text-4xl md:text-6xl text-center mb-4">Video</p>
                <div className="fixed bottom-8 right-8 z-40">
                    <a
                        href="https://www.instagram.com/jk_fotovideo/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative w-16 h-16 z-50 backdrop-blur-md bg-white/10 rounded-full flex items-center justify-center transition-all duration-300 border-0 hover:shadow-xl hover:ring-2 hover:ring-white/30 active:scale-95 before:absolute before:inset-[-10px] before:rounded-full before:backdrop-blur-sm before:-z-10"
                    >
                        <Instagram
                            width={32}
                            height={32}
                            className="text-white transition-transform duration-300 mix-blend-difference"
                        />
                    </a>
                </div>
            </div>

            {/* Über mich */}
            <div id="about" className="mb-20"></div>
            <section className="min-h-screen flex flex-col items-center px-6 py-20">
                <FadeInWhenVisible direction="up">
                    <h1 className="text-4xl md:text-6xl mb-8 ">Über mich</h1>
                </FadeInWhenVisible>
                <FadeInWhenVisible direction="up">
                    <p className="text-xl md:text-4xl max-w-3xl ">
                        Hi, ich bin Jelal Kasso – leidenschaftlicher Fotograf und Videograf. Ich liebe es, besondere
                        Momente einzufangen und Geschichten durch Bilder und Videos zu erzählen. Jedes Projekt ist für
                        mich eine neue Gelegenheit, Kreativität mit Technik zu verbinden und einzigartige Erinnerungen
                        zu schaffen.
                    </p>
                </FadeInWhenVisible>
                <FadeInWhenVisible direction="up">
                    <p className="text-lg md:text-3xl max-w-3xl text-gray-500 mt-8 ">
                        In den letzten Jahren durfte ich mit Menschen aus den unterschiedlichsten Bereichen arbeiten –
                        von persönlichen Shootings über Hochzeiten bis hin zu kreativen Projekten und Events. Jedes
                        Projekt ist für mich einzigartig, und ich lege großen Wert darauf, meine Arbeit individuell auf
                        die Wünsche und Persönlichkeit meiner Kunden abzustimmen.
                        <br/><br/>
                        Mit Kreativität, technischer Präzision und einem Auge für Details schaffe ich Bilder und Videos,
                        die nicht nur ästhetisch überzeugen, sondern auch Gefühle wecken. Mein Ziel ist es, Erinnerungen
                        zu gestalten, die Menschen bewegen und eine Geschichte erzählen, die noch lange nachwirkt.
                    </p>
                </FadeInWhenVisible>
            </section>

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


            <div id="speaking" className="mb-8"></div>

            <section className="min-h-screen flex flex-col items-center px-6 py-20">
                <FadeInWhenVisible direction="left">
                    <h1 className="text-4xl md:text-6xl mb-8 text-center">Speaking & Workshops</h1>
                </FadeInWhenVisible>
                <FadeInWhenVisible direction="right">
                    <p className="text-lg md:text-4xl max-w-6xl text-center">
                        Fotografie und Videografie sind für mich nicht nur ein Beruf, sondern auch eine Leidenschaft,
                        die ich gerne mit anderen teile. Neben meiner Arbeit an Projekten halte ich regelmäßig Vorträge
                        und Workshops, in denen ich mein Wissen und meine Erfahrungen weitergebe. Dabei geht es um
                        Themen wie Bildgestaltung, Storytelling mit der Kamera, den kreativen Prozess hinter einem
                        Projekt sowie den Einsatz moderner Technik und Tools.
                        <br/><br/>
                        Mir ist es wichtig, nicht nur theoretisches Wissen zu vermitteln, sondern auch praktische
                        Einblicke zu geben, die sofort angewendet werden können. Ob in kleinen Gruppen, bei Events oder
                        in individuellen Sessions – mein Ziel ist es, Menschen zu inspirieren, ihre eigene Kreativität
                        zu entdecken und neue Wege in der Fotografie und Videografie zu gehen.
                    </p>
                </FadeInWhenVisible>
            </section>

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
                                        className="bg-white/10 hover:bg-gray-900 text-white font-bold p-3 px-6 rounded-xl focus:outline-none focus:shadow-outline transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
