const ProgressBar = ({value, status = 'strong'}) => (
  <div className="progress-bar">
    <div className={`progress-fill progress-${status}`} style={{width: `${value}%`}} />
  </div>
)

export default ProgressBar
