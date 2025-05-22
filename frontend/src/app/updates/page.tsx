export default function Updates() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-6">Updates</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Timeline feed of micro-blog posts and project changelogs.
        </p>
      </section>

      <section>
        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">Update Title {i}</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">May {i + 10}, 2025</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-300 text-xs px-2 py-1 rounded">Project Update</span>
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs px-2 py-1 rounded">Web Development</span>
              </div>
              <div className="flex items-center gap-4">
                <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline">Read more</a>
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                  <span>3 comments</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex justify-center mt-8">
        <button className="bg-primary-600 text-white px-6 py-2 rounded-md font-medium hover:bg-primary-700 transition-colors">
          Load More
        </button>
      </div>
    </div>
  );
}
