function ReviewCard({ reviewer, rating, comment }: { reviewer: string; rating: number; comment: string }) {
    return (
        <div className="bg-[#1C1C1C] p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{reviewer}</h3>
            <div className="flex items-center mb-4">
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
            <p className="text-gray-300">{comment}</p>
        </div>
    );
}

export default function Reviews() {
    return (
        <div className="">
            <h2 className="text-4xl font-bold mb-8 ml-47">Kundenbewertungen</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-47">
                {/* Review 1 */}
                <ReviewCard
                    reviewer="Anna S."
                    rating={5}
                    comment="Jelal hat fantastische Arbeit geleistet! Die Fotos sind atemberaubend und haben unsere Erwartungen übertroffen."
                />
                {/* Review 2 */}
                <ReviewCard
                    reviewer="Markus T."
                    rating={4}
                    comment="Sehr professionell und kreativ. Die Zusammenarbeit war angenehm und das Ergebnis spricht für sich."
                />
                {/* Review 3 */}
                <ReviewCard
                    reviewer="Sophie L."
                    rating={5}
                    comment="Ich bin begeistert von den Videos, die Jelal für unser Unternehmen erstellt hat. Absolut empfehlenswert!"
                />

                {/* Additional reviews can be added here */}
            </div>
        </div>
    );

}