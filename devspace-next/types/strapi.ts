export interface StrapiImage {
  id: number;
  url: string;
  alternativeText?: string;
  width: number;
  height: number;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  image?: StrapiImage;
  summary?: string;
  author?: string;
  authorImg?: StrapiImage;
  content: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  iconColor: string;
  iconSvgPath: string;
  link: string;
  featured: boolean;
  order: number;
}

export interface Talk {
  id: number;
  title: string;
  image: StrapiImage;
  link: string;
  featured: boolean;
  order: number;
}

export interface Hero {
  id: number;
  profileImage: StrapiImage;
  title: string;
  description: string;
  isActive: boolean;
}

export interface Widget {
  id: number;
  type: 'newsletter' | 'sponsor' | 'book';
  title: string;
  description?: string;
  data?: any;
  isActive: boolean;
  order: number;
}

export interface HomeContent {
  id: number;
  hero_title: string;
  hero_subtitle?: string;
  hero_description: string;
  hero_image?: StrapiImage;
  latest_articles_title: string;
  article_filters?: string[];
  seo_title?: string;
  seo_description?: string;
}

export interface AboutContent {
  id: number;
  page_title: string;
  featured_image?: StrapiImage;
  bio_title: string;
  bio_content: string;
  career_title: string;
  career_content: string;
  connect_title: string;
  connect_content: string;
  seo_title?: string;
  seo_description?: string;
}

export interface SubscribeContent {
  id: number;
  page_title: string;
  page_description: string;
  newsletter_benefits?: string[];
  subscriber_count_text: string;
  subscriber_avatars?: StrapiImage[];
  testimonials?: Array<{
    name: string;
    quote: string;
    content: string;
  }>;
  form_placeholder: string;
  form_button_text: string;
  success_message?: string;
  seo_title?: string;
  seo_description?: string;
}

export interface ResumeContent {
  id: number;
  page_title: string;
  education?: Array<{
    degree: string;
    school: string;
    duration: string;
    description: string;
    icon?: string;
  }>;
  work_experience?: Array<{
    title: string;
    company: string;
    duration: string;
    description: string;
    logo?: string;
  }>;
  awards?: Array<{
    title: string;
    organization: string;
    year: string;
    description: string;
  }>;
  recommendations?: Array<{
    name: string;
    title: string;
    company: string;
    content: string;
  }>;
  technical_skills?: Array<{
    name: string;
    level: number;
  }>;
  languages?: Array<{
    name: string;
    flag: string;
    proficiency: string;
  }>;
  references?: Array<{
    name: string;
    title: string;
    avatar?: string;
  }>;
  seo_title?: string;
  seo_description?: string;
}

export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiCollectionResponse<T> {
  data: T[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}