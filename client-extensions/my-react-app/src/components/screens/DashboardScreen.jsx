import { useSkillPath } from '../../context/SkillPathContext'
import {
  dashboardStats,
  recentActivity,
} from '../../data/skillPathData'
import AiBanner from '../common/AiBanner'
import Badge from '../common/Badge'
import Card from '../common/Card'
import PageHeader from '../common/PageHeader'
import ProgressBar from '../common/ProgressBar'

const StatCard = ({label, value, change}) => (
  <div className="stat-card">
    <div className="stat-val">{value}</div>
    <div className="stat-lbl">{label}</div>
    {change ? <div className="stat-change">{change}</div> : null}
  </div>
)

const SkillProgressCard = ({ skills }) => (
  <Card title="Skill progress" action={<Badge>Updated</Badge>}>
    {skills.map((skill) => (
      <div className="progress-row" key={skill.label}>
        <div className="progress-label">
          <span>{skill.label}</span>
          <span>{skill.value}%</span>
        </div>
        <ProgressBar value={skill.value} status={skill.status} />
      </div>
    ))}
  </Card>
)

const RecentActivityCard = () => (
  <Card title="Recent activity">
    {recentActivity.map((activity) => (
      <div className="activity-item" key={`${activity.text}-${activity.time}`}>
        <div className={`activity-dot dot-${activity.tone}`} />
        <div>
          <div className="activity-text">{activity.text}</div>
          <div className="activity-time">{activity.time}</div>
        </div>
      </div>
    ))}
  </Card>
)

const DashboardScreen = ({onScreenChange}) => {
  const { userProfile, skillProgress } = useSkillPath();

  return (
    <section className="screen">
      <PageHeader
        title={`Good morning, ${userProfile.name}`}
        subtitle={`${userProfile.currentRole} -> ${userProfile.targetRole} · ${userProfile.goalProgress}% complete`}
      />
      <AiBanner
        actionLabel="View path"
        onAction={() => onScreenChange('path')}
        subtitle='Complete "Liferay DXP Architecture" to unlock next milestone'
        title="AI insight - 3 new courses match your skill gap"
      />
      <div className="stats-row">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
      <div className="two-col">
        <SkillProgressCard skills={skillProgress} />
        <RecentActivityCard />
      </div>
    </section>
  )
}

export default DashboardScreen
