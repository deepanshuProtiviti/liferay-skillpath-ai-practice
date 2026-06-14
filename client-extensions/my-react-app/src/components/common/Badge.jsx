const Badge = ({children, tone = 'teal'}) => (
  <span className={`badge-sm b-${tone}`}>{children}</span>
)

export default Badge
