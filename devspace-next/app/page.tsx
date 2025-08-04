import { getBlogPosts } from '@/components/mdx/utils'
import { strapiAPI } from '@/lib/strapi'
import Hero from '@/components/hero'
import PostItem from './post-item'
import Talks from '@/components/talks'
import FeaturedProjects from '@/components/featured-projects'
import WidgetNewsletter from '@/components/widget-newsletter'
import WidgetSponsor from '@/components/widget-sponsor'
import WidgetBook from '@/components/widget-book'

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Home - DevSpace',
  description: 'Page description',
}

export default async function Home() {
  let allBlogs: any[] = [];
  let homeContent = null;

  try {
    allBlogs = await getBlogPosts();
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    allBlogs = [];
  }

  try {
    homeContent = await strapiAPI.getHomeContent();
  } catch (error) {
    console.error('Failed to fetch home content:', error);
    homeContent = null;
  }

  // Sort posts by date
  allBlogs.sort((a, b) => {
    return (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) ? -1 : 1
  })

  return (
    <>
      <Hero content={homeContent || undefined} />
      { /* Content */}
      <div className="grow md:flex space-y-8 md:space-y-0 md:space-x-8 pb-16 md:pb-20">

        { /* Middle area */}
        <div className="grow">
          <div className="max-w-[700px]">
            <div className="space-y-10">

              <section>
                <h2 className="font-aspekta text-xl font-[650] mb-3">
                  {homeContent?.latest_articles_title || 'Latest Articles'}
                </h2>

                {/* Filters */}
                <ul className="flex flex-wrap text-sm border-b border-slate-100 dark:border-slate-800">
                  {homeContent?.article_filters?.map((filter: string, index: number) => (
                    <li key={index} className="px-3 -mb-px">
                      <a 
                        className={`block py-3 ${index === 0 
                          ? 'font-medium text-slate-800 dark:text-slate-100 border-b-2 border-sky-500' 
                          : 'text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300'
                        }`} 
                        href="#0"
                      >
                        {filter}
                      </a>
                    </li>
                  )) || (
                    <>
                      <li className="px-3 -mb-px">
                        <a className="block py-3 font-medium text-slate-800 dark:text-slate-100 border-b-2 border-sky-500" href="#0">
                          Coding
                        </a>
                      </li>
                      <li className="px-3 -mb-px">
                        <a className="block py-3 text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300" href="#0">
                          Startups
                        </a>
                      </li>
                      <li className="px-3 -mb-px">
                        <a className="block py-3 text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300" href="#0">
                          Tutorials
                        </a>
                      </li>
                      <li className="px-3 -mb-px">
                        <a className="block py-3 text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300" href="#0">
                          Indie Hacking
                        </a>
                      </li>
                    </>
                  )}
                </ul>

                {/* Articles list */}
                <div>
                  {allBlogs.map((post: any, postIndex: number) => (
                      <PostItem key={postIndex} {...post} />
                  ))}
                </div>
              </section>

              <Talks />
              <FeaturedProjects />

            </div>
          </div>
        </div>

        { /* Right sidebar */}
        <aside className="md:w-[240px] lg:w-[300px] shrink-0">
          <div className="space-y-6">

            <WidgetNewsletter />
            <WidgetSponsor />
            <WidgetBook />

          </div>
        </aside>

      </div>
    </>
  )
}
