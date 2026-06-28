import { useSkillPath } from '../../context/SkillPathContext';
import Card from '../common/Card';
import PageHeader from '../common/PageHeader';
import Icon from '../common/Icon';
import Badge from '../common/Badge';

const TestsScreen = () => {
  const { skillProgress, recordTestResult, testHistory } = useSkillPath();

  const handleTakeTest = (skill) => {
    const score = Math.floor(Math.random() * 40) + 60; // Mock score between 60-100
    alert(`Mock Test for ${skill.label} completed! You scored ${score}%. Your profile and skill level have been updated.`);
    recordTestResult(`${skill.label} Assessment`, score, skill.label);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Just now';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
          {testHistory.length > 0 ? (
            testHistory.map((test, i) => (
              <div className="activity-item" key={test.id || i}>
                <div className={`activity-dot ${test.score >= 80 ? 'dot-green' : 'dot-purple'}`} />
                <div>
                  <div className="activity-text">{test.testName}</div>
                  <div className="activity-time">
                    Score: {test.score}% · {test.score >= 70 ? 'Passed' : 'Review Needed'}
                    <br />
                    <small>{formatDate(test.dateCreated)}</small>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state" style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
              <Icon name="clipboard-list" />
              <p>No tests taken yet. Start your first assessment!</p>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};

export default TestsScreen;

