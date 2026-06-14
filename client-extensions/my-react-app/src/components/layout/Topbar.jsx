import {userProfile} from '../../data/skillPathData'
import Icon from '../common/Icon'

const Topbar = () => (
  <header className="topbar">
    <div className="logo">
      <span className="logo-dot" />
      SkillPath AI
    </div>
    <div className="topbar-right">
      <button className="icon-button" type="button" aria-label="Notifications">
        <Icon name="bell" />
      </button>
      <button className="icon-button" type="button" aria-label="Search">
        <Icon name="search" />
      </button>
      <div className="avatar" aria-label={`${userProfile.name} profile`}>
        {userProfile.initials}
      </div>
    </div>
  </header>
)

export default Topbar
