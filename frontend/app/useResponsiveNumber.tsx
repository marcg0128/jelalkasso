import { useEffect, useState } from "react";

export function useResponsiveNumber(mobile: number, desktop: number) {
    const mediaQuery = "(max-width: 767px)";
    const [value, setValue] = useState<number>(desktop);

    useEffect(() => {
        const mql = window.matchMedia(mediaQuery);

        const update = () => {
            setValue(mql.matches ? mobile : desktop);
        };

        update();
        mql.addEventListener("change", update);

        return () => {
            mql.removeEventListener("change", update);
        };
    }, [mobile, desktop]);

    return value;
}
