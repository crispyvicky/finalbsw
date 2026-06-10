import { Button } from "../../components/ui/button";

export const About = (): JSX.Element => {
    return (
        <div className="w-full bg-white overflow-hidden">
            {/* Hero Section with Parallax-like fixed background */}
            <div
                className="relative w-full h-[80vh] flex items-center justify-center bg-fixed bg-cover bg-center"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=2727&auto=format&fit=crop")' }}
            >
                <div className="absolute inset-0 bg-black/50" /> {/* Overlay for text visibility */}
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <span className="block text-white/90 tracking-[0.4em] text-sm md:text-base mb-6 font-light animate-fade-in">
                        ESTABLISHED 1996
                    </span>
                    <h1 className="font-heading-01 text-5xl md:text-8xl text-white mb-8 animate-fade-up">
                        BSW INTERIORS
                    </h1>
                    <p className="font-body-01 text-xl text-gray-200 tracking-wide font-light max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
                        Crafting legacies through timeless interior design.
                    </p>
                </div>
            </div>

            {/* "Flyover" Metaphor Section - Creative Layout */}
            <div className="container mx-auto py-24 px-4 md:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    <div className="lg:w-1/2 relative group">
                        {/* Image Composition */}
                        <div className="relative z-10 overflow-hidden rounded-tr-[100px] shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
                            <img
                                src="https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=1920&auto=format&fit=crop"
                                alt="High rise architecture"
                                className="w-full h-[600px] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                        </div>
                        {/* Decorative Element */}
                        <div className="absolute -bottom-10 -left-10 w-full h-full border-2 border-primary-01/10 rounded-tr-[100px] z-0 hidden md:block"></div>
                    </div>

                    <div className="lg:w-1/2 space-y-8">
                        <h2 className="font-heading-02 text-4xl md:text-6xl text-primary-01 leading-tight">
                            "I am taking a flyover because I want to reach life at a high point."
                        </h2>
                        <div className="w-32 h-1 bg-primary-01 opacity-20"></div>
                        <p className="font-body-01 text-lg text-secondary-01 leading-relaxed">
                            This philosophy drives everything we do at BSW  Interiors. Founded in 1996 in Hyderabad, our journey is not just about decorating rooms; it's about elevating lifestyles. We believe that every space should be a vantage point—a place where you feel at the peak of comfort, style, and inspiration.
                        </p>
                        <p className="font-body-01 text-lg text-secondary-01 leading-relaxed">
                            BSW  stands for <strong>BSW INTERIORS</strong>. For nearly 30 years, our family of artisans has blended traditional Indian craftsmanship with modern design sensibilities.
                        </p>
                    </div>
                </div>
            </div>

            {/* Heritage/Roots Section - Dark Background */}
            <div className="w-full bg-primary-01 text-white py-32 px-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 transform origin-top-right"></div>

                <div className="container mx-auto relative z-10 flex flex-col items-center justify-center text-center gap-12">
                    <div className="w-full max-w-4xl">
                        <h3 className="font-heading-04 text-4xl md:text-5xl mb-6 italic text-[#d4af37]">
                            "Om Vishwakarmaiah Namoh Namaha"
                        </h3>
                        <p className="font-label-medium text-gray-400 tracking-widest text-sm uppercase mb-8">
                            HONORING THE DIVINE ARCHITECT
                        </p>
                        <p className="font-body-01 text-lg text-gray-300 leading-relaxed mx-auto">
                            Our roots are deeply embedded in the creative spirit. We approach every project with reverence for the craft, ensuring that every line drawn and every material chosen honors the art of making.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
