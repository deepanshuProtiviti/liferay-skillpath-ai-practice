import {certifications} from '../../data/skillPathData'
import Badge from '../common/Badge'
import Icon from '../common/Icon'
import PageHeader from '../common/PageHeader'

const CertificationCard = ({cert, recommended = false}) => (
  <div className="cert-card">
    <div className={`cert-icon tone-${cert.tone}`}>
      <Icon name={recommended ? 'award' : 'certificate'} />
    </div>
    <div className="cert-content">
      <div className="item-title">{cert.title}</div>
      <div className="item-meta">{cert.meta}</div>
    </div>
    {recommended ? (
      <button className="btn-sm" type="button">
        {cert.action}
      </button>
    ) : (
      <Badge tone="green">{cert.badge}</Badge>
    )}
  </div>
)

const CertificationsScreen = () => (
  <section className="screen">
    <PageHeader title="Certifications" subtitle="Track earned certs and AI-recommended next steps" />
    <div className="section-label">Earned</div>
    {certifications.earned.map((cert) => (
      <CertificationCard cert={cert} key={cert.title} />
    ))}
    <div className="section-label recommended-label">AI recommended next</div>
    {certifications.recommended.map((cert) => (
      <CertificationCard cert={cert} key={cert.title} recommended />
    ))}
  </section>
)

export default CertificationsScreen
