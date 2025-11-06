import { useState } from 'react';

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="px-6 py-4 bg-white/60 text-black rounded-4xl backdrop-blur-md">
            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center justify-between gap-8 text-2xl">
                <li><a href="/about">Über uns</a></li>
                <li><a href="/portfolio">Portfolio</a></li>
                <li><a href="/reviews">Bewertungen</a></li>
                <li><a href="/contact">Kontakt</a></li>
            </ul>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex justify-end gap-8  text-2xl">
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
                    <li className="border-t border-black/10 pt-4">
                        <a href="/about" onClick={() => setIsOpen(false)}>Über uns</a>
                    </li>
                    <li className="border-t border-black/10 pt-4">
                        <a href="/portfolio" onClick={() => setIsOpen(false)}>Portfolio</a>
                    </li>
                    <li className="border-t border-black/10 pt-4">
                        <a href="/reviews" onClick={() => setIsOpen(false)}>Bewertungen</a>
                    </li>
                    <li className="border-t border-black/10 pt-4">
                        <a href="/contact" onClick={() => setIsOpen(false)}>Kontakt</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}