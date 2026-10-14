import { useLang, useMessages } from '../i18n'
import { Banner } from '../components/Banner'
import { StoryCarousel } from '../components/StoryCarousel'
import { usePageMeta } from '../components/usePageMeta'

export function About() {
  usePageMeta('about')
  const t = useMessages()
  const image = useLang() === 'en' ? '/gfx/aboutus-en-back.webp' : '/gfx/aboutus-lv-back.webp'
  return (
    <>
      <Banner image={image} ratio="1366 / 463" />
      <StoryCarousel stories={t.about} />
    </>
  )
}
