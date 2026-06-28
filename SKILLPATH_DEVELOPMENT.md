# SkillPath AI - Development Tracking

## Project Overview
SkillPath AI is a Liferay-based career development platform that uses AI (via MCP and AI Hub) to analyze user skills, generate personalized learning roadmaps, and track progress through Liferay Objects.

## System Architecture

### 1. Liferay Backend (Client Extensions)
The project uses a **Batch Client Extension** (`skillpath-ai-batch`) to define the data schema.

#### Five Primary Liferay Objects:
| Object Name | External Reference Code | Purpose |
| :--- | :--- | :--- |
| **SP User Profile** | `SP_USER_PROFILE` | Stores user's current role, target role, and total progress. |
| **SP Learning Path Step** | `SP_LEARNING_PATH_STEP` | Stores milestones of the AI-generated roadmap. |
| **SP Skill** | `SP_SKILL` | Tracks proficiency levels in specific technical skills. |
| **SP Mock Test** | `SP_MOCK_TEST` | Logs history of knowledge assessments and scores. |
| **SP Learning Topic** | `SP_LEARNING_TOPIC` | Stores specific modules and topics for each roadmap step. |

### 2. React Frontend (`my-react-app`)
A Vite-based React application served as a Liferay Client Extension.

- **Context API (`SkillPathContext.jsx`)**: Manages global state and coordinates between Liferay APIs and UI components.
- **Service Layer (`src/services/`)**: Contains modular services for interacting with Liferay Headless APIs (`liferayApi.js`, `userProfileService.js`, etc.).
- **Screens**:
  - `DashboardScreen`: Overview of progress and skills.
  - `LearningPathScreen`: Visual roadmap of learning steps.
  - `AICareerCoachScreen`: Interactive chat to set goals and generate roadmaps.
  - `TestsScreen`: Interface for taking mock tests and viewing history.
  - `StepDetailScreen`: (New) Deep-dive into specific learning topics for a step.
  - `ResumeSkillsScreen`: (Future) Resume upload and gap analysis.

---

## Data Flow & Field Mappings

To ensure compatibility between Liferay Objects (backend) and React (frontend), we use the following mappings:

### Learning Path Steps
| Liferay Field | UI Property | Description |
| :--- | :--- | :--- |
| `title` | `title` | Step name |
| `subtitle` | `subtitle` | Details (e.g., "3 courses done") |
| `stepStatus` | `status` | `done`, `active`, or `todo` |
| `priority` | `priority` | Sorting order (asc) |

### Learning Topics (New)
| Liferay Field | UI Property | Description |
| :--- | :--- | :--- |
| `title` | `title` | Module/Topic name |
| `description` | `description` | Detailed content |
| `stepId` | `stepId` | Relation to the Learning Path Step |
| `order` | `order` | Display sequence |

### Skills
| Liferay Field | UI Property | Description |
| :--- | :--- | :--- |
| `skillName` | `label` | Name of the skill |
| `currentLevel` | `value` | Percentage (0-100) |
| `skillStatus` | `status` | `strong`, `medium`, or `low` |

---

## Development Progress

### Phase 1: Infrastructure (Completed)
- [x] Created React application with Vite.
- [x] Implemented UI framework (Vanilla CSS + Component-based design).
- [x] Set up Headless API utility for Liferay integration.

### Phase 2: Object Modeling (Completed)
- [x] Created `skillpath-ai-batch` client extension.
- [x] Defined 4 core Objects with appropriate fields.
- [x] Successfully deployed and verified Objects in Liferay.

### Phase 3: Dynamic Data Integration (Completed)
- [x] Refine `SkillPathContext` to handle field mapping.
- [x] Implement `recordTestResult` to save mock test scores.
- [x] Connect `Dashboard` and `Learning Path` to live Liferay data.
- [x] Verify data persistence in Liferay Control Panel.

### Phase 4: "Start Learning" Feature (Completed)
- [x] Update Batch Extension with `SPLearningTopic` object.
- [x] Create `StepDetailScreen` UI and navigation.
- [x] Implement UI for PDF download functionality.
- [x] Populate mock topic data/fallback logic for step details.

---

## Technical Process
1. **Research**: Analyze Liferay Object definitions and existing React services.
2. **Mapping**: Identify discrepancies between backend field names and frontend expectations.
3. **Implementation**: Update Context and Services to bridge the gap.
4. **Validation**: Test data creation and retrieval in the Liferay environment.

---

## Testing & Verification Procedures

### 1. Verify Initial Data Loading
*   **Action**: Open the React app in Liferay.
*   **Expected**: The Dashboard should show your name from Liferay. If data exists in Liferay (UserProfile), it should load. If not, it falls back to mock data.

### 2. Test "SP Mock Test" & "SP Skill" Flow
*   **Action**: Go to **Mock Tests** screen -> Click **"Start Test"** on any skill.
*   **Expected**: 
    *   New result appears in **Test Performance History**.
    *   **Skill Progress** card on Dashboard updates to match the test score.
    *   **Database Check**: Entry appears in Control Panel -> Objects -> SP Mock Tests.

### 3. Test "AI Career Coach" & "SP Learning Path" Flow
*   **Action**: AI Career Coach -> Generate Roadmap -> Enter background/goal -> Click **Confirm & Generate**.
*   **Expected**:
    *   **My Learning Path** screen shows 4 new generated steps.
    *   **Dashboard** header reflects the new roles.
    *   **Database Check**: Entries appear in Control Panel -> Objects -> SP Learning Path Steps.

### 4. Verify Persistence
*   **Action**: Refresh the browser.
*   **Expected**: All data (roles, history, steps) remains visible, confirming storage in Liferay.
