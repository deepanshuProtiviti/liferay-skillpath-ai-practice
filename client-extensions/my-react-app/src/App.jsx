import {useState} from 'react'
import { SkillPathProvider } from './context/SkillPathContext'
import Topbar from './components/layout/Topbar'
import Sidebar from './components/layout/Sidebar'
import AICareerCoachScreen from './components/screens/AICareerCoachScreen'
import CertificationsScreen from './components/screens/CertificationsScreen'
import DashboardScreen from './components/screens/DashboardScreen'
import InterviewPrepScreen from './components/screens/InterviewPrepScreen'
import JobMatchesScreen from './components/screens/JobMatchesScreen'
import LearningPathScreen from './components/screens/LearningPathScreen'
import ResumeSkillsScreen from './components/screens/ResumeSkillsScreen'
import TestsScreen from './components/screens/TestsScreen'
import StepDetailScreen from './components/screens/StepDetailScreen'
import './App.css'

function App() {
  const [activeScreen, setActiveScreen] = useState('dashboard')
  const [activeStep, setActiveStep] = useState(null)

  const handleStartLearning = (step) => {
    setActiveStep(step)
    setActiveScreen('stepDetail')
  }

  const handleBackToPath = () => {
    setActiveStep(null)
    setActiveScreen('path')
  }

  const renderScreen = () => {
    switch (activeScreen) {
      case 'dashboard': return <DashboardScreen onScreenChange={setActiveScreen} />
      case 'path': return <LearningPathScreen onStartLearning={handleStartLearning} />
      case 'resume': return <ResumeSkillsScreen />
      case 'interview': return <InterviewPrepScreen />
      case 'jobs': return <JobMatchesScreen />
      case 'certs': return <CertificationsScreen />
      case 'chat': return <AICareerCoachScreen />
      case 'tests': return <TestsScreen />
      case 'stepDetail': return <StepDetailScreen step={activeStep} onBack={handleBackToPath} />
      default: return <DashboardScreen onScreenChange={setActiveScreen} />
    }
  }

  return (
    <SkillPathProvider>
      <div className="skillpath-app">
        <Topbar />
        <div className="layout">
          <Sidebar activeScreen={activeScreen === 'stepDetail' ? 'path' : activeScreen} onScreenChange={setActiveScreen} />
          <main className="content">
            {renderScreen()}
          </main>
        </div>
      </div>
    </SkillPathProvider>
  )
}

export default App
