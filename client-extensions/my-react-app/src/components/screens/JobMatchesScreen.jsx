import {jobs} from '../../data/skillPathData'
import Badge from '../common/Badge'
import PageHeader from '../common/PageHeader'
import ProgressBar from '../common/ProgressBar'

const JobCard = ({job}) => (
  <div className="job-card">
    <div className="job-top">
      <div>
        <div className="job-title">{job.title}</div>
        <div className="job-company">
          {job.company} · {job.location} · {job.salary}
        </div>
      </div>
      <Badge tone={job.badgeTone}>{job.match}% match</Badge>
    </div>
    <div className="tag-row">
      {job.skills.map((skill) => (
        <span className="skill-tag" key={skill}>
          {skill}
        </span>
      ))}
    </div>
    <div className="missing-skills">Missing: {job.missing}</div>
    <ProgressBar value={job.match} status={job.match >= 80 ? 'strong' : 'medium'} />
  </div>
)

const JobMatchesScreen = () => (
  <section className="screen">
    <PageHeader
      title="Job matches"
      subtitle="AI matched 14 roles based on your current skills and learning path"
    />
    {jobs.map((job) => (
      <JobCard job={job} key={job.title} />
    ))}
  </section>
)

export default JobMatchesScreen
