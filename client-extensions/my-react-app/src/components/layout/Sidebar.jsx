import {navGroups} from '../../data/skillPathData'
import Icon from '../common/Icon'

const Sidebar = ({activeScreen, onScreenChange}) => (
  <aside className="sidebar" aria-label="SkillPath AI navigation">
    {navGroups.map((group) => (
      <div className="nav-group" key={group.label}>
        <div className="nav-section">{group.label}</div>
        {group.items.map((item) => (
          <button
            className={`nav-item ${activeScreen === item.id ? 'active' : ''}`}
            disabled={item.disabled}
            key={item.id}
            onClick={() => onScreenChange(item.id)}
            type="button"
          >
            <Icon name={item.icon} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    ))}
  </aside>
)

export default Sidebar
