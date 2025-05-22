export default function Resources() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-6">Resources</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Free lead-magnets and valuable resources to help you on your journey.
        </p>
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-40 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Resource {i}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">PDF • 2.4 MB</span>
                  <button className="bg-primary-600 text-white px-4 py-1 rounded text-sm font-medium hover:bg-primary-700 transition-colors">
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Request a Resource</h2>
        <p className="mb-6">Don&apos;t see what you&apos;re looking for? Let me know what resources would be helpful to you.</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="flex-grow px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button className="bg-primary-600 text-white px-6 py-2 rounded-md font-medium hover:bg-primary-700 transition-colors">
            Submit Request
          </button>
        </div>
      </section>
    </div>
  );
}
