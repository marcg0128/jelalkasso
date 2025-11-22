import Image from "next/image";

function ReviewCard({ reviewer, rating, comment, media }: { reviewer: string; rating: number; comment: string; media?: string }) {
    return (
        <div className="bg-[#1C1C1C] p-6 rounded-4xl shadow-md ">
            <div className="flex items-center mb-2">
                {Array.from({ length: 5 }, (_, index) => (
                    <svg
                        key={index}
                        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-600'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.462a1 1 0 00-.364 1.118l1.286 3.974c.3.921-.755 1.688-1.54 1.118l-3.39-2.462a1 1 0 00-1.176 0l-3.39 2.462c-.784.57-1.838-.197-1.539-1.118l1.286-3.974a1 1 0 00-.364-1.118L2.034 9.4c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.974z" />
                    </svg>
                ))}
            </div>
            <h3 className="text-xl font-semibold mb-4">{reviewer}</h3>
            <p className="text-gray-300">{comment}</p>

            {media && media.endsWith('.mp4') && (
                <div className="bottom-4 mt-4 flex justify-center">
                    <video controls className="w-[50%] rounded-4xl">
                        <source src={media} type="video/mp4" />
                    </video>
                </div>
            )}

            {media && media.endsWith('.png') && (
                <div className=" mt-4 flex justify-center ">
                    <Image
                        src={media}
                        alt={`Media for review by ${reviewer}`}
                        width={500}
                        height={300}
                        className="w-[50%] rounded-4xl"
                    />
                </div>
            )}

        </div>
    );
}

function ReviewsLoop() {
    return (
        <div className="overflow-hidden py-10">
            <div className="flex w-max animate-marquee gap-8">
                {reviews.map((review, index) => (
                    <div key={index} className="w-[280px] flex-shrink-0">
                        <ReviewCard
                            reviewer={review.reviewer}
                            rating={review.rating}
                            comment={review.comment}
                            media={review.media || undefined}
                        />
                    </div>
                ))}

                {/* zweite Kopie für nahtlosen Loop */}
                {reviews.map((review, index) => (
                    <div key={`dup-${index}`} className="w-[500px] flex-shrink-0">
                        <ReviewCard
                            reviewer={review.reviewer}
                            rating={review.rating}
                            comment={review.comment}
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
        reviewer: "Anna S.",
        rating: 5,
        comment: "Jelal hat fantastische Arbeit geleistet! Die Fotos sind atemberaubend und haben unsere Erwartungen übertroffen.",
        media: "/images/reviews/Kopie%20von%20Erik%20Jäger.mp4"
    },
    {
        reviewer: "Markus T.",
        rating: 4,
        comment: "Sehr professionell und kreativ. Die Zusammenarbeit war angenehm und das Ergebnis spricht für sich.",
        media: "/images/reviews/5.png"
    },
    {
        reviewer: "Sophie L.",
        rating: 5,
        comment: "Ich bin begeistert von den Videos, die Jelal für unser Unternehmen erstellt hat. Absolut empfehlenswert!",
        media: null
    },
    {
        reviewer: "Lukas M.",
        rating: 4,
        comment: "Die Fotosession war super entspannt und die Ergebnisse sind großartig. Vielen Dank, Jelal!",
        media: null
    },
    {
        reviewer: "Maria K.",
        rating: 5,
        comment: "Jelal versteht es, Emotionen einzufangen und Geschichten zu erzählen. Ich bin sehr zufrieden mit den Ergebnissen.",
        media: null

    },
    {
        reviewer: "Tom H.",
        rating: 5,
        comment: "Professionell, kreativ und zuverlässig. Jelal hat unsere Erwartungen übertroffen!",
        media: null
    }

    // Additional reviews can be added here
];

export default function Reviews() {
    return (
        <div className="">
            <h2 className="text-4xl font-bold mb-8 ml-47">Kundenbewertungen</h2>
            <ReviewsLoop />
        </div>
    );
}
