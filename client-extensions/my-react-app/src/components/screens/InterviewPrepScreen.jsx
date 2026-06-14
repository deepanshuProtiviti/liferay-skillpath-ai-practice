import {interviewTags} from '../../data/skillPathData'
import Badge from '../common/Badge'
import PageHeader from '../common/PageHeader'

const InterviewPrepScreen = () => (
  <section className="screen">
    <PageHeader
      title="Interview prep"
      subtitle="AI-generated questions for Liferay Architect role · Session #4"
    />
    <div className="filter-row">
      {interviewTags.map((tag) => (
        <Badge key={tag.label} tone={tag.tone}>
          {tag.label}
        </Badge>
      ))}
      <button className="btn-sm push-right" type="button">
        Generate new set
      </button>
    </div>
    <div className="interview-q">
      <div className="q-num">Question 1 of 5</div>
      <div className="q-text">
        Explain the difference between a traditional OSGi module and a Client Extension in
        Liferay DXP. When would you choose one over the other?
      </div>
      <div className="q-tags">
        <span className="skill-tag">Client Extensions</span>
        <span className="skill-tag">OSGi</span>
        <span className="skill-tag">Architecture decision</span>
      </div>
    </div>
    <label className="answer-label" htmlFor="interview-answer">
      Your answer
    </label>
    <textarea
      id="interview-answer"
      placeholder="Type your answer here - AI will evaluate it for completeness, accuracy, and depth..."
      rows="4"
    />
    <div className="action-row">
      <button className="btn-primary" type="button">
        Submit for AI review
      </button>
      <button className="btn-sm" type="button">
        Skip question
      </button>
      <button className="btn-sm push-right" type="button">
        View model answer
      </button>
    </div>
  </section>
)

export default InterviewPrepScreen
