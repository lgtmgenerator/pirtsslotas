interface Props {
  head: string
  sub: string
}

export function SectionHeading({ head, sub }: Props) {
  return (
    <div className="section-heading">
      <img className="section-heading__logo" src="/gfx/logo-section.png" alt="" />
      <h2>{head}</h2>
      <p>{sub}</p>
      <span className="section-heading__line" />
    </div>
  )
}
