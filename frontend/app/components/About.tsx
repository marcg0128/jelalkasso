import BlurText from "@/components/BlurText";

export default function About() {

    return (
        <div className="w-1/2 h-[100vh] px-47 mb-30 mt-60 ml-[50%]">
            <h1 className="text-5xl font-bold">Über mich</h1>
            <BlurText
                text="Hallo, ich bin Jelal – Fotograf und Videograf für Unternehmen und besondere Events."
                delay={50}
                animateBy="words"
                direction="bottom"
                className="text-[1.3vw] text-[#EAEAEA]/85  mt-16 leading-relaxed font-semibold"
            />

            <BlurText
                text="In meiner Arbeit verbinde ich Kreativität mit technischem Know-how und einem Gespür für Details. Ob Imagefilme, Eventdokumentationen oder Content für Social Media – mein Ziel ist es, visuelle Inhalte zu schaffen, die Emotionen wecken, Vertrauen aufbauen und langfristig wirken."
                delay={100}
                animateBy="words"
                direction="bottom"
                className="text-[1.3vw] text-[#EAEAEA]/50  mt-9 leading-relaxed font-semibold"
            />


        </div>
    );

}