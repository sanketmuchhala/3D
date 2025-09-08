import { ReactNode, forwardRef } from 'react'

interface SectionProps {
  id: string
  className?: string
  children: ReactNode
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ id, className = '', children }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        className={`section ${className}`}
      >
        <div className="container">
          {children}
        </div>
      </section>
    )
  }
)

Section.displayName = 'Section'

export default Section