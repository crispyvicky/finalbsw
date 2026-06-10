import { Button } from "@/components/ui/button";

export default function About() {
    return (
        <div className="w-full bg-white overflow-hidden">
            {/* Hero Section with Custom Background */}
            <div
                className="relative w-full h-[80vh] flex items-center justify-center bg-fixed bg-cover bg-center"
                style={{ backgroundImage: 'url("/office.png")' }}
            >
                <div className="absolute inset-0 bg-[#0F2557]/80 mix-blend-multiply" /> {/* Deep Navy Overlay */}
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <span className="block text-[#A0A0A0] tracking-[0.4em] text-sm md:text-base mb-6 font-bold uppercase animate-fade-in">
                        Excellence in Design
                    </span>
                    <h1 className="font-serif text-5xl md:text-8xl text-white mb-8 animate-fade-up">
                        BSW INTERIORS
                    </h1>
                    <p className="font-body-01 text-xl text-white/80 tracking-wide font-light max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
                        Crafting legacies through timeless interior design. The premier destination for luxury interiors.
                    </p>
                </div>
            </div>

            {/* Philosophy Section */}
            <div className="container mx-auto py-24 px-4 md:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    <div className="lg:w-1/2 relative group">
                        {/* Image Composition */}
                        <div className="relative z-10 overflow-hidden shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
                            <img
                                src="/kitchen.png"
                                alt="High-end Kitchen Architecture"
                                className="w-full h-[600px] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0F2557]/80 to-transparent opacity-60"></div>
                        </div>
                        {/* Decorative Element */}
                        <div className="absolute -bottom-10 -left-10 w-full h-full border-2 border-[#A0A0A0]/30 z-0 hidden md:block"></div>
                    </div>

                    <div className="lg:w-1/2 space-y-8">
                        <h2 className="font-serif text-4xl md:text-5xl text-[#0F2557] leading-tight italic">
                            "Architecture is the learned game, correct and magnificent, of forms assembled in the light."
                        </h2>
                        <div className="w-32 h-1 bg-[#A0A0A0] opacity-50"></div>
                        <p className="font-body-01 text-lg text-slate-600 leading-relaxed">
                            This philosophy drives everything we do at BSW Interiors. Our journey is not just about decorating rooms; it's about elevating lifestyles. We believe that every space should be a vantage point—a place where you feel at the peak of comfort, style, and inspiration.
                        </p>
                        <p className="font-body-01 text-lg text-slate-600 leading-relaxed">
                            For years, our team of expert architects and artisans has blended traditional craftsmanship with modern design sensibilities to deliver uncompromising luxury solutions for both residential and commercial spaces.
                        </p>
                    </div>
                </div>
            </div>

            {/* Core Values Section */}
            <div className="w-full py-24 bg-slate-50">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
                        {/* Image Layout */}
                        <div className="lg:w-1/2 relative order-last lg:order-first">
                            <div className="relative z-10 w-full h-[600px] bg-white p-4 shadow-xl">
                                <div className="w-full h-full overflow-hidden relative">
                                    <img
                                        src="/bedroom.png"
                                        alt="Luxury Bedroom"
                                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                    />
                                    <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-[#0F2557] to-transparent">
                                        <h3 className="text-white font-serif text-3xl">Uncompromising Quality</h3>
                                        <p className="text-[#A0A0A0] font-mono text-sm tracking-widest mt-2 uppercase">The BSW Standard</p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute top-10 -right-10 w-full h-full border border-[#0F2557]/20 -z-0 hidden md:block"></div>
                        </div>

                        {/* Story Content */}
                        <div className="lg:w-1/2 space-y-12">
                            <div>
                                <span className="font-mono text-[#A0A0A0] tracking-[0.3em] uppercase text-sm block mb-4 font-bold">Our Approach</span>
                                <h2 className="font-serif text-4xl md:text-5xl text-[#0F2557] leading-tight">
                                    Precision meets passion.
                                </h2>
                            </div>

                            <div className="space-y-8 pl-6 border-l border-[#A0A0A0]/40">
                                <div className="relative">
                                    <span className="absolute -left-[31px] top-0 w-3 h-3 rounded-full bg-[#0F2557]"></span>
                                    <h3 className="font-serif text-2xl text-[#0F2557] mb-3">Architectural Integrity</h3>
                                    <p className="font-body-02 text-slate-600 leading-relaxed">
                                        We respect the bones of a building. Our designs are conceived to harmonize with the architectural shell, ensuring that structural integrity and aesthetic beauty walk hand-in-hand.
                                    </p>
                                </div>

                                <div className="relative">
                                    <span className="absolute -left-[31px] top-0 w-3 h-3 rounded-full bg-[#A0A0A0]"></span>
                                    <h3 className="font-serif text-2xl text-[#0F2557] mb-3">Material Mastery</h3>
                                    <p className="font-body-02 text-slate-600 leading-relaxed">
                                        True luxury lies in the tactile experience. We source the finest materials—from rich hardwoods to custom metals and Italian marbles—ensuring that every surface tells a story of quality.
                                    </p>
                                </div>

                                <div className="relative">
                                    <span className="absolute -left-[31px] top-0 w-3 h-3 rounded-full bg-[#0F2557]/50"></span>
                                    <h3 className="font-serif text-2xl text-[#0F2557] mb-3">Bespoke Execution</h3>
                                    <p className="font-body-02 text-slate-600 leading-relaxed">
                                        We don't do cookie-cutter. Every piece of millwork, every lighting fixture, and every color palette is customized to the specific needs and aspirations of our clients.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Heritage/Roots Section - Dark Background */}
            <div className="w-full bg-[#0F2557] text-white py-32 px-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 transform origin-top-right"></div>

                <div className="container mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="md:w-1/2">
                        <h3 className="font-serif text-4xl md:text-5xl mb-6 italic text-[#A0A0A0]">
                            "Design is intelligence made visible."
                        </h3>
                        <p className="font-mono text-[#A0A0A0] font-bold tracking-widest text-sm uppercase mb-8">
                            A COMMITMENT TO EXCELLENCE
                        </p>
                        <p className="font-body-01 text-lg text-slate-300 leading-relaxed max-w-xl">
                            Our team approaches every project with a reverence for the craft. From initial sketches to the final installation, BSW Interiors ensures that every line drawn honors the art of space making.
                        </p>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border border-[#A0A0A0]/30 flex items-center justify-center p-4 relative animate-spin-slow">
                            <div className="w-full h-full rounded-full border border-dashed border-[#A0A0A0]/50"></div>
                            <div className="absolute inset-0 flex items-center justify-center font-serif text-3xl tracking-widest text-white opacity-80">
                                BSW
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
