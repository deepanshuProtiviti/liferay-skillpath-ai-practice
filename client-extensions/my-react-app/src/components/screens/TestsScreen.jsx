import { useSkillPath } from '../../context/SkillPathContext';
import Card from '../common/Card';
import PageHeader from '../common/PageHeader';
import Icon from '../common/Icon';
import Badge from '../common/Badge';

const TestsScreen = () => {
  const { skillProgress, updateSkill } = useSkillPath();

  const handleTakeTest = (skill) => {
    const score = Math.floor(Math.random() * 40) + 60; // Mock score between 60-100
    alert(`Mock Test for ${skill.label} completed! You scored ${score}%. Your profile has been updated.`);
    updateSkill(skill.label, score);
  };

  return (
    <section className="screen">
      <PageHeader 
        title="Knowledge Testing" 
        subtitle="Validate your learning with AI-generated mock tests" 
      />
      
      <div className="two-col">
        <Card title="Available Mock Tests">
          <div className="test-list">
            {skillProgress.map(skill => (
              <div key={skill.label} className="course-card">
                <div className="course-left">
                  <div className={`course-icon tone-blue`}>
                    <Icon name="file-text" />
                  </div>
                  <div>
                    <div className="item-title">{skill.label} Assessment</div>
                    <div className="item-meta">15 Questions · 20 Minutes</div>
                  </div>
                </div>
                <button 
                  className="btn-primary" 
                  onClick={() => handleTakeTest(skill)}
                  style={{ padding: '8px 16px', fontSize: '0.875rem' }}
                >
                  Start Test
                </button>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Test Performance History">
          <div className="activity-item">
            <div className="activity-dot dot-green" />
            <div>
              <div className="activity-text">Liferay DXP Fundamentals</div>
              <div className="activity-time">Score: 85% · Passed</div>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-dot dot-purple" />
            <div>
              <div className="activity-text">Java OSGi Deep Dive</div>
              <div className="activity-time">Score: 92% · Excellent</div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default TestsScreen;
