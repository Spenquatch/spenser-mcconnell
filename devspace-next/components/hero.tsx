import Image from 'next/image'
import { strapiAPI, getStrapiImageUrl } from '@/lib/strapi'
import { HomeContent } from '@/types/strapi'
import HeroImage from '@/public/images/me.jpg'

interface HeroProps {
  content?: HomeContent;
}

export default function Hero({ content }: HeroProps) {
  if (!content) {
    return null;
  }

  return (
    <section>
      <div className="max-w-[700px]">
        <div className="pt-8 pb-10">
          <Image 
            className="rounded-full mb-5" 
            src={content.hero_image ? getStrapiImageUrl(content.hero_image.url) : HeroImage} 
            width={56} 
            height={56} 
            priority 
            alt="Profile" 
          />
          <h1 
            className="h1 font-aspekta mb-5"
            dangerouslySetInnerHTML={{ __html: content.hero_title }}
          />
          <p className="text-lg text-slate-500 dark:text-slate-400">
            {content.hero_description}
          </p>
        </div>
      </div>
    </section>
  )
}