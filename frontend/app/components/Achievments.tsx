import Image from 'next/image';
import VariableProximity from "@/components/VariableProximity";
import React from "react";
import { useRef } from "react";

function AchievmentsCards() {

}


export default function Achievments() {
    const containerRef = useRef<HTMLElement | null>(null);


    return (
        <div className="px-47 mb-50   ">
            <h1 className="text-5xl font-bold mb-8">Erfolge</h1>
            <div
                ref={containerRef}
                className="relative gap-10 text-6xl font-extralight cursor-default"
            >
                <VariableProximity
                    label={'+ 10 Millionen Views erzeugt'}
                    className={'variable-proximity-demo'}
                    fromFontVariationSettings="'wght' 200, 'opsz' 9"
                    toFontVariationSettings="'wght' 800, 'opsz' 40"
                    containerRef={containerRef as React.RefObject<HTMLElement>}
                    radius={200}
                    falloff='exponential'
                />
            </div>

        </div>
    );
}