
"use client";
import Image from "next/image";
import { useState } from "react";

export default function Start() {
    const [hover, setHover] = useState(false);

    const titleStyle = (delay: number) => ({
        opacity: hover ? 1 : 0,
        transform: hover ? "translateY(0px)" : "translateY(20px)",
        transition: `all 0.4s ease ${delay}s`
    });
    return (
        <div className="w-full h-screen px-47">
            {/*aligns perfect with the title "Jelal Kasso"*/}

            <div className="min-h-screen md:flex flex-col  items-center justify-center mt-10 relative">

                <div className="self-start flex items-start justify-between w-full  ">
                    <div className="bg-[#1C1C1C] max-w-80 p-5 h-auto flex flex-col items-center justify-center rounded-4xl translate-y-13">
                        <Image
                            src="/images/start_foto_sub.jpeg"
                            alt="Jelal Kasso Logo"
                            width={300}
                            height={150}
                            className="object-contain rounded-2xl"
                        />

                        <div>
                            <p className="text-[1.2vw] text-[#EAEAEA]/85  mt-3">Ich erschaffe Bilder & Videos, die Marken bewegen.  </p>
                        </div>
                    </div>
                    <div className="self-end ml-10 max-w-xs translate-y-7">
                        <p className="text-3xl  text-white">
                            Meine Mission ist es, mit Fotografie und Film Emotionen zu wecken, Geschichten zu erzählen
                            und Erinnerungen zu schaffen, die bleiben.
                        </p>
                    </div>
                </div>

                 <div
                    style={{ display: "inline-block", cursor: "pointer" }}
                >


                    <div className=" self-start px-3 translate-y-15">
                        <p className="text-[1.8vw] text-[#EAEAEA]/85" style={titleStyle(0.1)}>Fotograf</p>
                        <p className="text-[1.8vw] text-[#EAEAEA]/75" style={titleStyle(0.2)}>Videograf</p>
                        <p className="text-[1.8vw] text-[#EAEAEA]/55" style={titleStyle(0.3)}>Editer</p>
                    </div>
                     <h1 className="leading-[0.9] mt-17" style={{ fontSize: "12vw", fontWeight: "bold", marginBottom: "1rem" }}
                         onMouseEnter={() => setHover(true)}
                         onMouseLeave={() => setHover(false)}>
                        Jelal&nbsp;&nbsp;&nbsp;&nbsp;Kasso
                    </h1>
                </div>

            </div>

        </div>

    );
}