import { useState, useEffect } from 'react';
import { LearningTopicService } from '../../services/learningTopicService';
import Card from '../common/Card';
import PageHeader from '../common/PageHeader';
import Icon from '../common/Icon';
import Badge from '../common/Badge';

const StepDetailScreen = ({ step, onBack }) => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const data = await LearningTopicService.getTopicsByStep(step.id);
        if (data.items && data.items.length > 0) {
          setTopics(data.items);
        } else {
          // Fallback mock data if none in Liferay
          setTopics([
            { title: 'Introduction to ' + step.title, description: 'Basic overview and setting the foundation.', order: 1, duration: '45 mins' },
            { title: 'Core Concepts', description: 'Deep dive into the architecture and key principles.', order: 2, duration: '2 hrs' },
            { title: 'Hands-on Lab', description: 'Practical implementation of the concepts learned.', order: 3, duration: '3 hrs' },
            { title: 'Certification Prep', description: 'Review and preparation for the final assessment.', order: 4, duration: '1.5 hrs' }
          ]);
        }
      } catch (err) {
        console.error('Failed to load topics', err);
      } finally {
        setLoading(false);
      }
    };

    if (step) fetchTopics();
  }, [step]);

  const handleDownloadPdf = () => {
    alert('Preparing your syllabus PDF... (This feature will use Liferay Documents & Media in production)');
    // In production: window.open(step.syllabusUrl, '_blank');
  };

  return (
    <section className="screen">
      <div style={{ marginBottom: '1rem' }}>
        <button className="btn-sm" onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Icon name="arrow-left" /> Back to Roadmap
        </button>
      </div>
      
      <PageHeader
        title={step.title}
        subtitle={step.subtitle || 'Step Detail'}
      />

      <div className="two-col">
        <div style={{ flex: 1.5 }}>
          <Card 
            title="Curriculum Modules" 
            action={
              <button className="btn-primary" onClick={handleDownloadPdf}>
                <Icon name="download" /> Download Syllabus
              </button>
            }
          >
            {loading ? (
              <p>Loading topics...</p>
            ) : (
              <div className="topic-list">
                {topics.map((topic, index) => (
                  <div key={index} className="course-card" style={{ marginBottom: '1rem' }}>
                    <div className="course-left">
                      <div className="course-icon tone-blue">
                        {topic.order || index + 1}
                      </div>
                      <div>
                        <div className="item-title">{topic.title}</div>
                        <div className="item-meta">{topic.description}</div>
                      </div>
                    </div>
                    <Badge tone="blue">{topic.duration || 'Study'}</Badge>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        <div style={{ flex: 1 }}>
          <Card title="Learning Objectives">
            <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.6' }}>
              <li>Understand the core architecture of {step.title}</li>
              <li>Implement best practices for Liferay DXP</li>
              <li>Prepare for certification and real-world application</li>
              <li>Master the integration patterns with AI Hub</li>
            </ul>
            <div style={{ marginTop: '2rem', padding: '1rem', background: '#f0f9ff', borderRadius: '8px', border: '1px solid #bae6fd' }}>
              <h4 style={{ color: '#0369a1', margin: '0 0 0.5rem 0' }}>Pro Tip</h4>
              <p style={{ fontSize: '0.875rem', margin: 0 }}>Take the mock test after completing these modules to boost your skill level by 15%.</p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default StepDetailScreen;
