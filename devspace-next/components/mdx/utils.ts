import { strapiAPI } from '@/lib/strapi';
import { BlogPost } from '@/types/strapi';

type Metadata = {
  title: string;
  publishedAt: string;
  updatedAt?: string;
  image?: string;
  summary?: string;
  author?: string;
  authorImg?: string;
};

// Convert Strapi BlogPost to the format expected by components
function convertBlogPost(post: BlogPost) {
  return {
    metadata: {
      title: post.title,
      publishedAt: post.publishedAt,
      updatedAt: post.updatedAt,
      image: post.image?.url,
      summary: post.summary,
      author: post.author,
      authorImg: post.authorImg?.url,
    } as Metadata,
    slug: post.slug,
    content: post.content,
  };
}

export async function getBlogPosts() {
  try {
    const posts = await strapiAPI.getBlogPosts();
    return posts.map(convertBlogPost);
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    return [];
  }
}

export async function getBlogPost(slug: string) {
  try {
    const post = await strapiAPI.getBlogPost(slug);
    return post ? convertBlogPost(post) : null;
  } catch (error) {
    console.error('Failed to fetch blog post:', error);
    return null;
  }
}
