export default function Booking() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-6">Booking</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Schedule a speaking engagement, consulting session, or interview.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Speaking & Consulting</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            I&apos;m available for speaking engagements, workshops, and consulting on topics including:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 mb-6">
            <li>AI tools for creators and professionals</li>
            <li>Web development best practices</li>
            <li>Building personal brands in tech</li>
            <li>Content creation and distribution strategies</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please use the form to provide details about your event or consulting needs.
          </p>
        </section>

        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4">Booking Request</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Your email"
              />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Request Type
              </label>
              <select
                id="type"
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option>Speaking Engagement</option>
                <option>Consulting</option>
                <option>Interview</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Preferred Date
              </label>
              <input
                type="date"
                id="date"
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Details
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Please provide details about your event, consulting needs, or interview request"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-primary-600 text-white px-6 py-2 rounded-md font-medium hover:bg-primary-700 transition-colors"
            >
              Submit Request
            </button>
          </form>
        </section>
      </div>

      <section className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Prefer to schedule directly?</h2>
        <p className="mb-4">
          For quick 30-minute consultations, you can book directly through my calendar.
        </p>
        <div className="h-96 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">Calendly integration would appear here</p>
        </div>
      </section>
    </div>
  );
}
