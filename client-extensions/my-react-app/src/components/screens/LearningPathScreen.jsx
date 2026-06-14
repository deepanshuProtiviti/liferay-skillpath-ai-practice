import { useSkillPath } from '../../context/SkillPathContext'
import AiBanner from '../common/AiBanner'
import Badge from '../common/Badge'
import Card from '../common/Card'
import Icon from '../common/Icon'
import PageHeader from '../common/PageHeader'

const Roadmap = ({ steps }) => (
  <div className="roadmap">
    {steps.map((step, index) => (
      <div className="roadmap-item" key={step.title}>
        <div className="roadmap-step">
          <div className={`step-circle step-${step.status}`}>
            {step.status === 'done' ? <Icon name="check" /> : index + 1}
          </div>
          <div className="step-content">
            <div className="step-title">{step.title}</div>
            <div className="step-sub">{step.subtitle}</div>
          </div>
        </div>
        {index < steps.length - 1 ? <div className="step-line" /> : null}
      </div>
    ))}
  </div>
)

const CourseCard = ({course}) => (
  <div className="course-card">
    <div className="course-left">
      <div className={`course-icon tone-${course.tone}`}>
        <Icon name={course.icon} />
      </div>
      <div>
        <div className="item-title">{course.title}</div>
        <div className="item-meta">{course.meta}</div>
      </div>
    </div>
    <Badge tone={course.badgeTone}>{course.badge}</Badge>
  </div>
)

const LearningPathScreen = () => {
  const { userProfile, roadmapSteps, currentCourses } = useSkillPath();

  return (
    <section className="screen">
      <PageHeader
        title="My learning path"
        subtitle={`${userProfile.currentRole} -> ${userProfile.targetRole} · AI-generated · last updated moments ago`}
      />
      <AiBanner
        actionLabel="Regenerate path"
        subtitle="3 hrs of study will move you to the next milestone"
        title="AI suggests: focus on your current goal this week"
      />
      <div className="two-col">
        <Roadmap steps={roadmapSteps} />
        <Card title="Current step - courses">
          {currentCourses.map((course) => (
            <CourseCard course={course} key={course.title} />
          ))}
        </Card>
      </div>
    </section>
  )
}

export default LearningPathScreen
