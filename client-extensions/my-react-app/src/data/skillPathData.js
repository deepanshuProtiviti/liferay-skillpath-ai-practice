export const userProfile = {
  initials: 'AK',
  name: 'Amit',
  currentRole: 'Java Developer',
  targetRole: 'Liferay Architect',
  goalProgress: 68,
}

export const navGroups = [
  {
    label: 'Main',
    items: [
      {id: 'dashboard', label: 'Dashboard', icon: 'home'},
      {id: 'path', label: 'My learning path', icon: 'route'},
      {id: 'resume', label: 'Resume & skills', icon: 'file-text'},
      {id: 'interview', label: 'Interview prep', icon: 'messages'},
      {id: 'jobs', label: 'Job matches', icon: 'briefcase'},
      {id: 'certs', label: 'Certifications', icon: 'certificate'},
      {id: 'tests', label: 'Mock tests', icon: 'clipboard-list'},
    ],
  },
  {
    label: 'AI Tools',
    items: [{id: 'chat', label: 'AI career coach', icon: 'robot'}],
  },
  {
    label: 'Account',
    items: [{id: 'settings', label: 'Settings', icon: 'settings', disabled: true}],
  },
]

export const dashboardStats = [
  {label: 'Goal progress', value: '68%', change: '+4% this week'},
  {label: 'Courses done', value: '12', change: '+2 this month'},
  {label: 'Certifications', value: '3'},
  {label: 'Interview score', value: '87%', change: '+12% improved'},
]

export const skillProgress = [
  {label: 'Liferay DXP', value: 72, status: 'strong'},
  {label: 'Java / OSGi', value: 85, status: 'strong'},
  {label: 'Client Extensions', value: 40, status: 'medium'},
  {label: 'Headless APIs', value: 55, status: 'medium'},
  {label: 'MCP / AI Hub', value: 20, status: 'low'},
]

export const recentActivity = [
  {
    text: 'Completed "Liferay Objects Deep Dive"',
    time: '2 hours ago',
    tone: 'green',
  },
  {
    text: 'Interview session scored 87% - React',
    time: 'Yesterday',
    tone: 'purple',
  },
  {
    text: 'Resume analyzed - 5 skill gaps found',
    time: '2 days ago',
    tone: 'amber',
  },
  {
    text: 'Cert "Oracle Java SE 11" added',
    time: 'Last week',
    tone: 'green',
  },
]

export const roadmapSteps = [
  {
    title: 'Java & OSGi fundamentals',
    subtitle: 'Completed · 4 courses',
    status: 'done',
  },
  {
    title: 'Liferay DXP basics',
    subtitle: 'Completed · 6 courses',
    status: 'done',
  },
  {
    title: 'Client Extensions & Headless',
    subtitle: 'In progress · 2 of 5 courses done',
    status: 'active',
  },
  {
    title: 'AI Hub & MCP integration',
    subtitle: 'Upcoming · 4 courses',
    status: 'todo',
  },
  {
    title: 'Architecture patterns & DXP',
    subtitle: 'Upcoming · 3 courses',
    status: 'todo',
  },
]

export const currentCourses = [
  {
    title: 'Custom Element CX',
    meta: '2.5 hrs · Intermediate',
    icon: 'puzzle',
    tone: 'purple',
    badge: 'Active',
    badgeTone: 'teal',
  },
  {
    title: 'Headless REST & GraphQL',
    meta: '3 hrs · Intermediate',
    icon: 'api',
    tone: 'blue',
    badge: 'Next',
    badgeTone: 'amber',
  },
  {
    title: 'IFrame Client Extension',
    meta: '1.5 hrs · Beginner',
    icon: 'code',
    tone: 'amber',
    badge: 'Locked',
    badgeTone: 'purple',
  },
]

export const skillGaps = [
  {skill: 'Liferay Client Extensions', level: 0.5},
  {skill: 'MCP Server integration', level: 0},
  {skill: 'AI Hub & LLM agents', level: 0},
  {skill: 'Headless API design', level: 2.5},
  {skill: 'Liferay Objects modeling', level: 3},
]

export const interviewTags = [
  {label: 'Liferay DXP', tone: 'teal'},
  {label: 'Client Extensions', tone: 'purple'},
  {label: 'Architecture', tone: 'blue'},
  {label: 'System design', tone: 'amber'},
]

export const jobs = [
  {
    title: 'Liferay DXP Architect',
    company: 'Infosys',
    location: 'Bangalore',
    salary: '₹28-38 LPA',
    match: 94,
    badgeTone: 'teal',
    skills: ['Liferay DXP', 'Client Extensions', 'Java', 'OSGi'],
    missing: 'MCP integration, AI Hub',
  },
  {
    title: 'Senior Liferay Developer',
    company: 'Wipro',
    location: 'Remote',
    salary: '₹18-26 LPA',
    match: 88,
    badgeTone: 'blue',
    skills: ['Liferay', 'React', 'Headless APIs'],
    missing: 'Commerce, Analytics Cloud',
  },
  {
    title: 'DXP Solutions Consultant',
    company: 'TCS',
    location: 'Noida',
    salary: '₹22-30 LPA',
    match: 76,
    badgeTone: 'amber',
    skills: ['Liferay', 'Architecture', 'Client mgmt'],
    missing: 'AI Hub, MCP, Workflow advanced',
  },
]

export const certifications = {
  earned: [
    {
      title: 'Oracle Java SE 11 Developer',
      meta: 'Earned Jan 2024 · Expires Jan 2027',
      tone: 'blue',
      badge: 'Valid',
    },
    {
      title: 'Liferay DXP Business Analyst',
      meta: 'Earned Mar 2024 · No expiry',
      tone: 'purple',
      badge: 'Valid',
    },
  ],
  recommended: [
    {
      title: 'Liferay DXP Developer Certified',
      meta: 'Recommended · Est. 6 weeks prep',
      tone: 'amber',
      action: 'Start prep',
    },
    {
      title: 'AWS Solutions Architect Associate',
      meta: 'Boosts Architect roles by 34%',
      tone: 'teal',
      action: 'View details',
    },
  ],
}

export const coachMessages = [
  {
    author: 'SkillPath AI',
    role: 'ai',
    text: "Hello Amit! Based on your current progress, you're 68% of the way to Liferay Architect. Your strongest area is Java & OSGi. Your biggest gap right now is MCP Server integration and AI Hub. Want me to generate a focused 2-week sprint plan?",
  },
  {
    author: 'You',
    role: 'user',
    text: 'Yes, please create a 2-week plan for MCP and AI Hub',
  },
  {
    author: 'SkillPath AI',
    role: 'ai',
    text: [
      "Here's your 2-week sprint:",
      'Week 1: MCP Server basics -> Enable feature flag -> Connect Cursor to Liferay -> Build first MCP client',
      'Week 2: AI Hub setup -> Create first AI agent -> Wire agent to Liferay Objects -> Build a learning path generator',
      'Estimated: 1.5 hrs/day. Ready to start?',
    ],
  },
]
