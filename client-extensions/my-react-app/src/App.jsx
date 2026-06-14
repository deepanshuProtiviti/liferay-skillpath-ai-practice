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
import './App.css'

const screens = {
  dashboard: DashboardScreen,
  path: LearningPathScreen,
  resume: ResumeSkillsScreen,
  interview: InterviewPrepScreen,
  jobs: JobMatchesScreen,
  certs: CertificationsScreen,
  chat: AICareerCoachScreen,
  tests: TestsScreen,
}

function App() {
  const [activeScreen, setActiveScreen] = useState('dashboard')
  const ActiveScreen = screens[activeScreen] || DashboardScreen

  return (
    <SkillPathProvider>
      <div className="skillpath-app">
        <Topbar />
        <div className="layout">
          <Sidebar activeScreen={activeScreen} onScreenChange={setActiveScreen} />
          <main className="content">
            <ActiveScreen onScreenChange={setActiveScreen} />
          </main>
        </div>
      </div>
    </SkillPathProvider>
  )
}

export default App
