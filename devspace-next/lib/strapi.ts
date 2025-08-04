import { 
  BlogPost, 
  Project, 
  Talk, 
  Hero, 
  Widget,
  HomeContent,
  AboutContent,
  SubscribeContent,
  ResumeContent,
  StrapiResponse, 
  StrapiCollectionResponse 
} from '@/types/strapi';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

class StrapiAPI {
  private baseURL: string;
  private headers: Record<string, string>;

  constructor() {
    this.baseURL = `${STRAPI_URL}/api`;
    this.headers = {
      'Content-Type': 'application/json',
    };
    
    if (API_TOKEN) {
      this.headers['Authorization'] = `Bearer ${API_TOKEN}`;
    }
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const response = await fetch(url, {
      headers: this.headers,
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Blog Posts
  async getBlogPosts(): Promise<BlogPost[]> {
    const response = await this.request<StrapiCollectionResponse<BlogPost>>('/blog-posts?populate=*&sort=publishedAt:desc');
    return response.data;
  }

  async getBlogPost(slug: string): Promise<BlogPost | null> {
    const response = await this.request<StrapiCollectionResponse<BlogPost>>(`/blog-posts?filters[slug][$eq]=${slug}&populate=*`);
    return response.data[0] || null;
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    const response = await this.request<StrapiCollectionResponse<Project>>('/projects?sort=order:asc');
    return response.data;
  }

  async getFeaturedProjects(): Promise<Project[]> {
    const response = await this.request<StrapiCollectionResponse<Project>>('/projects?filters[featured][$eq]=true&sort=order:asc');
    return response.data;
  }

  // Talks
  async getTalks(): Promise<Talk[]> {
    const response = await this.request<StrapiCollectionResponse<Talk>>('/talks?populate=*&sort=order:asc');
    return response.data;
  }

  async getFeaturedTalks(): Promise<Talk[]> {
    const response = await this.request<StrapiCollectionResponse<Talk>>('/talks?filters[featured][$eq]=true&populate=*&sort=order:asc');
    return response.data;
  }

  // Hero
  async getHero(): Promise<Hero | null> {
    const response = await this.request<StrapiResponse<Hero>>('/hero?populate=*');
    return response.data;
  }

  // Widgets
  async getWidgets(): Promise<Widget[]> {
    const response = await this.request<StrapiCollectionResponse<Widget>>('/widgets?filters[isActive][$eq]=true&sort=order:asc');
    return response.data;
  }

  async getWidgetsByType(type: string): Promise<Widget[]> {
    const response = await this.request<StrapiCollectionResponse<Widget>>(`/widgets?filters[type][$eq]=${type}&filters[isActive][$eq]=true&sort=order:asc`);
    return response.data;
  }

  // Page Content Types
  async getHomeContent(): Promise<HomeContent | null> {
    const response = await this.request<StrapiResponse<HomeContent>>('/home-content?populate=*');
    return response.data;
  }

  async getAboutContent(): Promise<AboutContent | null> {
    const response = await this.request<StrapiResponse<AboutContent>>('/about-content?populate=*');
    return response.data;
  }

  async getSubscribeContent(): Promise<SubscribeContent | null> {
    const response = await this.request<StrapiResponse<SubscribeContent>>('/subscribe-content?populate=*');
    return response.data;
  }

  async getResumeContent(): Promise<ResumeContent | null> {
    const response = await this.request<StrapiResponse<ResumeContent>>('/resume-content?populate=*');
    return response.data;
  }
}

export const strapiAPI = new StrapiAPI();

// Utility function to get full image URL
export function getStrapiImageUrl(url: string): string {
  if (url.startsWith('http')) {
    return url;
  }
  return `${STRAPI_URL}${url}`;
}