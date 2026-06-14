const Card = ({title, action, children, className = ''}) => (
  <section className={`card ${className}`}>
    {title ? (
      <div className="card-title">
        <span>{title}</span>
        {action}
      </div>
    ) : null}
    {children}
  </section>
)

export default Card
