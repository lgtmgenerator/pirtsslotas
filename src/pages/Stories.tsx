import { useLang, useMessages } from '../i18n'
import { Banner } from '../components/Banner'
import { StoryCarousel } from '../components/StoryCarousel'
import { usePageMeta } from '../components/usePageMeta'

export function Stories() {
  usePageMeta('stories')
  const t = useMessages()
  // Only Latvian and English title images exist; Russian falls back to Latvian.
  const image = useLang() === 'en' ? '/gfx/stories-en-back.jpg' : '/gfx/stories-lv-back.jpg'
  return (
    <>
      <Banner image={image} ratio="1366 / 463" />
      <StoryCarousel stories={t.stories} />
    </>
  )
}
