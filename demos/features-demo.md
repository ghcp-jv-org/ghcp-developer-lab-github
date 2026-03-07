# Features Demo

Welcome to this repository! You're probably wondering what it is and how it works. We will be working with this repository for the duration of this training, so it's important to find out what it's doing now!

Let's start by learning how to choose the right Copilot capability for each stage of development.

## What You'll Learn

By the end of this demo, you will:

- Understand how Copilot supports planning, coding, testing, reviews, and operations
- Know how to use Ask, Plan, and Agent modes in Copilot Chat
- Be able to generate and refine code with completions and chat prompts
- Know how to use Copilot for test/debug and local workflow troubleshooting
- Use AI-assisted code completion including inline suggestions, predictive completion, and boilerplate generation
- Leverage developer tool integration with command palette, keyboard shortcuts, and productivity workflows
- Use conversational AI for natural language coding queries and prompt-driven code generation
- Apply context-aware coding assistance with inline chat for in-editor edits and explanations
- Run command-based AI interactions with slash commands (`/explain`, `/tests`, `/fix`)
- Generate code from natural language comments and descriptions
- Explore and understand existing code with AI-powered explanations and code review assistance
- Compare alternative code suggestions and select optimal implementations
- Generate unit tests automatically with AI-assisted test writing

**Estimated Time:** 30-40 minutes

## 🚀 Getting Started

More information on installation can be found in the [README](../README.md) file. For a quick start, use the following steps:

1.  **Open the repository in your IDE** (e.g., VS Code)
2.  **Create new branch:** `git checkout -b USERNAME-copilot-exercises`
3.  **Install packages**: Run `npm install` in the terminal
4.  **Start the development server**: Run `npm run dev`
5.  **Open the project in your browser**: Go to [http://localhost:3000](http://localhost:3000) for a live preview

Continue with the demo by following the steps below.

## 🎯 Step 1: Discover Available Features and Modes

Mode: Ask

**Goal:** See available commands and understand where each mode fits.

**Action:** Type the following command in the Copilot chat:  
Prompt

```
/help
```

**Expected Result:** You'll see a list of available commands and features.

**Follow-up Prompt:**

```
In VS Code Copilot Chat, explain when to use Ask mode, Plan mode, and Agent mode for this repository.
```

**Expected Result:** A practical mode-selection guide grounded in this project.

### 1.2 Developer Tool Integration: Command Palette

**Goal:** Learn to access Copilot features through the VS Code command palette.

**Action:**

1.  **Open the Command Palette:** Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
2.  **Type:** `Copilot` to see all available Copilot commands
3.  **Try these commands:**
    - `GitHub Copilot: Open Chat` - Opens the Copilot Chat panel
    - `GitHub Copilot: Toggle Copilot` - Enable/disable inline suggestions
    - `GitHub Copilot: Open Completions Panel` - See all suggestion alternatives

**Expected Result:** You'll see the full list of Copilot commands available in your IDE.

### 1.3 Keyboard Shortcuts and Productivity Workflows

**Goal:** Master the key shortcuts for efficient Copilot usage.

| Action                    | Windows/Linux | Mac            |
| ------------------------- | ------------- | -------------- |
| Accept inline suggestion  | `Tab`         | `Tab`          |
| Dismiss suggestion        | `Esc`         | `Esc`          |
| See next suggestion       | `Alt+]`       | `Option+]`     |
| See previous suggestion   | `Alt+[`       | `Option+[`     |
| Trigger inline suggestion | `Alt+\`       | `Option+\`     |
| Open Completions Panel    | `Ctrl+Enter`  | `Ctrl+Enter`   |
| Open inline chat          | `Ctrl+I`      | `Cmd+I`        |
| Open Copilot Chat         | `Ctrl+Alt+I`  | `Cmd+Option+I` |

**Action:** Try each shortcut while editing a file. Navigate to any `.tsx` file and practice triggering and cycling through suggestions.

**💡 Pro Tip:** Combine `Alt+]` / `Alt+[` to quickly cycle through alternative suggestions without leaving your editor flow.

---

## 📚 Step 2: Planning in the IDE with Copilot Chat

### 2.1 Get Project Overview

**Prompt:**

```
Give me a summary of the project and give an overview of the most impactful files.
```

**Follow-up Action:**

- Select the first page in the "Most Impactful Files"
- Highlight the first section

### 2.2 Brainstorm and Prioritize Improvements

**Prompt:**

```
Given this codebase, suggest the top 5 practical improvements for maintainability and user experience. Rank by impact and effort.
```

**Expected Result:** Prioritized ideas with clear trade-offs.

### 2.3 Explain Selected Code

**Goal:** Use the `/explain` slash command to get a detailed breakdown of a specific piece of code.

**Action:**

1.  **Open** `src/components/gallery/GalleryGrid.tsx`
2.  **Highlight** the filtering logic - select the section where photos are filtered by tags and search query (look for `.filter(` calls). 
3.  **Open Copilot Chat.** Selection should show up with from and to line numbers. Now type:

```
/explain
```

**What this does:** Copilot will explain the highlighted code section in detail - breaking down the filter chain, how tag matching works, and what each conditional branch does.

**Expected Result:** A plain-English walkthrough of the selected code, making it easy to understand logic you didn't write.

### 2.4 Create a Plan Before Editing

**Prompt:**

```
Create a step-by-step plan to add a small footer update in src/app/layout.tsx with minimal risk. Include validation steps.
```

**💡 Pro Tip:** Use Plan mode for larger or riskier changes before you start editing. If this was implemented in Agent mode, then start the server and validate the completion of the footer. 

### 2.5 Context-Aware Coding with Inline Chat

**Goal:** Use inline chat (`Ctrl+I` / `Cmd+I`) to make targeted edits and get explanations directly in the editor.

**Action:**

1.  **Open a file:** Navigate to `src/components/ui/cards/FeatureCard.tsx`
2.  **Select a code block:** Highlight the component's return statement
3.  **Open inline chat:** Press `Ctrl+I` (Windows/Linux) or `Cmd+I` (Mac)
4.  **Type a request:**

```
Add a hover scale animation to this card using Tailwind classes
```

1.  **Review the diff:** Copilot shows inline changes. Accept with **Accept** or discard with **Discard**. 
2.  If acccepted then validate by going to the home page which shows 3 feature cards ("Smart Upload", "Client Proofing", "Public Sharing"). Hover over each card and you should see it **smoothly scale up to 105%** over 300ms

**Follow-up:** Use inline chat (`Ctrl+I` / `Cmd+I`) and select a different section of code and enter:

```
Explain what this code does line by line
```

**Expected Result:** Copilot provides context-aware explanations and edits right where you're working - no need to switch to the chat panel.

**💡 Pro Tip:** Inline chat is ideal for small, targeted edits and quick explanations in specific code locations.

### 2.6 Command-Based AI Interactions: **Slash Commands**

**Goal:** Use slash commands for quick, command-driven workflows in Copilot Chat.

**Action:** Open Copilot Chat and try each of these slash commands:

`/explain` **\- Explain selected code:**

1.  Highlight the `GalleryGrid` component in `src/components/gallery/GalleryGrid.tsx`
2.  In Copilot Chat, type:

```
/explain
```

`/tests` **\- Generate test cases:**

1.  Highlight the `StatsGrid` component in `src/components/ui/stats/StatsGrid.tsx`
2.  In Copilot Chat, type:

```
/tests Generate unit tests for this component including edge cases for empty stats arrays
```

`/fix` **\- Fix issues in selected code:**

1.  Highlight a function or component that has a potential issue (e.g., the icon color logic in `src/components/ui/cards/FeatureCard.tsx`)
2.  In Copilot Chat, type:

```
/fix
```

**Expected Result:** Each slash command provides a focused, purpose-built response without requiring a lengthy prompt.

**💡 Pro Tip:** Slash commands are faster than typing full prompts for common tasks. Combine them with code selection for best results.

### 2.7 Code Exploration and Learning

**Goal:** Use Copilot to understand unfamiliar code and get code review assistance.

**Action 1 - Understand existing code:**

1.  Open `src/components/upload/UploadZone.tsx`
2.  Select the entire file contents such that the selection shows up in Copilot chat.
3.  Ask in Copilot Chat:

```
/explain Walk me through how this upload component works. Explain the state management, event handlers, and how the drag-and-drop flow is implemented.
```

**Expected Result:** A detailed walkthrough of the component's logic, helping you understand unfamiliar code quickly.

**Action 2 - Code review assistance:**

Select any component file you've modified and ask:

```
Review this code for potential issues: performance concerns, accessibility gaps, error handling, and adherence to React best practices. Suggest specific improvements.
```

**Expected Result:** A code review with actionable suggestions, similar to a peer review.

**Action 3 - Explore patterns across the codebase:**

```
How is state management handled across the components in this project? Are there any inconsistencies in the patterns used?
```

**Expected Result:** An overview of patterns used across the project, helping you learn the codebase conventions.

## 💻 Step 3: Code Creation with Completions + Chat

### 3.1 Inline Suggestions and Code Completions

1.  **Navigate to file:** Open [`src/app/layout.tsx`](src/app/layout.tsx)
2.  **Find location:** Go to line 52 `{/* REPLACE THIS COMMENT */}`
3.  **Remove line 52 comment:** and replace it with the following comment:

```
{
  /* Create a footer for this section. It should contain the logo and copyright information. */
}
```

1.  **Wait for suggestion:** Copilot will suggest code automatically
2.  **Accept suggestion:** Press `Tab` to accept or `Esc` to dismiss
3.  **Check your changes:** Save the file and refresh [http://localhost:3000](http://localhost:3000) to see your new footer

### 3.2 Predictive Code Completion and Real-Time Assistance

**Goal:** Experience how Copilot predicts your next lines of code as you type.

**Action:**

1.  **Open file:** Navigate to `src/lib/mock-photo-data.ts`
2.  **Start typing a new entry:** At the end of the last data array element, after closing brace }, start typing a new object with just the opening brace `{`
3.  **Observe:** Copilot will predict the full object structure based on the existing pattern, filling in fields like `id`, `title`, `url`, etc.
4.  **Accept and continue:** Press `Tab` to accept, then immediately start the next entry and Copilot will continue predicting

**What to notice:**

- Copilot adapts suggestions in real time as you type each character
- Suggestions are context-aware, matching the data structure of surrounding entries
- The more you type, the more specific and accurate the predictions become

### 3.3 Boilerplate Code Generation

**Goal:** Use Copilot to quickly scaffold common code patterns.

**Action 1 - Generate a new component:**

1.  **Create a new file:** `src/components/ui/cards/InfoCard.tsx`
2.  **Type the following comment at the top of the empty file:**

```
// React component InfoCard that displays a title, description, and an optional image.
// Uses Tailwind CSS for styling with dark mode support.
// Props: title (string), description (string), imageUrl (optional string)
```

1.  **Press Enter** and wait for Copilot to suggest the full component boilerplate
2.  **Accept** with `Tab`
3.  If the implementation does not seem complete, then run 'Fix this file based on comments and any ensuing errors' from Copilot chat.
4.  To visualize this component in the web page, run 'How is the output realized in the web page from changes made to this file' and follow directions.

**Action 2 - Generate a TypeScript interface:**

In the same file or a new one, type:

```
// Interface for a photo gallery album containing id, name, description, coverImage, photos array, and creation date
```

**Expected Result:** Copilot generates full boilerplate code from descriptive comments - interfaces, components, hooks, and more.

### 3.4 Natural Language to Code: Comments-Driven Development

**Goal:** Write natural language descriptions and let Copilot generate the corresponding program logic.

**Action:**

1.  **Open** `src/lib/mock-photo-data.ts`
2.  **Add the following comment at the bottom of the file:**

```typescript
// Function that filters photos by tag name, sorts them by date in descending order,
// and returns only the top N results
```

1.  **Press Enter** and let Copilot generate the function implementation
2.  **Accept** and try adding another comment:

```typescript
// Function that groups photos by their category and returns an object where
// keys are category names and values are arrays of photos
```

**Expected Result:** Complete function implementations generated from plain English descriptions.

**💡 Pro Tip:** The more specific your comment, the better the generated code. Include parameter names, return types, and edge case handling in your descriptions.

**Outcome:**

1.   Select the generated code from above and in chat run 'create an implementation that visualizes these on the web portal'.
2.  This should result in a page.tsx and layout.tsx and go to [**http://localhost:3000/explore.**](vscode-file://vscode-app/c:/Users/varghesejoji/AppData/Local/Programs/Microsoft%20VS%20Code/0870c2a0c7/resources/app/out/vs/code/electron-browser/workbench/workbench.html)
3.  On that page:
    - **Filter by Tag** section:  clicking any tag pill calls [getPhotosByTag(tag, 5)](vscode-file://vscode-app/c:/Users/varghesejoji/AppData/Local/Programs/Microsoft%20VS%20Code/0870c2a0c7/resources/app/out/vs/code/electron-browser/workbench/workbench.html) and displays the top 5 most recent photos matching that tag
    - **All Categories** section: uses [groupPhotosByCategory()](vscode-file://vscode-app/c:/Users/varghesejoji/AppData/Local/Programs/Microsoft%20VS%20Code/0870c2a0c7/resources/app/out/vs/code/electron-browser/workbench/workbench.html) to show every category with its photos

### 3.5 Alternative Code Suggestions: Multiple Implementations

**Goal:** View and compare multiple code suggestions from Copilot to select the optimal solution.

**Action:**

1.  **Open** `src/lib/mock-photo-data.ts` and scroll to the bottom of the file
2.  **Type a comment** describing what you want:

```
// Function to search photos by title with case-insensitive partial matching
```

1.  **Open the Completions Panel:** Press `Ctrl+Enter` (Windows/Linux) or `Ctrl+Enter` (Mac) and wait a few seconds.
2.  **Compare suggestions:** The panel shows multiple alternative implementations side by side
3.  **Select the best:** Click **Accept** on the implementation you prefer

**Alternative approach - Cycle inline:**

- Press `Alt+]` to see the next suggestion
- Press `Alt+[` to see the previous suggestion
- Compare the different approaches before accepting

**What to look for when comparing:**

- Performance differences (e.g., `filter` vs. `reduce`)
- Readability and code style consistency
- Edge case handling
- TypeScript type safety

**Expected Result:** You'll see that Copilot can offer different algorithms, patterns, and styles for the same task - empowering you to choose the best fit.

### 3.6 Refine with Chat

After accepting a completion, ask Copilot:

```
Refactor this footer to match the existing styling patterns in this repository and keep dark mode support.
```

**Expected Result:** Cleaner code aligned to project conventions.

## 🧪 Step 4: Testing and Debugging with Copilot

### 4.1 Generate Test Ideas

**Prompt:**

```
Suggest test cases for the footer change in src/app/layout.tsx, including accessibility and responsive behavior checks.
```

### 4.2 Automated Unit Test Generation

**Goal:** Use Copilot to generate complete, runnable unit tests.

**Action 1 - Generate tests with slash command:**

1.  **Open** `src/components/ui/stats/StatsGrid.tsx`
2.  **Select the entire component code**
3.  **In Copilot Chat, type:**

```
/tests
```

**Expected Result:** Copilot generates a full test file with imports, test setup, and multiple test cases.

**Action 2 - Generate tests with a detailed prompt:**

In Copilot Chat, try:

```
Generate a comprehensive unit test file for src/components/gallery/GalleryGrid.tsx using Jest and React Testing Library. Include tests for:
- Rendering with mock data
- Empty state handling
- Filter/tag selection behavior
- Accessibility (ARIA roles, alt text)
- Responsive grid layout classes
```

**Expected Result:** A complete test file you can save and run.

**Action 3 - AI-assisted test writing with inline chat:**

1.  **Create a new test file:** `src/components/ui/cards/FeatureCard.test.tsx`
2.  **Type a comment:**

```
// Tests for FeatureCard component
```

1.  **Press Enter** and let Copilot suggest the test boilerplate
2.  **After accepting**, use inline chat (`Ctrl+I`) on the generated tests and ask:

```
Add edge case tests for missing props and very long text content
```

#### **💡 Pro Tip:** Start with `/tests` for quick generation, then use inline chat to refine and add edge cases incrementally.

### 4.3 Debug a Local Issue

If you see an error, paste it into chat and ask:

```
Help me debug this error from the local terminal/dev server. Explain root cause and give the smallest safe fix.
```

### 4.4 Optional Prompt for Validation

```
Give me a quick manual validation checklist I can run in the browser for this footer update.
```

## 📝 Step 5: Review and Commit Your Changes

### Option A: AI-Powered Review (Premium Feature)

If you have premium access:

1.  **Select generated code:** Highlight the footer code that was created
2.  **Open Copilot menu:** Right-click → Select "Copilot"
3.  **Get review:** Choose "Review and Comment"
4.  **Process feedback:** Review suggestions and accept/discard as needed

### Option B: Manual Review (Free Alternative)

If you don't have premium access:

1.  **Read the code:** Review what was generated
2.  **Check functionality:** Does it match the requirements?
3.  **Verify style:** Does it follow the project's coding standards?

### Commit Your Changes

1.  **Open Source Control:** Click the Source Control icon in the left sidebar
2.  **Generate commit message:** Hover over the commit message box → Click "Generate Commit Message with Copilot"
3.  **Review and edit:** Modify the generated message if needed
4.  **Commit:** Click "Commit" then "Sync Changes" to push

**🎉 Success indicator:** You should see your changes in the git history!

## 🚀 Step 6: Deployment and Operations (IDE Guidance)

Use Copilot Chat to assist with local deployment-readiness and troubleshooting tasks:

**Prompt: CI/CD guidance**

```
Based on this Next.js repository, suggest a minimal CI workflow checklist (lint, build, tests) and common failure points to watch.
```

**Prompt: troubleshooting guidance**

```
If deployment fails with a build error, what local checks should I run first in this project?
```

**Expected Result:** A practical runbook you can use before handing work off.

## ✅ Completion Checklist

Mark off each item as you complete it:

**Developer Tool Integration**

- Used command palette (`Ctrl+Shift+P`) to discover Copilot commands
- Practiced keyboard shortcuts for accepting, dismissing, and cycling suggestions

**Conversational AI & Modes**

- Used `/help` command successfully
- Compared Ask, Plan, and Agent modes for this repo
- Got project summary using Copilot Chat

**Context-Aware Coding & Slash Commands**

- Used inline chat (`Ctrl+I`) to edit code in-place
- Explained code with `/explain`
- Tried `/tests` and `/fix` slash commands

**AI-Assisted Code Completion**

- Generated and refined footer code with inline suggestions
- Experienced predictive code completion in real time
- Generated boilerplate code from descriptive comments

**Natural Language to Code**

- Generated function implementations from natural language comments

**Alternative Code Generation**

- Used Completions Panel (`Ctrl+Enter`) to compare multiple suggestions
- Cycled through alternatives with `Alt+]` / `Alt+[`

**Code Exploration & Learning**

- Used Copilot to understand unfamiliar code
- Got code review assistance from Copilot

**Automated Testing**

- Generated unit tests with `/tests` command
- Created a test file with AI-assisted test writing

**Review & Deployment**

- Reviewed the generated code
- Used Copilot for CI/CD or deployment-readiness guidance
- Committed changes to git

## 🚀 What's Next?

Congratulations! You've completed your first GitHub Copilot demo.

👉 [**Start Engineering Practices Demo**](./engineering-practices.md)
