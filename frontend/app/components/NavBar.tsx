import { useState, useRef, useEffect } from 'react';

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activePath, setActivePath] = useState('#about');
    const [indicatorStyle, setIndicatorStyle] = useState({});
    const navRef = useRef<HTMLDivElement>(null);

    const menuItems = [
        { href: '#about', label: 'Über uns' },
        { href: '#portfolio', label: 'Portfolio' },
        { href: '#achievsment', label: 'Erfolg' },
        { href: '#feedback', label: 'Feedback' },
        { href: '#contact', label: 'Kontakt' }
    ];

    useEffect(() => {
        const updateIndicator = () => {
            if (navRef.current) {
                const activeLink = navRef.current.querySelector(
                    `a[href="${activePath}"]`
                ) as HTMLElement;

                if (activeLink) {
                    setIndicatorStyle({
                        left: `${activeLink.offsetLeft}px`,
                        width: `${activeLink.offsetWidth}px`
                    });
                }
            }
        };

        updateIndicator();
        window.addEventListener('resize', updateIndicator);
        return () => window.removeEventListener('resize', updateIndicator);
    }, [activePath]);

    return (
        <nav className="relative px-6 py-3 bg-white/80 text-black rounded-[64px] backdrop-blur-xl">
            {/* Desktop Menu */}
            <div className="hidden md:block relative" ref={navRef}>
                <div
                    className="absolute top-0 h-full bg-[#DAA520] rounded-4xl transition-all duration-500 ease-out"
                    style={indicatorStyle}
                />

                <ul className="relative flex items-center justify-between gap-8 text-2xl">
                    {menuItems.map((item) => (
                        <li key={item.href}>
                            <a
                                href={item.href}
                                onClick={() => setActivePath(item.href)}
                                className="relative z-10 block px-4 py-4 transition-colors duration-300"
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Mobile Header */}
            <div className="md:hidden flex justify-between items-center text-2xl">
                <span>Menu</span>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative w-8 h-8 flex items-center justify-center"
                    aria-label="Menu"
                >
                    <span
                        className={`absolute block w-6 h-0.5 bg-black transition-all duration-300 ${
                            isOpen ? 'rotate-45' : '-translate-y-2'
                        }`}
                    />
                    <span
                        className={`block w-6 h-0.5 bg-black transition-all duration-300 ${
                            isOpen ? 'opacity-0' : 'opacity-100'
                        }`}
                    />
                    <span
                        className={`absolute block w-6 h-0.5 bg-black transition-all duration-300 ${
                            isOpen ? '-rotate-45' : 'translate-y-2'
                        }`}
                    />
                </button>
            </div>

            {/* Mobile Menu */}
            <div
    className={`md:hidden absolute  -translate-x-[50%] top-full mt-4 w-[70vw] max-w-[600px] bg-white/95 rounded-3xl overflow-hidden transition-all duration-300 ease-in-out${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
    }`}
>

                <ul className="flex flex-col gap-4 text-2xl p-4">
                    {menuItems.map((item) => (
                        <li key={item.href}>
                            <a
                                href={item.href}
                                onClick={() => {
                                    setIsOpen(false);
                                    setActivePath(item.href);
                                }}
                                className={`block px-4 py-4 rounded-2xl transition-all duration-300 ${
                                    activePath === item.href
                                        ? 'bg-[#AF8A3A]'
                                        : ''
                                }`}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
