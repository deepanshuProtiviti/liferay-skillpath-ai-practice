import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { 
  userProfile as initialProfile, 
  roadmapSteps as initialSteps,
  currentCourses as initialCourses,
  skillProgress as initialSkills
} from '../data/skillPathData';
import { UserProfileService } from '../services/userProfileService';
import { LearningPathService } from '../services/learningPathService';
import { SkillGapService } from '../services/skillGapService';

const SkillPathContext = createContext();

export const SkillPathProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(initialProfile);
  const [roadmapSteps, setRoadmapSteps] = useState(initialSteps);
  const [currentCourses, setCurrentCourses] = useState(initialCourses);
  const [skillProgress, setSkillProgress] = useState(initialSkills);
  const [isGenerating, setIsGenerating] = useState(false);
  const [useLiferay, setUseLiferay] = useState(false);

  // Initialize data from Liferay if available
  useEffect(() => {
    const loadLiferayData = async () => {
      if (window.Liferay && window.Liferay.authToken) {
        try {
          const profile = await UserProfileService.getMyProfile();
          if (profile) {
            setUserProfile({
              ...profile,
              name: window.Liferay.ThemeDisplay?.getUserName() || profile.name
            });
            setUseLiferay(true);
            
            // Load other data
            const steps = await LearningPathService.getMySteps();
            if (steps.items.length > 0) setRoadmapSteps(steps.items);
            
            const skills = await SkillGapService.getMySkills();
            if (skills.items.length > 0) setSkillProgress(skills.items);
          }
        } catch (e) {
          console.log('Liferay Objects not found, falling back to static/mock data', e);
        }
      }
    };
    loadLiferayData();
  }, []);

  const generateRoadmap = useCallback(async (background, goal) => {
    setIsGenerating(true);
    
    if (useLiferay) {
      // 1. Update Profile in Liferay
      await UserProfileService.updateProfile(userProfile.id, {
        currentRole: background,
        targetRole: goal,
        goalProgress: 0
      });

      // 2. Here we would typically call an AI service/MCP
      // For now, we simulate by creating steps in Liferay
      const mockSteps = [
        { title: `Fundamentals of ${goal}`, subtitle: 'Basics', status: 'active', priority: 1 },
        { title: `Advanced ${goal}`, subtitle: 'Bridge', status: 'todo', priority: 2 }
      ];

      for (const step of mockSteps) {
        await LearningPathService.createStep(step);
      }
      
      // Reload from Liferay
      const freshSteps = await LearningPathService.getMySteps();
      setRoadmapSteps(freshSteps.items);
      setIsGenerating(false);
    } else {
      // Fallback to existing mock logic
      setTimeout(() => {
        const newSteps = [
          { title: `Fundamentals of ${goal}`, subtitle: 'Required for your background in ' + background, status: 'active' },
          { title: `Advanced ${goal} concepts`, subtitle: 'Bridging the gap', status: 'todo' },
          { title: `${goal} Project Implementation`, subtitle: 'Practical application', status: 'todo' },
          { title: `Certification in ${goal}`, subtitle: 'Validation of skills', status: 'todo' }
        ];
        setRoadmapSteps(newSteps);
        setUserProfile({ ...userProfile, currentRole: background, targetRole: goal, goalProgress: 0 });
        setIsGenerating(false);
      }, 1500);
    }
  }, [userProfile, useLiferay]);

  const updateSkill = async (skillLabel, newValue) => {
    if (useLiferay) {
      const skill = skillProgress.find(s => s.skillName === skillLabel || s.label === skillLabel);
      if (skill && skill.id) {
        await SkillGapService.updateSkillLevel(skill.id, newValue);
        const freshSkills = await SkillGapService.getMySkills();
        setSkillProgress(freshSkills.items);
      }
    } else {
      setSkillProgress(prev => prev.map(s => 
        s.label === skillLabel ? { ...s, value: newValue, status: newValue > 70 ? 'strong' : newValue > 40 ? 'medium' : 'low' } : s
      ));
    }
  };

  const value = {
    userProfile,
    roadmapSteps,
    currentCourses,
    skillProgress,
    isGenerating,
    generateRoadmap,
    updateSkill,
    setSkillProgress,
    setRoadmapSteps
  };

  return (
    <SkillPathContext.Provider value={value}>
      {children}
    </SkillPathContext.Provider>
  );
};

export const useSkillPath = () => {
  const context = useContext(SkillPathContext);
  if (!context) {
    throw new Error('useSkillPath must be used within a SkillPathProvider');
  }
  return context;
};
