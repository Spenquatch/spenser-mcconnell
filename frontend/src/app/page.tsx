import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-lg p-8 shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Spenser McConnell</h1>
        <p className="text-xl mb-6">Personal brand hub featuring project portfolio, updates timeline, AI A Day newsletter, and more.</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/projects" className="bg-white text-primary-700 px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors">
            View Projects
          </Link>
          <Link href="/an-ai-a-day" className="bg-transparent border border-white text-white px-6 py-2 rounded-md font-medium hover:bg-white/10 transition-colors">
            AI A Day
          </Link>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-200 dark:bg-gray-800"></div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Project {i}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>
                <Link href={`/projects/project-${i}`} className="text-primary-600 dark:text-primary-400 font-medium hover:underline">
                  View Project →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Latest Updates</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold">Update Title {i}</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">May {i}, 2025</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <Link href="/updates" className="text-primary-600 dark:text-primary-400 font-medium hover:underline mt-2 inline-block">
                Read More →
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/updates" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">
            View All Updates →
          </Link>
        </div>
      </section>

      <section className="mt-12 bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">AI A Day Newsletter</h2>
        <p className="mb-6">Subscribe to receive a daily AI tool spotlight directly in your inbox.</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="flex-grow px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button className="bg-primary-600 text-white px-6 py-2 rounded-md font-medium hover:bg-primary-700 transition-colors">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
}