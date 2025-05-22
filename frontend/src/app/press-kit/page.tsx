export default function PressKit() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-6">Press Kit</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Media assets, bio, and quotes for press and media inquiries.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Bio</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              Spenser McConnell is a developer, writer, and creator focused on the intersection of technology and creativity. With over a decade of experience in web development and digital product design, Spenser has worked with startups, enterprises, and independent creators to build innovative digital experiences.
            </p>
            <p>
              As the creator of &quot;An AI A Day,&quot; Spenser curates and reviews the most interesting AI tools and technologies, making them accessible to creators and professionals across industries.
            </p>
            <p>
              Based in San Francisco, Spenser is available for speaking engagements, interviews, and consulting opportunities.
            </p>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-4">Headshots</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">Photo 1</span>
            </div>
            <div className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">Photo 2</span>
            </div>
            <div className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">Photo 3</span>
            </div>
            <div className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">Photo 4</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Notable Quotes</h2>
        <div className="space-y-4">
          <blockquote className="border-l-4 border-primary-500 pl-4 py-2 italic">
            &quot;The future of AI isn&apos;t about replacing humans, but augmenting our creativity and problem-solving capabilities.&quot;
          </blockquote>
          <blockquote className="border-l-4 border-primary-500 pl-4 py-2 italic">
            &quot;We&apos;re entering an era where the tools we use are becoming collaborators in the creative process.&quot;
          </blockquote>
          <blockquote className="border-l-4 border-primary-500 pl-4 py-2 italic">
            &quot;The most powerful technology is the one that becomes invisible, seamlessly integrating into our daily workflows.&quot;
          </blockquote>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Speaking Engagements</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">Conference Name {i}</h3>
                  <p className="text-gray-600 dark:text-gray-400">Talk Title: &quot;The Future of AI in Creative Work&quot;</p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">June {i * 5}, 2025</span>
              </div>
              <div className="mt-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">San Francisco, CA</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Download Press Kit</h2>
        <button className="bg-primary-600 text-white px-6 py-2 rounded-md font-medium hover:bg-primary-700 transition-colors flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Complete Press Kit (ZIP)
        </button>
      </section>
    </div>
  );
}
