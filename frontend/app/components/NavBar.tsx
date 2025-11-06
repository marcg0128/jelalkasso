export default function NavBar() {
    return (
        <nav className="px-6 py-4 bg-white/60 text-black rounded-4xl backdrop-blur-md">
            <ul className="flex items-center justify-between gap-8 text-2xl ">
                <li><a href="/about">Über uns</a></li>
                <li><a href="/about">Portfolio</a></li>
                <li><a href="/about">Bewertungen</a></li>
                <li><a href="/about">Kontakt</a></li>
            </ul>
        </nav>
    );
}