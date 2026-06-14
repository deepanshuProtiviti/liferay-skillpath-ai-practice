import Icon from './Icon'

const AiBanner = ({title, subtitle, actionLabel, onAction}) => (
  <div className="ai-banner">
    <div>
      <div className="ai-banner-text">
        <Icon name="sparkles" />
        {title}
      </div>
      <div className="ai-banner-sub">{subtitle}</div>
    </div>
    {actionLabel ? (
      <button className="btn-sm" onClick={onAction} type="button">
        {actionLabel}
      </button>
    ) : null}
  </div>
)

export default AiBanner
