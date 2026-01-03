import { blogPosts } from '@/lib/blog-data';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Interior Design Blog | Best Interiors in Hyderabad | Infinity Interiors',
    description: 'Read the latest trends, tips, and insights from Hyderabad\'s best interior designers. Luxury living, cost estimations, and transformation stories.',
};

export default function BlogListingPage() {
    return (
        <div className="bg-primary-03 min-h-screen pb-20 pt-24"> {/* Added padding top for header clearance */}
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16 animate-fade-up">
                    <span className="font-label-medium text-secondary-02 tracking-[0.3em] uppercase text-sm block mb-4">
                        INSIGHTS & INSPIRATION
                    </span>
                    <h1 className="font-heading-01 text-4xl md:text-6xl text-primary-01 mb-6">
                        Our Design Journal
                    </h1>
                    <p className="font-body-01 text-lg text-secondary-01 max-w-2xl mx-auto">
                        Expert advice, trend forecasts, and behind-the-scenes stories from the team at Infinity Interiors.
                    </p>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <Link href={`/blog/${post.slug}`} key={post.id} className="group cursor-pointer">
                            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                                {/* Image Container */}
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        src={post.coverImage}
                                        alt={post.title}
                                        fill
                                        className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 text-xs font-bold tracking-widest uppercase text-primary-01">
                                        {post.tags[0]}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-grow flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-4 text-xs text-secondary-02 mb-3">
                                            <span>{post.date}</span>
                                            <span>•</span>
                                            <span>{post.author}</span>
                                        </div>
                                        <h2 className="font-heading-04 text-xl text-primary-01 mb-3 group-hover:text-secondary-02 transition-colors line-clamp-2">
                                            {post.title}
                                        </h2>
                                        <p className="font-body-02 text-secondary-01 line-clamp-3 mb-4">
                                            {post.excerpt}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100">
                                        <span className="text-sm font-semibold text-primary-01 flex items-center gap-2 group-hover:gap-3 transition-all">
                                            READ ARTICLE
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
