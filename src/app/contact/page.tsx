'use client';

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2, CheckCircle } from "lucide-react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const response = await fetch('/api/enquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    notes: formData.message,
                    source: 'Contact Page',
                    status: 'New'
                }),
            });

            if (response.ok) {
                setSuccess(true);
                setFormData({ name: '', email: '', phone: '', message: '' });
                setTimeout(() => setSuccess(false), 5000);
            } else {
                setError('Failed to send inquiry. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen flex flex-col md:flex-row relative bg-primary-01 text-white">
            {/* Visual Side (Left) */}
            <div className="w-full md:w-1/2 relative h-[500px] md:h-auto md:min-h-screen overflow-hidden flex-shrink-0">
                <img
                    src="/office.png"
                    alt="Luxury Office Interior"
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent md:bg-gradient-to-r md:from-primary-01/90 md:to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-20 z-10">
                    <h2 className="font-heading-02 text-3xl md:text-5xl mb-4 md:mb-6 leading-tight">BSW Interiors</h2>
                    <address className="not-italic text-gray-300 text-base md:text-lg space-y-1 md:space-y-2 leading-relaxed opacity-90">
                        <p>Plot No. 13, Road No. 4</p>
                        <p>Ravi Narayana Reddy Nagar, Hyderabad</p>
                        <p>Telangana, India 500033</p>
                        <br />
                        <p>info@bswinteriors.com</p>
                    </address>
                </div>
            </div>

            {/* Form Side (Right) */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-6 py-12 md:p-16 lg:p-24 bg-primary-01 relative z-10">
                <div className="w-full max-w-lg">
                    <span className="text-[#A0A0A0] tracking-[0.3em] text-xs md:text-sm uppercase mb-3 md:mb-4 block">Let's Create</span>
                    <h1 className="font-heading-02 text-3xl md:text-5xl mb-8 text-white">Start Your Project</h1>

                    {success && (
                        <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            <p className="text-green-100">Thank you! We'll get back to you soon.</p>
                        </div>
                    )}

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                            <p className="text-red-100">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="group relative z-0 w-full mb-6">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="block py-4 px-0 w-full text-base md:text-lg text-white bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-[#A0A0A0] peer"
                                placeholder=" "
                                required
                            />
                            <label className="peer-focus:font-medium absolute text-base md:text-lg text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#A0A0A0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Name</label>
                        </div>

                        <div className="group relative z-0 w-full mb-6">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="block py-4 px-0 w-full text-base md:text-lg text-white bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-[#A0A0A0] peer"
                                placeholder=" "
                                required
                            />
                            <label className="peer-focus:font-medium absolute text-base md:text-lg text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#A0A0A0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email Address</label>
                        </div>

                        <div className="group relative z-0 w-full mb-6">
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="block py-4 px-0 w-full text-base md:text-lg text-white bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-[#A0A0A0] peer"
                                placeholder=" "
                                required
                            />
                            <label className="peer-focus:font-medium absolute text-base md:text-lg text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#A0A0A0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone Number</label>
                        </div>

                        <div className="group relative z-0 w-full mb-6">
                            <textarea
                                name="message"
                                rows={4}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="block py-4 px-0 w-full text-base md:text-lg text-white bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-[#A0A0A0] peer"
                                placeholder=" "
                                required
                            ></textarea>
                            <label className="peer-focus:font-medium absolute text-base md:text-lg text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#A0A0A0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tell us about your space</label>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#A0A0A0] text-[#0F2557] hover:bg-white hover:text-[#0F2557] transition-colors py-6 text-sm md:text-lg tracking-widest mt-8 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    SENDING...
                                </>
                            ) : (
                                'SEND INQUIRY'
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
