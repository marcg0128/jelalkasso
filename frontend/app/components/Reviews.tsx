import Image from "next/image";
import { useRef, useState } from "react";
import { useResponsiveNumber } from "@/app/useResponsiveNumber";
import { ChevronLeft, ChevronRight } from "lucide-react";

function ReviewCard({ reviewer, redirectUrl, media }: { reviewer: string; redirectUrl?: string, media?: string }) {
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
        <div className={`relative rounded-4xl shadow-md overflow-hidden h-[65vh] w-full ${redirectUrl ? 'hover:cursor-pointer' : ''
            }`}
            onClick={() => redirectTo()}
        >

            {media && (media.endsWith('.mp4') || media.endsWith('.MOV')) && (
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

function MobileReviewsCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
    };

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="relative">
            {/* Review Card */}
            <ReviewCard
                key={currentIndex}
                reviewer={reviews[currentIndex].reviewer}
                redirectUrl={reviews[currentIndex].redirect || undefined}
                media={reviews[currentIndex].media || undefined}
            />

            {/* Back Button - overlayed on video */}
            <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black/70 transition-colors z-50"
                aria-label="Previous review"
            >
                <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            {/* Next Button - overlayed on video */}
            <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black/70 transition-colors z-50"
                aria-label="Next review"
            >
                <ChevronRight className="w-6 h-6 text-white" />
            </button>
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
        <div className="px-4 md:px-0">
            <h2 className="text-5xl font-bold mb-8 md:ml-47">Feedback</h2>
            {useResponsiveNumber(1, 2) === 2 && (
                <ReviewsLoop />
            )}
            {useResponsiveNumber(1, 2) === 1 && (
                <MobileReviewsCarousel />
            )}

        </div>
    );
}