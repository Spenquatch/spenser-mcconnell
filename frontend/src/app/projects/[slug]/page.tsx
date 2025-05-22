import { Metadata } from 'next';

// Define types for project data
interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  image: string;
  tags: string[];
  repoUrl?: string;
  demoUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// Mock function to fetch a project by slug
async function getProject(slug: string): Promise<Project> {
  // In a real app, this would fetch from an API
  return {
    id: '1',
    slug,
    title: `Project ${slug}`,
    description: 'This is a sample project demonstrating ISR capabilities in Next.js 15.',
    content: `
      <p>This is a detailed description of the project. This content would typically come from a CMS or API.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <h2>Features</h2>
      <ul>
        <li>Feature 1: Lorem ipsum dolor sit amet</li>
        <li>Feature 2: Consectetur adipiscing elit</li>
        <li>Feature 3: Sed do eiusmod tempor incididunt</li>
      </ul>
      <h2>Technologies Used</h2>
      <p>React, Next.js, TypeScript, Tailwind CSS</p>
    `,
    image: '/placeholder.jpg',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    repoUrl: 'https://github.com/example/project',
    demoUrl: 'https://example.com',
    createdAt: '2025-01-15T00:00:00Z',
    updatedAt: '2025-05-01T00:00:00Z',
  };
}

// Mock function to get all project slugs
async function getAllProjectSlugs(): Promise<string[]> {
  // In a real app, this would fetch from an API
  return ['project-1', 'project-2', 'project-3'];
}

// Generate metadata for the page - UPDATED for Next.js 15
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params; // Await the params
  const project = await getProject(slug);
  
  return {
    title: `${project.title} | Spenser McConnell`,
    description: project.description,
  };
}

// Generate static params for ISR
export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  
  return slugs.map(slug => ({
    slug,
  }));
}

// Define the page component - UPDATED for Next.js 15
export default async function Page(props: {
  params: Promise<{ slug: string }>; // params is now a Promise
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>; // searchParams is now a Promise
}) {
  const { slug } = await props.params; // Await the params
  const project = await getProject(slug);
  
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map(tag => (
            <span key={tag} className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
      </section>
      
      <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-8">
        <span className="text-gray-500 dark:text-gray-400">Project Image</span>
      </div>
      
      <div className="prose dark:prose-invert max-w-none mb-8" dangerouslySetInnerHTML={{ __html: project.content }} />
      
      <div className="flex flex-wrap gap-4">
        {project.repoUrl && (
          <a 
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 text-white px-6 py-2 rounded-md font-medium hover:bg-gray-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            View Repository
          </a>
        )}
        
        {project.demoUrl && (
          <a 
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary-600 text-white px-6 py-2 rounded-md font-medium hover:bg-primary-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View Live Demo
          </a>
        )}
      </div>
      
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: {new Date(project.updatedAt).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          This page uses Incremental Static Regeneration (ISR) and will revalidate every 60 seconds.
        </p>
      </div>
    </div>
  );
}

// Enable ISR with a revalidation period of 60 seconds
export const revalidate = 60;