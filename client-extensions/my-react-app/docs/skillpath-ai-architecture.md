# SkillPath AI React Client Extension

## Current Goal

SkillPath AI is a Liferay client extension that will help a logged-in user learn technologies and prepare for a target career path with AI-assisted recommendations.

The application has transitioned from a static wireframe to a dynamic React application with centralized state management, ready for Liferay Headless API integration.

## What Was Implemented

### Phase 1: UI & Structure
- **Component Refactoring:** Moved all UI logic from `App.jsx` into a feature-oriented folder structure (`components/common`, `layout`, `screens`).
- **Dashboard:** Interactive profile progress, skill progress, and recent activity.
- **Learning Path:** Dynamic roadmap visualization with status indicators (todo, active, done).
- **AI Career Coach:** Chat interface with simulated AI responses and a roadmap generator tool.
- **Mock Tests:** Dedicated screen to take assessments that live-update the user's skill proficiency levels.
- **State Based Navigation:** Centralized routing logic in `App.jsx`.

### Phase 2: Dynamic State & Service Layer
- **Centralized State (`SkillPathContext`):** Implemented React Context to manage global state (User, Roadmap, Skills, Tests).
- **Liferay Service Layer (`src/services`):** Created a modular API layer for interacting with Liferay Headless Objects.
  - `liferayApi.js`: Base utility with Auth/CSRF support.
  - `userProfileService.js`, `learningPathService.js`, `skillGapService.js`, `mockTestService.js`.
- **Hybrid Data Support:** The application now auto-detects Liferay environment and switches from mock data to live API calls when Objects are available.

## Frontend Architecture

```text
client-extensions/
  my-react-app/          (Frontend Custom Element)
    src/
      App.jsx
      context/
        SkillPathContext.jsx
      services/
        liferayApi.js
    client-extension.yaml
  skillpath-ai-batch/    (Liferay Objects & Configuration)
    batch/
      object-definitions.batch-engine-data.json
    client-extension.yaml
```

### Project Evolution: The `skillpath-ai-batch` Split
The project was split into two separate client extensions to adhere to Liferay Workspace grouping rules:
*   **Reasoning:** Liferay does not allow mixing `frontend` (Custom Element) and `batch` (Object Definitions) extensions within the same project module. Additionally, `batch` extensions require a dedicated OAuth Headless Server application for authentication.
*   **Implementation:**
    *   Created a dedicated `skillpath-ai-batch` directory.
    *   Consolidated object definitions into a single `batch-engine-data.json` file.
    *   Configured an OAuth application with `Liferay.Object.Admin.REST.everything` scopes to automate object provisioning.

### Visibility & Lifecycle Note (Learning)
*   **Visibility:** Unlike `Custom Element` extensions, `batch` extensions **do not appear** in the "Client Extensions" section of the Liferay Control Panel. 
*   **Behavior:** They function as "Infrastructure-as-Code" (provisioning tools). Once deployed to the `osgi/client-extensions` folder, Liferay processes the definitions, creates the Objects/OAuth configurations, and the task is complete.
*   **Success Indicator:** Success is verified by checking the **Objects** and **OAuth2 Administration** sections, rather than the Client Extension list.

## Liferay Objects Definition (Core Phase)

The following Objects are managed via the `skillpath-ai-batch` client extension:

1. **`SPUserProfile`**: Stores `currentRole`, `targetRole`, and `goalProgress`.
2. **`SPLearningPathStep`**: Stores `title`, `subtitle`, `status`, and `priority`.
3. **`SPSkill`**: Stores `skillName`, `currentLevel`, and `status`.
4. **`SPMockTest`**: Stores `testName`, `score`, and `topic`.

## Deployment & Environment Setup

### 1. Enable MCP Server
Add the following to `configs/local/portal-ext.properties` and restart Liferay:
```properties
feature.flag.LPD-63311=true
```

### 2. Deploy Client Extensions
Run from the workspace root:
```powershell
./gradlew :client-extensions:skillpath-ai-batch:deploy
./gradlew :client-extensions:my-react-app:deploy
```

## Next Architectural Steps

1. **Liferay Object Creation:** Manually create the defined Objects in the Liferay Portal.
2. **Permissioning:** Configure Object permissions to allow the custom element to perform GET, POST, and PATCH operations.
3. **Live Verification:** Deploy the client extension and verify that data persists in Liferay after roadmap generation and test completion.
4. **AI Integration:** Connect the Roadmap Generator to a real AI service (Liferay AI Hub or MCP) instead of mock templates.
5. **Real-time Progress Calculation:** Implement a service to calculate `goalProgress` based on completed roadmap steps.

## Future Data Sources (Planned)

- `Course`: Integration with external or internal learning modules.
- `Certification`: Tracking earned vs. recommended credentials.
- `JobMatch`: Real-time job recommendations based on updated `SPSkill` levels.
- `CoachConversation`: Persisting chat history for the AI career coach.
