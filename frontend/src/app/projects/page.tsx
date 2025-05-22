export default function Projects() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-6">Projects</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          A collection of my work, experiments, and open-source contributions.
        </p>
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-200 dark:bg-gray-800"></div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Project {i}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs px-2 py-1 rounded">React</span>
                  <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs px-2 py-1 rounded">TypeScript</span>
                  <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs px-2 py-1 rounded">Tailwind</span>
                </div>
                <a href={`/projects/project-${i}`} className="text-primary-600 dark:text-primary-400 font-medium hover:underline">
                  View Project →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
