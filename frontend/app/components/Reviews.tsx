import Image from "next/image";
import { useRef, useState } from "react";

function ReviewCard({ reviewer, redirectUrl, media }: { reviewer: string; redirectUrl?: string,  media?: string }) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (!videoRef.current) return;

        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const redirectTo = () => {
        if (redirectUrl) {
            window.open(redirectUrl, '_blank');
        }
    };

    return (
        <div className={`relative rounded-4xl shadow-md overflow-hidden h-[65vh] w-full ${
            redirectUrl ? 'hover:cursor-pointer' : ''
        }`}
            onClick={() => redirectTo()}
        >

            {media && (media.endsWith('.mp4') || media.endsWith('.MOV'))  && (
                <>
                    <video
                        ref={videoRef}
                        className="absolute inset-0 w-full h-full object-cover"
                        controls={false}
                        playsInline
                        onEnded={() => setIsPlaying(false)}
                    >
                        <source src={media} type="video/mp4" />
                    </video>

                    {/* Custom Play/Pause Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();   // verhindert Redirect
                            togglePlay();
                        }}
                        className="absolute bottom-3 right-0 z-50 -translate-x-1/2 bg-black/50 px-6 py-3 rounded-full backdrop-blur-md hover:bg-black/70 transition-colors hover:cursor-pointer"
                    >
                        {!isPlaying && (
                            <Image src="/icons/spielen.svg" alt="Play" width={20} height={20} />
                        )}
                        {isPlaying && (
                            <Image src="/icons/pause.svg" alt="Pause" width={20} height={20} />
                        )}
                    </button>
                </>
            )}


            {/*shadow gradient*/}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/70 to-transparent z-40"></div>

            <div className="absolute bottom-4 left-4 text-[#EAEAEA] text-xl font-semibold drop-shadow-lg z-50">
                {reviewer}
            </div>
        </div>
    );
}



function ReviewsLoop() {
    return (
        <div className="overflow-hidden py-10">
            <div className="flex w-max animate-marquee gap-8">
                {reviews.map((review, index) => (
                    <div key={index} className="w-[500px] flex-shrink-0">
                        <ReviewCard
                            reviewer={review.reviewer}
                            redirectUrl={review.redirect || undefined}
                            media={review.media || undefined}
                        />
                    </div>
                ))}

                {/* zweite Kopie für nahtlosen Loop */}
                {reviews.map((review, index) => (
                    <div key={`dup-${index}`} className="w-[500px] flex-shrink-0">
                        <ReviewCard
                            reviewer={review.reviewer}
                            redirectUrl={review.redirect || undefined}
                            media={review.media || undefined}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}



const reviews = [
    {
        reviewer: "Erik J.",
        media: "/images/reviews/Kopie%20von%20Erik%20Jäger.mp4",
        redirect: null
    },
    {
        reviewer: "Duft Paradies",
        media: "/images/reviews/Kopie%20von%20DuftParadies.mp4",
        redirect: "https://www.duftparadies.online/"
    },
    {
        reviewer: "Kilian Fürstle",
        media: "/images/reviews/Kilian%20Fürstle.MOV",
        redirect: null
    },
    {
        reviewer: "Sarah Lieblich",
        media: "/images/reviews/Sarah Lieblich.mp4",
        redirect: null

    }

    // Additional reviews can be added here
];

export default function Reviews() {
    return (
        <div className="">
            <h2 className="text-4xl font-bold mb-8 ml-47">Feedback</h2>
            <ReviewsLoop />
        </div>
    );
}
