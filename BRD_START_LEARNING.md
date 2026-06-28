# BRD: SkillPath AI - "Start Learning" Feature

## 1. Objective
Enhance the "My Learning Path" screen by providing deep-dive educational content for each roadmap step, enabling users to transition from "what to learn" to "how to learn" with structured topics and downloadable resources.

## 2. User Flow
1. **Selection**: User navigates to "My Learning Path".
2. **Engagement**: User clicks a new **"Start Learning"** button on an active or pending step.
3. **Transition**: The UI navigates to a **"Step Detail"** screen.
4. **Consumption**: User views a structured list of topics, descriptions, and learning objectives for that specific step.
5. **Portability**: User clicks **"Download Syllabus"** to generate/receive a PDF version of the topic list.

## 3. Functional Requirements

### 3.1 Step Detail Screen
- **Header**: Displays the Step Title (e.g., "Fundamentals of Liferay Architect").
- **Progress Tracker**: Shows if topics are "Read" or "Pending".
- **Topic List**: A vertical list of modules including:
    - Module Title
    - Short Description
    - Estimated time to complete.
- **Back Button**: To return to the main roadmap.

### 3.2 Content Management (Advisor Recommendation)
To keep the system flexible and dynamic, I suggest a **Hybrid Approach**:

1.  **Liferay Objects (`SP_LEARNING_TOPIC`)**: 
    - **Why**: Use this for the *list of topics* shown on the screen. It allows the AI to dynamically populate topics for any new roadmap it generates.
    - **Fields**: `stepId` (Foreign Key), `title`, `description`, `order`.
2.  **Documents & Media**:
    - **Why**: Use this for *heavy resources* (Detailed PDF guides, whitepapers). 
    - **Integration**: The `SP_LEARNING_TOPIC` object can contain a URL field pointing to a specific file in Liferay's Documents & Media.

### 3.3 PDF Generation
- **Requirement**: A button to export the syllabus.
- **Implementation**: 
    - **Option 1 (Client-side)**: Use `jsPDF` or `html2canvas` in React to print the current screen.
    - **Option 2 (Liferay-native)**: Provide a direct link to a pre-uploaded "Syllabus.pdf" in Documents & Media. (Recommended for Phase 1).

## 4. Proposed Content Example: "Fundamentals of Liferay Architect"
*This data will be stored in our new Liferay Object.*

| Module | Topic | Description |
| :--- | :--- | :--- |
| 1 | **OSGi & Blade CLI** | Mastering the modularity framework and workspace management. |
| 2 | **Liferay Objects & Schema** | Advanced modeling, relationships, and state managers. |
| 3 | **Headless Architecture** | REST/GraphQL APIs and OpenAPI integration patterns. |
| 4 | **Client Extension Patterns** | Choosing between IFrame, Custom Element, and Batch. |
| 5 | **Security & Auth** | OAuth2 flows, JWT, and Service Access Policies. |

## 5. Next Steps
1.  **Update Batch Extension**: Add the `SPLearningTopic` object definition.
2.  **Create Service**: Add `learningTopicService.js` in React.
3.  **UI Implementation**: Create `StepDetailScreen.jsx` and update `LearningPathScreen.jsx`.
4.  **Integration**: Link the "Start Learning" button to the new screen.
