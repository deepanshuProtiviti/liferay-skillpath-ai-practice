import { useState } from 'react'
import { useSkillPath } from '../../context/SkillPathContext'
import { coachMessages as initialMessages } from '../../data/skillPathData'
import Icon from '../common/Icon'
import PageHeader from '../common/PageHeader'

const CoachMessage = ({message}) => (
  <div className={`message-wrap ${message.role}`}>
    <div className="msg-label">{message.author}</div>
    <div className={`msg msg-${message.role}`}>
      {Array.isArray(message.text)
        ? message.text.map((line) => <p key={line}>{line}</p>)
        : message.text}
    </div>
  </div>
)

const AICareerCoachScreen = () => {
  const { generateRoadmap, isGenerating } = useSkillPath();
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [background, setBackground] = useState('');
  const [goal, setGoal] = useState('');
  const [showGenerator, setShowGenerator] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessages = [
      ...messages,
      { author: 'You', role: 'user', text: input }
    ];
    setMessages(newMessages);
    setInput('');

    // Mock response logic
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { author: 'SkillPath AI', role: 'ai', text: "That's interesting! I can help you with that. Would you like to generate a personalized learning roadmap based on this goal?" }
      ]);
      setShowGenerator(true);
    }, 1000);
  };

  const handleGenerate = () => {
    if (!background || !goal) return;
    generateRoadmap(background, goal);
    setMessages(prev => [
      ...prev,
      { author: 'SkillPath AI', role: 'ai', text: `Great! I'm generating a new roadmap to help you transition from ${background} to ${goal}. You can check the "My learning path" section in a moment.` }
    ]);
    setShowGenerator(false);
  };

  return (
    <section className="screen">
      <PageHeader
        title="AI career coach"
        subtitle="Powered by Liferay MCP + AI Hub · Knows your profile, skills, and goals"
      />
      
      <div className="chat-messages">
        {messages.map((message, i) => (
          <CoachMessage message={message} key={i} />
        ))}
        {isGenerating && (
          <div className="message-wrap ai">
            <div className="msg-label">SkillPath AI</div>
            <div className="msg msg-ai">Generating your personalized roadmap...</div>
          </div>
        )}
      </div>

      {showGenerator && (
        <div className="generator-box" style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
          <h4 style={{ margin: '0 0 1rem 0' }}>Generate New Roadmap</h4>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#64748b', marginBottom: '0.25rem' }}>Current Background</label>
              <input 
                type="text" 
                placeholder="e.g. Manual Tester" 
                value={background} 
                onChange={(e) => setBackground(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#64748b', marginBottom: '0.25rem' }}>Target Goal</label>
              <input 
                type="text" 
                placeholder="e.g. AI Engineer" 
                value={goal} 
                onChange={(e) => setGoal(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              />
            </div>
          </div>
          <button 
            className="btn-primary" 
            onClick={handleGenerate}
            disabled={isGenerating || !background || !goal}
            style={{ width: '100%' }}
          >
            {isGenerating ? 'Generating...' : 'Confirm & Generate Path'}
          </button>
        </div>
      )}

      <div className="chat-input-row">
        <input 
          placeholder="Ask your AI coach anything about your career..." 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button 
          className="btn-primary icon-submit" 
          type="button" 
          onClick={handleSend}
          aria-label="Send message"
        >
          <Icon name="send" />
        </button>
      </div>
    </section>
  )
}

export default AICareerCoachScreen
