import { useState, useRef, useEffect } from 'react';

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activePath, setActivePath] = useState('#about');
    const [indicatorStyle, setIndicatorStyle] = useState({});
    const navRef = useRef<HTMLDivElement>(null);

    const menuItems = [
        { href: '#about', label: 'Über uns' },
        { href: '#portfolio', label: 'Portfolio' },
        { href: '#reviews', label: 'Bewertungen' },
        { href: '#contact', label: 'Kontakt' }
    ];

    useEffect(() => {
        const updateIndicator = () => {
            if (navRef.current) {
                const activeLink = navRef.current.querySelector(`a[href="${activePath}"]`) as HTMLElement;
                if (activeLink) {
                    const { offsetLeft, offsetWidth } = activeLink;
                    setIndicatorStyle({
                        left: `${offsetLeft}px`,
                        width: `${offsetWidth}px`
                    });
                }
            }
        };

        updateIndicator();
        window.addEventListener('resize', updateIndicator);
        return () => window.removeEventListener('resize', updateIndicator);
    }, [activePath]);

    // #AF8A3A

    return (
        <nav className="px-6 py-3 bg-white/90 text-black rounded-[64px] backdrop-blur-sm">
            {/* Desktop Menu */}
            <div className="hidden md:block relative" ref={navRef}>
                {/* Animated Background Indicator */}
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

            {/* Mobile Menu Button */}
            <div className="md:hidden flex justify-end gap-8 text-2xl">
                Menu
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative w-8 h-8 flex flex-col justify-center items-center"
                    aria-label="Menu"
                >
                    <span
                        className={`block w-6 h-0.5 bg-black transition-all duration-300 absolute ${
                            isOpen ? 'rotate-45' : '-translate-y-2'
                        }`}
                    />
                    <span
                        className={`block w-6 h-0.5 bg-black transition-all duration-300 ${
                            isOpen ? 'opacity-0' : 'opacity-100'
                        }`}
                    />
                    <span
                        className={`block w-6 h-0.5 bg-black transition-all duration-300 absolute ${
                            isOpen ? '-rotate-45' : 'translate-y-2'
                        }`}
                    />
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                }`}
            >
                <ul className="flex flex-col gap-4 text-2xl">
                    {menuItems.map((item) => (
                        <li key={item.href} className="border-t border-black/10 pt-4">
                            <a
                                href={item.href}
                                onClick={() => {
                                    setIsOpen(false);
                                    setActivePath(item.href);
                                }}
                                className={`block px-4 py-4 rounded-2xl transition-all duration-300 ${
                                    activePath === item.href 
                                        ? 'bg-[#AF8A3A]' : ''
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