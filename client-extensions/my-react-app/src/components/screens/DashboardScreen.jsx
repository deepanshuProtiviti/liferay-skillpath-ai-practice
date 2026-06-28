import { useSkillPath } from '../../context/SkillPathContext'
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
      <div className="progress-row" key={skill.label || skill.skillName}>
        <div className="progress-label">
          <span>{skill.label || skill.skillName}</span>
          <span>{skill.value || skill.currentLevel || 0}%</span>
        </div>
        <ProgressBar value={skill.value || skill.currentLevel || 0} status={skill.status || skill.skillStatus} />
      </div>
    ))}
  </Card>
)

const RecentActivityCard = ({ activities }) => (
  <Card title="Recent activity">
    {activities.length > 0 ? (
      activities.map((activity, i) => (
        <div className="activity-item" key={i}>
          <div className={`activity-dot dot-${activity.tone}`} />
          <div>
            <div className="activity-text">{activity.text}</div>
            <div className="activity-time">{activity.time}</div>
          </div>
        </div>
      ))
    ) : (
      <div style={{ padding: '1rem', color: '#64748b', textAlign: 'center' }}>No recent activity</div>
    )}
  </Card>
)

const DashboardScreen = ({onScreenChange}) => {
  const { userProfile, skillProgress, roadmapSteps, testHistory } = useSkillPath();

  // Calculate dynamic stats
  const completedSteps = roadmapSteps.filter(s => s.status === 'done' || s.stepStatus === 'done').length;
  const avgTestScore = testHistory.length > 0 
    ? Math.round(testHistory.reduce((acc, curr) => acc + curr.score, 0) / testHistory.length) 
    : 0;

  const dynamicStats = [
    { label: 'Goal progress', value: `${userProfile.goalProgress || 0}%`, change: '+4% this week' },
    { label: 'Courses done', value: completedSteps.toString(), change: 'From your roadmap' },
    { label: 'Certifications', value: '3' },
    { label: 'Interview score', value: `${avgTestScore}%`, change: testHistory.length > 0 ? 'Based on latest tests' : 'No tests taken' },
  ];

  // Derive recent activity from test history and roadmap
  const dynamicActivity = [
    ...testHistory.slice(0, 2).map(test => ({
      text: `Completed "${test.testName}"`,
      time: 'Recently',
      tone: test.score >= 80 ? 'green' : 'purple'
    })),
    ...roadmapSteps.filter(s => s.status === 'done').slice(0, 2).map(step => ({
      text: `Finished milestone: ${step.title}`,
      time: 'Previous activity',
      tone: 'blue'
    }))
  ];

  return (
    <section className="screen">
      <PageHeader
        title={`Good morning, ${userProfile.name}`}
        subtitle={`${userProfile.currentRole} -> ${userProfile.targetRole} · ${userProfile.goalProgress}% complete`}
      />
      <AiBanner
        actionLabel="View path"
        onAction={() => onScreenChange('path')}
        subtitle='Complete your next milestone to unlock AI-suggested courses'
        title="AI insight - Keep up the great work on your learning path!"
      />
      <div className="stats-row">
        {dynamicStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
      <div className="two-col">
        <SkillProgressCard skills={skillProgress} />
        <RecentActivityCard activities={dynamicActivity} />
      </div>
    </section>
  )
}

export default DashboardScreen

