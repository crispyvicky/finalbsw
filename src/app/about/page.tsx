
import { Button } from "@/components/ui/button";

export default function About() {
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
                        ESTABLISHED 2000
                    </span>
                    <h1 className="font-heading-01 text-5xl md:text-8xl text-white mb-8 animate-fade-up">
                        INFINITY INTERIORS
                    </h1>
                    <p className="font-body-01 text-xl text-gray-200 tracking-wide font-light max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
                        Crafting legacies through timeless interior design. The destination for the <strong>best interiors in Hyderabad</strong>.
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
                                alt="High rise architecture - Best Interiors in Hyderabad"
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
                            This philosophy drives everything we do at INFINITY Interiors, recognized as the <strong>best interiors in Hyderabad</strong>. Founded in 2000, our journey is not just about decorating rooms; it's about elevating lifestyles. We believe that every space should be a vantage point—a place where you feel at the peak of comfort, style, and inspiration.
                        </p>
                        <p className="font-body-01 text-lg text-secondary-01 leading-relaxed">
                            INFINITY stands for <strong>INFINITY INTERIORS</strong>. For nearly 30 years, our family of artisans has blended traditional Indian craftsmanship with modern design sensibilities to deliver luxury interior solutions.
                        </p>
                    </div>
                </div>
            </div>

            {/* Founder's Story Section */}
            <div className="w-full py-24 bg-secondary-05">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
                        {/* Founder Image - Asymmetric Layout */}
                        <div className="lg:w-1/2 relative">
                            <div className="relative z-10 w-full h-[600px] bg-white p-4 shadow-2xl rotate-1">
                                <div className="w-full h-full bg-secondary-03/20 overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700">
                                    <img
                                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
                                        alt="Founder of INFINITY Interiors"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
                                        <h3 className="text-white font-heading-04 text-3xl italic">The Visionary</h3>
                                        <p className="text-white/80 font-body-02 text-sm tracking-widest mt-2 uppercase">Since 2000</p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute top-10 -left-10 w-full h-full border border-primary-01/20 -z-0 hidden md:block -rotate-2"></div>
                        </div>

                        {/* Story Content */}
                        <div className="lg:w-1/2 space-y-12">
                            <div>
                                <span className="font-label-medium text-secondary-02 tracking-[0.3em] uppercase text-sm block mb-4">The Untold Story</span>
                                <h2 className="font-heading-02 text-4xl md:text-5xl text-primary-01 leading-tight">
                                    "We fought for every inch of elegance."
                                </h2>
                            </div>

                            <div className="space-y-8 pl-6 border-l border-primary-01/20">
                                <div className="relative">
                                    <span className="absolute -left-[31px] top-0 w-3 h-3 rounded-full bg-primary-01"></span>
                                    <h3 className="font-heading-04 text-2xl text-primary-01 mb-3">The Struggle</h3>
                                    <p className="font-body-02 text-secondary-01 leading-relaxed">
                                        It wasn't easy. Starting in a crowded market with nothing but a sketchpad and a dream, we faced rejection and doubt. Resources were scarce, and the competition was fierce. But every "no" only sharpened our resolve to create something undeniable.
                                    </p>
                                </div>

                                <div className="relative">
                                    <span className="absolute -left-[31px] top-0 w-3 h-3 rounded-full bg-secondary-02"></span>
                                    <h3 className="font-heading-04 text-2xl text-primary-01 mb-3">The Fight</h3>
                                    <p className="font-body-02 text-secondary-01 leading-relaxed">
                                        We didn't just compete; we outworked. We spent nights on construction sites, learning the soul of materials. We fought to prove that true luxury isn't just about expensive decor, but about the intangible feeling of a space that truly understands its owner.
                                    </p>
                                </div>

                                <div className="relative">
                                    <span className="absolute -left-[31px] top-0 w-3 h-3 rounded-full bg-secondary-02/50"></span>
                                    <h3 className="font-heading-04 text-2xl text-primary-01 mb-3">The Uniqueness</h3>
                                    <p className="font-body-02 text-secondary-01 leading-relaxed">
                                        What sets us apart today is that fire. We don't just design; we fight for your vision. Our "shaurbkle" (struggle) became our strength. We see what others miss—the potential in a corner, the emotion in a texture. That's the INFINITY difference.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Heritage/Roots Section - Dark Background */}
            <div className="w-full bg-primary-01 text-white py-32 px-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 transform origin-top-right"></div>

                <div className="container mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="md:w-1/2">
                        <h3 className="font-heading-04 text-4xl md:text-5xl mb-6 italic text-[#d4af37]">
                            "Om Vishwakarmaiah Namoh Namaha"
                        </h3>
                        <p className="font-label-medium text-gray-400 tracking-widest text-sm uppercase mb-8">
                            HONORING THE DIVINE ARCHITECT
                        </p>
                        <p className="font-body-01 text-lg text-gray-300 leading-relaxed max-w-xl">
                            Our roots are deeply embedded in the creative spirit. We approach every project with reverence for the craft, ensuring that every line drawn and every material chosen honors the art of making.
                        </p>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border border-[#d4af37]/30 flex items-center justify-center p-4 relative animate-spin-slow">
                            <div className="w-full h-full rounded-full border border-dashed border-[#d4af37]/20"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
