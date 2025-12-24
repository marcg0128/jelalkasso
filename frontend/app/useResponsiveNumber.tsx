import { useEffect, useState } from "react";

export function useResponsiveNumber(mobile: number, desktop: number) {
    const mediaQuery = "(max-width: 767px)";
    const [value, setValue] = useState<number>(
        window.matchMedia(mediaQuery).matches ? mobile : desktop
    );

    useEffect(() => {
        const mql = window.matchMedia(mediaQuery);

        const onChange = (e: MediaQueryListEvent) => {
            setValue(e.matches ? mobile : desktop);
        };

        mql.addEventListener("change", onChange);

        return () => {
            mql.removeEventListener("change", onChange);
        };
    }, [mobile, desktop]);

    return value;
}
