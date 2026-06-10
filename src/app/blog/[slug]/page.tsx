import { blogPosts } from '@/lib/blog-data';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';



// Generate Metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: `${post.title} | BSW Interiors`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: [post.coverImage],
            type: 'article',
            authors: [post.author],
            publishedTime: post.date, // Note: In a real app convert to ISO string
        },
    };
}

// Generate Static Params for SSG (optional but good for SEO)
export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="bg-white min-h-screen pb-20 pt-24">
            {/* Article Hero */}
            <div className="container mx-auto px-4 mb-12 max-w-4xl">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-4 text-sm text-secondary-02 mb-4 tracking-wider uppercase">
                        <span>{post.date}</span>
                        <span>—</span>
                        <span>{post.tags.join(', ')}</span>
                    </div>
                    <h1 className="font-heading-01 text-4xl md:text-5xl lg:text-6xl text-primary-01 mb-6 leading-tight">
                        {post.title}
                    </h1>
                    <div className="flex items-center justify-center gap-2">
                        <span className="font-label-medium text-secondary-01 text-sm">By {post.author}</span>
                    </div>
                </div>

                <div className="relative w-full h-[400px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl mb-12">
                    <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Article Content */}
                <div
                    className="prose prose-lg prose-slate mx-auto font-body-01 text-secondary-01
            prose-headings:font-heading-04 prose-headings:text-primary-01
            prose-a:text-primary-01 prose-a:font-semibold hover:prose-a:text-secondary-02
            prose-img:rounded-xl"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </div>
        </article>
    );
}
