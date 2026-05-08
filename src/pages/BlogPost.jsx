import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import { blogPosts } from '../data/blogData'

export default function BlogPost() {
  const { slug } = useParams()
  const post = blogPosts.find(p => p.slug === slug)

  if (!post) {
    return (
      <PageWrapper title="Post Not Found">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
            <Link to="/blog" className="text-[#F97316] hover:underline">Return to Blog</Link>
          </div>
        </div>
      </PageWrapper>
    )
  }

  // Schema Markup for Article
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://cilojuice.com/blog/${slug}`
    },
    "headline": post.title,
    "description": post.excerpt,
    "image": `https://cilojuice.com${post.image}`,  
    "author": {
      "@type": "Organization",
      "name": post.author
    },  
    "publisher": {
      "@type": "Organization",
      "name": "CILO Juice",
      "logo": {
        "@type": "ImageObject",
        "url": "https://cilojuice.com/logo.png"
      }
    },
    "datePublished": post.date,
    "dateModified": post.date
  }

  return (
    <PageWrapper
      title={post.title}
      description={post.excerpt}
      schema={articleSchema}
    >
      <article className="pt-32 pb-20 px-6 md:px-12 lg:px-20 max-w-4xl mx-auto min-h-screen">
        <Link to="/blog" className="inline-flex items-center gap-2 text-[#7A4A2A]/70 hover:text-[#F97316] transition-colors mb-10 font-semibold text-sm">
          <ArrowLeft size={16} /> Back to Journal
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <span className="bg-[#FFF8F3] text-[#F97316] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-[#FFD9A8]">
              {post.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#2D1608] mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-sm text-stone-500 font-medium">
            <span className="flex items-center gap-2"><User size={16} /> {post.author}</span>
            <span className="flex items-center gap-2"><Calendar size={16} /> {new Date(post.date).toLocaleDateString()}</span>
          </div>
        </header>

        <div className="min-h-[350px] md:min-h-[500px] bg-gradient-to-b from-[#FFF8F3] to-white rounded-3xl overflow-visible mb-12 flex items-center justify-center p-12 border border-[#FFD9A8] shadow-sm relative">
          <img src={post.image} alt={post.title} className="max-h-[300px] md:max-h-[450px] w-auto object-contain drop-shadow-[0_20px_40px_rgba(45,22,8,0.15)] relative z-10" style={{ objectFit: 'contain' }} />
        </div>

        <div 
          className="prose prose-lg md:prose-xl prose-stone max-w-none prose-headings:font-black prose-headings:text-[#2D1608] prose-p:text-stone-600 prose-a:text-[#F97316]"
          style={{ '--tw-prose-headings': "'Playfair Display', Georgia, serif" }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-16 pt-8 border-t border-stone-200">
          <div className="flex items-center gap-3 flex-wrap">
            <Tag size={20} className="text-stone-400" />
            {post.tags.map(tag => (
              <span key={tag} className="bg-stone-100 text-stone-600 px-4 py-1.5 rounded-full text-sm font-semibold">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </PageWrapper>
  )
}
