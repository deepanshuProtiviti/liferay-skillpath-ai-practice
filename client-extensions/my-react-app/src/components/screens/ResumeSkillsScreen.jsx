import {skillGaps} from '../../data/skillPathData'
import Badge from '../common/Badge'
import Card from '../common/Card'
import Icon from '../common/Icon'
import PageHeader from '../common/PageHeader'

const SkillLevel = ({level}) => (
  <div className="gap-level" aria-label={`${level} out of 5`}>
    {Array.from({length: 5}, (_, index) => {
      const dotLevel = index + 1
      const className =
        level >= dotLevel ? 'filled' : level > index && level < dotLevel ? 'partial' : ''
      return <div className={`dot ${className}`} key={dotLevel} />
    })}
  </div>
)

const ResumeSkillsScreen = () => (
  <section className="screen">
    <PageHeader
      title="Resume & skill analysis"
      subtitle="Upload your resume - AI extracts skills and shows your gap to target role"
    />
    <div className="resume-zone">
      <Icon name="upload" />
      <div className="resume-title">Drop your resume here</div>
      <div className="resume-sub">PDF or DOCX · AI will analyze instantly</div>
      <button className="btn-sm" type="button">
        Browse file
      </button>
    </div>
    <Card
      title="Skill gap - Java Dev -> Liferay Architect"
      action={<Badge tone="coral">5 gaps found</Badge>}
    >
      {skillGaps.map((gap) => (
        <div className="gap-row" key={gap.skill}>
          <div className="gap-skill">{gap.skill}</div>
          <SkillLevel level={gap.level} />
        </div>
      ))}
      <div className="legend">
        <span className="legend-dot legend-filled" />
        Filled = current skill
        <span className="legend-dot legend-partial" />
        Partial
        <span className="legend-dot" />
        Empty = gap
      </div>
    </Card>
  </section>
)

export default ResumeSkillsScreen
