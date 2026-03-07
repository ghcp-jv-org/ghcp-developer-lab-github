# Coding Agent Demo - Part One

Welcome to the GitHub Copilot Coding Agent demo! Up to this point, you've seen how Copilot assists with suggestions, chat, planning, and context. The coding agent takes that a step further by letting Copilot actively work on tasks across your codebase - analyzing requests, planning steps, and making changes across multiple files.

This demo focuses on how the coding agent works, when to use it, and how it helps automate larger development tasks.

---

## What You'll Learn

By the end of this demo, you will:

- Understand what the Copilot Coding Agent is and how it differs from agent mode
- Know the plan-act-observe loop that drives the coding agent
- Understand the difference between agent mode (IDE) and coding agent (GitHub)
- Know how to use custom agents and agent skills with the coding agent
- Navigate the Agents tab and Mission Control on GitHub
- Assign issues to Copilot and review the resulting pull requests
- Create pull requests directly from chat and use Copilot for code review
- Extend the coding agent using MCP

**Estimated Time:** 30-35 minutes

---

## 📌 Agent Mode vs Coding Agent - Quick Reference

| Aspect                | Agent Mode (IDE)                     | Coding Agent (GitHub)                                 |
| --------------------- | ------------------------------------ | ----------------------------------------------------- |
| **Where it runs**     | Inside your IDE (VS Code)            | On the GitHub platform                                |
| **Interaction style** | Real-time, interactive collaboration | Asynchronous, works while you do other things         |
| **Trigger**           | Prompt in Copilot Chat (Agent mode)  | Assign an issue or start a session on GitHub          |
| **Output**            | Direct edits in your local workspace | Pull request with proposed changes                    |
| **Context sources**   | Open tabs, workspace, tools, MCP     | Repo code, PR templates, org/agent instructions       |
| **Best for**          | Live iteration while you code        | Delegating tasks you want completed in the background |

---

## 🧠 Step 1: Understand the Copilot Coding Agent

### 1.1 What is the Coding Agent?

The Copilot Coding Agent is an AI-powered development agent that can work **autonomously** on issues or developer requests.

Unlike traditional assistants that only suggest code in your IDE, the coding agent can run **asynchronously** - you assign it a task or issue, and it works on it while you continue with other work.

**Key characteristics:**

- Follows a **plan → act → observe** loop: creates a plan, takes action (editing files, running tests), checks results, and adjusts if needed
- Works **across multiple files** - if a test fails, it can analyze the failure, locate the relevant code, propose a fix, run the tests again, and repeat
- Has **access to your workspace context** - understands your project structure without you explaining every detail

### 1.2 Agent Mode vs Coding Agent

**Discussion exercise:** Before reading ahead, discuss with your group:

1.  When would you use agent mode in the IDE instead of the coding agent on GitHub?
2.  What types of tasks are better suited for asynchronous work?

**Key differences:**

- **Agent mode** runs inside your IDE - it acts as a real-time collaborator, helping iterate on code, run tests, and adjust results directly in your development environment.
- **The coding agent** runs on the GitHub platform - it picks up assigned issues, analyzes them, writes code, runs tests, and creates a pull request when finished. It can also use PR templates, organization instructions, and agent-specific instructions.

**💡 Pro Tip:** Use agent mode when you want to think alongside Copilot in real time. Use the coding agent when you have a well-defined task you want completed while you focus on other work.

---

## 🚀 Step 2: Commit and Push Your Code to GitHub

Before the coding agent can work on your repository, your latest local changes need to be available on GitHub.

**Exercise:**

1.  Open the **Source Control** panel in VS Code (`Ctrl+Shift+G`).
2.  Review the list of changed files. Stage all changes by clicking the **+** icon next to **Changes**, or run:

```
git add .
```

1.  Enter a commit message (e.g., `Initial setup for coding agent lab`) and commit:

```
git commit -m "Initial setup for coding agent lab"
```

1.  Push your branch to GitHub:

```
git push origin HEAD
```

1.  Verify the push by opening your repository on GitHub and confirming your latest commit appears.

**💡 Pro Tip:** If you haven't set the upstream branch yet, use `git push -u origin <branch-name>` on the first push.

**Alternative: Use Agent Mode with GitHub MCP**

Instead of running manual git commands, you can ask Copilot in **Agent** mode to handle the commit and push for you. Make sure the GitHub MCP server is configured in `.vscode/mcp.json`, then run:

```
Commit all current changes with the message "Initial setup for coding agent lab" and push to the remote repository.
```

Copilot will stage, commit, and push your changes using the available terminal and MCP tools.

---

## 🎯 Step 3: Explore the Agents Tab and Mission Control

### 3.1 The Agents Tab

GitHub includes an **Agents tab** directly inside a repository where you can manage work done by the Copilot coding agent.

**Exercise:**

1.  Open your repository on GitHub.
2.  Look for the **Agents** tab in the repository navigation (you'll only see it when the Copilot coding agent is enabled for that repository).
3.  Explore the interface - note the ability to start new agent sessions and track progress.

**What to observe:**

- Each session shows a **timeline** of what the agent is doing
- You can see **tool calls**, **file changes**, **command outputs**, and the steps the agent takes
- Terminal commands and code updates are visible for transparency

**💡 Pro Tip:** If you prefer working from the terminal, you can also resume the same session using Copilot CLI, continuing exactly where the agent left off.

### 3.2 Mission Control

Mission Control is the centralized interface for managing and monitoring Copilot coding agent work on GitHub.

**Exercise:**

1.  Open an existing agent session from the Agents tab (or wait until you create one in Step 6).
2.  Explore the Mission Control layout:
    - **Right panel:** Session details and summaries
    - **Main panel:** Steps the agent is taking (reading files, running commands, updating code)
3.  Open and review **file diffs** directly from the session to see exactly what the agent changed.
4.  Note the option to **add instructions while the session is running** - Copilot adjusts its plan after the current step finishes.

**Key idea:** Mission Control gives you visibility and control over what the coding agent is doing while it works - everything in one place instead of jumping between multiple pages.

---

## 📚 Step 4: Custom Agents and Agent Skills

### 4.1 Custom Agents for Issues

When you assign an issue to Copilot, you can also **select or create a custom agent** - tailoring how Copilot approaches that task instead of relying on default behavior.

A custom agent is essentially a **role with defined instructions and tools**. For example, you might create an agent focused on UI work, debugging, testing, or Kubernetes configuration.

**Exercise: Review existing custom agents**

This repository already has custom agents defined. Review them to understand the pattern:

1.  Open `.github/agents/security-review.agent.md` and `.github/agents/frontend-standards.agent.md`.
2.  Note the structure: **role**, **scope**, **tool access**, **required checks**, and **output format**.

**Discussion:**

- What other custom agents would be useful for your team's workflow?
- How would a custom agent for "database migrations" or "API endpoint development" differ from the existing ones?

### 4.2 Agent Skills

Agent Skills teach Copilot a **repeatable workflow** it can reuse whenever a task matches the skill description.

A skill is a folder containing a `SKILL.md` file along with any examples, scripts, or resources Copilot needs to follow that workflow.

**Key characteristics:**

- Skills are **loaded on demand** - Copilot only uses them when your request matches, keeping things lightweight for simple prompts
- Skills can be **packaged and shared** - teams reuse the same workflows across repositories and environments
- Useful for common processes like **testing, debugging, or deployments** where you want consistent steps every time

**Exercise: Explore the existing skill**

1.  Open `.github/skills/ui-test-generation/SKILL.md` and skim the workflow it defines.
2.  Note the structure: description, trigger conditions, workflow steps, and resources.
3.  Compare it to a prompt file (`.github/prompts/`) - skills are **relevance-triggered** (automatic) while prompt files are **manually invoked** (`/slash` command).

**How skills differ from other customizations:**

| Customization       | Invocation          | Best For                      |
| ------------------- | ------------------- | ----------------------------- |
| Custom Instructions | Automatic           | Always-on standards           |
| Prompt Files        | Manual (`/name`)    | Repeatable task templates     |
| Custom Agents       | Explicit selection  | Role-based task workflows     |
| Agent Skills        | Relevance-triggered | Reusable multi-step workflows |

---

## 🏗️ Step 5: Agent Architecture - Behind the Scenes

### How the Plan-Act-Observe Loop Works

Understanding the architecture helps you write better issues and prompts for the coding agent.

**The loop:**

1.  **User input** - You enter a prompt or assign an issue.
2.  **Context gathering** - Copilot gathers additional context from the workspace, machine environment, and available tools.
3.  **Planning** - The LLM plans what actions are needed.
4.  **Action** - Copilot calls tools: reading files, editing code, running commands in the terminal.
5.  **Observation** - Results are sent back to the model. The model evaluates what happened.
6.  **Iteration** - If errors appear (build failures, test issues), Copilot adjusts the plan and tries another approach.
7.  **Completion** - The loop continues until the task is finished.

**Key idea:** The coding agent is not just generating code once - it continuously reasons, uses tools, and improves its output until the task is finished. And because tools can be extended through Model Context Protocol, Copilot can also connect to external services or workflows.

### Exercise: Observe the Loop in Agent Mode (Local)

Before using the coding agent on GitHub, observe the same loop locally in your IDE:

1.  Switch to **Agent** mode in Copilot Chat.
2.  Run the following prompt:

```
Add a "Featured" badge overlay to photos in the gallery grid where the photo has a "featured" tag.
Update the mock data so at least two photos have this tag.
Run the build to verify there are no errors.
```

Watch the iteration steps and note:

- Which files Copilot reads first (context gathering)
- What edits it proposes (action)
- Whether it runs a build or lint check (validation)
- If it self-corrects after an error (iteration)

After completion, review the changes and confirm:

- Mock data in `src/lib/mock-photo-data.ts` has featured entries
- `GalleryGrid.tsx` or `PhotoCard.tsx` renders the badge conditionally
- The build passes without errors

**Expected Result:** You see Copilot loop through multiple steps (read → edit → validate → fix) until the feature works end-to-end.

---

## 🚀 Step 6: Assign Issues to Copilot

### 6.1 Create and Assign an Issue

One of the simplest ways to use the coding agent is by assigning it to a GitHub issue.

**Exercise:**

Go to your repository on GitHub and create a new issue with the following title and description:

**Title:** `Add a photo count badge to each gallery collection card`

**Description:**

Assign **GitHub Copilot** as the assignee (select Copilot just like you would assign a teammate).

Observe that you are automatically assigned to the issue as well, keeping you in the loop.

Wait for Copilot to begin working on the issue.

### 6.2 Track Progress

1.  Navigate to the **Agents** tab in your repository.
2.  Find the session associated with your issue.
3.  Watch the timeline as Copilot:
    - Analyzes the issue description
    - Plans the implementation steps
    - Reads relevant files
    - Makes code changes
    - Runs tests or builds

**Expected Result:** Copilot opens a pull request with the proposed changes when the task is complete.

---

## 📝 Step 7: Review and Create Pull Requests

### 7.1 Review Copilot's Pull Request

1.  Open the pull request created by Copilot from Step 6.
2.  Click **View Session** to see Copilot's workflow and decision-making process.
3.  Return to the PR and select **View Changes** to inspect the code modifications.
4.  Review the changes:
    - Are the acceptance criteria from the issue met?
    - Does the code follow the project's conventions (TypeScript, Tailwind, component patterns)?
    - Are there any issues you would flag in a normal code review?

### 7.2 Create a PR from Chat

Instead of starting with an issue, you can also create a pull request directly from the Agents page.

**Exercise:**

1.  Go to the **Agents** tab on GitHub.
2.  Choose your repository and describe the change:

```
Add a "Load More" button to the bottom of the gallery page that loads additional photos from mock data when clicked. Use the existing Tailwind button styles and include a loading state.
```

1.  Observe how Copilot:
    - Analyzes the request
    - Works through the implementation
    - Generates a pull request with the proposed changes

### 7.3 Use Copilot for Code Review

You can also assign Copilot to review pull requests, just like assigning issues.

**Exercise:**

1.  Open any existing pull request in your repository (or one created by Copilot).
2.  Assign **Copilot** as a reviewer.
3.  Observe how Copilot analyzes the changes and leaves comments or suggestions.

**Expected Result:** Copilot provides code review feedback, helping catch issues and improve code quality before merging.

---

## 🔌 Step 8: Extend the Coding Agent with MCP

MCP (Model Context Protocol) lets you connect the coding agent to **external tools and services**, so it can go beyond the repository and interact with other systems.

### 8.1 Understand MCP Configuration for the Coding Agent

As a repository administrator, you can configure MCP servers in the repository settings using a JSON configuration that defines which external tools Copilot can access.

**Exercise: Review the existing MCP configuration**

1.  Open `.vscode/mcp.json` in your workspace (created in the Customize Copilot demo).
2.  Review the configured servers and the tools they expose.

**How MCP extends the coding agent:**

- The coding agent can **pull information** from services like Sentry, Notion, or Azure during its workflow
- It can **interact with APIs** to gather context or perform actions
- This allows Copilot to integrate with your broader development ecosystem

### 8.2 Exercise: Use MCP Tools with the Coding Agent

Create a new issue in your repository:

**Title:** `Summarize recent repository activity and suggest next priorities`

**Description:**

Assign Copilot to the issue.

Observe whether Copilot discovers and uses MCP tools during the session.

**Expected Result:** Copilot fetches live data from GitHub via MCP tools and combines it with repository context to produce a meaningful summary.

**💡 Pro Tip:** MCP makes the coding agent more capable for complex tasks that require context from outside the repository - such as checking error monitoring services, retrieving documentation, or querying project management tools.

---

## ✅ Completion Checklist

Mark each item as you complete it:

- Understand the difference between agent mode (IDE) and coding agent (GitHub)
- Committed and pushed local changes to GitHub
- Explored the Agents tab and Mission Control on GitHub
- Reviewed existing custom agents and agent skills in the repository
- Observed the plan-act-observe loop in agent mode locally
- Created and assigned an issue to Copilot
- Reviewed a Copilot-generated pull request and viewed the session details
- Created a pull request directly from the Agents page
- Used Copilot as a code reviewer on a pull request
- Understood how MCP extends the coding agent

---

## 🚀 What's Next?

You've completed Part One of the Coding Agent demo. Continue to Part Two below to learn best practices for getting the most out of the coding agent.

---

---

# Coding Agent Demo - Part Two: Best Practices

The coding agent is powerful, but it works best when you give it the right setup and inputs. In Part Two you will learn how to write well-scoped issues, choose the right tasks, iterate through PR comments, apply custom instructions, extend with MCP, pre-install dependencies, and manage the agent at the organization level.

---

## What You'll Learn

By the end of this demo, you will:

- Write well-scoped issues that produce high-quality coding agent results
- Know which types of tasks are a good fit for the coding agent and which to avoid
- Use pull request comments to iterate on Copilot's implementation
- Apply custom instructions so the agent follows your team's standards
- Extend the coding agent with MCP for external tool access
- Configure `copilot-setup-steps.yml` to pre-install dependencies
- Understand organization-level policies for managing the coding agent

**Estimated Time:** 25-30 minutes

---

## 📌 Best Practices - Quick Reference

| Practice                    | Why It Matters                                                   |
| --------------------------- | ---------------------------------------------------------------- |
| Well-scoped issues          | Clearer prompt = better results                                  |
| Right task type             | Agent excels at defined work, not exploratory or sensitive tasks |
| PR comment iteration        | Guide the agent like a teammate in code review                   |
| Custom instructions         | Align output with team conventions automatically                 |
| MCP extensions              | Let the agent access external tools and data                     |
| Pre-installed dependencies  | Faster builds, fewer environment failures                        |
| Organization-level policies | Controlled rollout across repos and teams                        |

---

## 🎯 Step 1: Writing Well-Scoped Issues

The issue you assign becomes the prompt for the coding agent. The clearer and more specific it is, the better the results will be.

### 1.1 Anatomy of a Good Issue

A well-scoped issue includes:

- **Clear description** of the problem or task - what needs to be built, fixed, or improved
- **Acceptance criteria** - what a successful solution looks like (e.g., tests pass, behavior changes, UI updates)
- **Relevant context** - specific files, components, or areas of the codebase involved

### 1.2 Exercise: Compare Weak vs Strong Issues

**Weak issue (too vague):**

> Title: `Fix the gallery`
>
> Description: The gallery isn't working right. Please fix it.

**Strong issue (well-scoped):**

> Title: `Fix photo filter not clearing when switching gallery categories`
>
> Description: When a user selects a tag filter in the gallery and then switches to a different category, the filter selection persists but the results don't update correctly.
>
> **Steps to reproduce:**
>
> 1.  Go to the gallery page
> 2.  Select the "Nature" tag filter
> 3.  Switch to a different category
> 4.  Observe that filtered results are stale
>
> **Expected behavior:** Switching categories should reset all active filters and display the correct unfiltered results.
>
> **Acceptance criteria:**
>
> - Tag filters reset when category changes
> - Gallery grid updates immediately with correct results
> - No console errors
> - Existing filter tests still pass
>
> **Relevant files:** `src/components/gallery/GalleryGrid.tsx`, `src/lib/mock-photo-data.ts`

**Discussion:** What makes the strong issue more effective for the coding agent? Which parts give the agent the most useful context?

### 1.3 Exercise: Write Your Own Well-Scoped Issue

1.  Think of a small improvement or bug fix for the Photo Gallery application.
2.  Write a GitHub issue following the strong issue pattern above. Include:
    - A clear title
    - Problem description with context
    - Acceptance criteria (at least 3 items)
    - Relevant files in the codebase
3.  Create the issue on GitHub but **do not assign it yet** - you'll use it in a later step.

---

## 📋 Step 2: Choosing the Right Type of Tasks

Not every task is a good fit for the coding agent. Choosing the right type of work is important.

### 2.1 Good Fit vs Poor Fit

| Good Fit                                     | Poor Fit                                               |
| -------------------------------------------- | ------------------------------------------------------ |
| Simple, well-defined bug fixes               | Large refactoring across multiple systems              |
| UI component updates                         | Broadly scoped changes requiring deep system knowledge |
| Improving test coverage                      | Security, authentication, or sensitive data changes    |
| Updating documentation                       | Production incident fixes                              |
| Addressing focused technical debt            | Ambiguous or poorly defined tasks                      |
| Adding a new feature with clear requirements | Exploratory work where learning is the goal            |

### 2.2 Exercise: Classify Tasks

Read each task below and decide if it's a **good fit** or a **poor fit** for the coding agent. Discuss your reasoning with your group.

1.  "Add alt text to all images in the gallery grid for accessibility"
2.  "Redesign the entire application architecture to use a microservices pattern"
3.  "Update the mock data to include 5 more photo entries with realistic values"
4.  "Fix the production outage affecting user authentication"
5.  "Add unit tests for the `PhotoCard` component"
6.  "Explore whether we should migrate from Next.js to Remix"
7.  "Add dark mode support to the `StatsGrid` component"
8.  "Refactor the entire codebase to use a new state management library"

**Answers**

1.  **Good fit** - well-defined, scoped to specific components
2.  **Poor fit** - too broad, requires deep architectural decisions
3.  **Good fit** - simple, well-defined data task
4.  **Poor fit** - sensitive, production-critical
5.  **Good fit** - clear scope, testable outcome
6.  **Poor fit** - exploratory, learning-focused
7.  **Good fit** - focused feature with clear scope
8.  **Poor fit** - too broad, high risk across entire codebase

### 2.3 Exercise: Assign Your Issue

1.  Go back to the issue you created in Step 1.3.
2.  Evaluate it against the Good Fit criteria above - is it appropriate for the coding agent?
3.  If it's a good fit, assign **GitHub Copilot** to the issue.
4.  Track the agent's progress in the **Agents** tab.

---

## 💬 Step 3: Iterating with Pull Request Comments

Working with Copilot on a pull request follows the same process as collaborating with another developer.

### 3.1 How PR Comments Work with the Coding Agent

- You leave **comments directly on the pull request** describing what should be improved or adjusted
- Copilot reads those comments, understands the requested changes, and updates the code
- This makes it easy to **iterate on the implementation**, just like a normal code review conversation
- If you have several pieces of feedback, it's best to **start a review and submit all comments together**, so Copilot addresses them as a single set of updates

### 3.2 Exercise: Review and Comment on Copilot's PR

1.  Open the pull request Copilot created from your issue in Step 2.3.
2.  Review the code changes and identify at least **two improvements**, for example:
    - A variable name that could be more descriptive
    - A missing edge case in the logic
    - A style that doesn't match project conventions
    - A missing or incomplete test
3.  Click **Review changes** and add your comments as a **single review** (not individual comments).
4.  Submit the review and observe how Copilot processes your feedback and pushes updated commits.

**Expected Result:** Copilot addresses your review comments and updates the PR, similar to how a teammate would respond to code review feedback.

**💡 Pro Tip:** Be specific in your comments. Instead of "this needs improvement," say "rename this variable from `x` to `photoCount` for clarity" or "add a test case for an empty array input."

---

## 📐 Step 4: Custom Instructions for the Coding Agent

Custom instructions help guide how the coding agent works in your repository, defining coding standards, architecture patterns, and team conventions.

### 4.1 How Custom Instructions Apply

- Custom instructions give Copilot **additional context** when it generates or modifies code
- They act as **shared guidance** so the agent follows the same rules and expectations your developers do
- Instructions can cover naming conventions, file structure, testing requirements, commit message formats, and more

### 4.2 Exercise: Review Existing Instructions

This repository already has custom instructions configured. Review them:

1.  Open `.github/copilot-instructions.md` and note the project-wide conventions it defines.
2.  Open `.github/instructions/mock-data.instructions.md` and note the scoped rules for mock data files.
3.  Open `.github/instructions/photo-components.instructions.md` and note the scoped rules for components.

**Discussion:**

- Which instructions would be most important for the coding agent to follow?
- What additional instructions would help the agent produce code that matches your team's standards?

### 4.3 Exercise: Verify the Agent Follows Instructions

Create a new issue on GitHub:

**Title:** `Add a new mock data file for photographer profiles`

**Description:**

```
Create a new file src/lib/mock-photographer-data.ts with sample photographer
profile data.

Acceptance criteria:
- Follows the conventions in mock-data.instructions.md
- Exports a TypeScript interface for photographer profiles
- Includes at least 5 entries with realistic values
- Includes at least one optional field
- Sorted by a date field in descending order
- Has a JSDoc comment above the exported array
```

Assign **GitHub Copilot** to the issue.

When the PR is created, review it against the rules in `mock-data.instructions.md`:

- Does it export a TypeScript interface?
- Are the values realistic (not "test1", "foo")?
- Is there an optional field?
- Is the array sorted by date descending?
- Is there a JSDoc comment?

**Expected Result:** The agent's output aligns with the scoped instructions without you restating those rules in the issue.

---

## 🔌 Step 5: Extending the Coding Agent with MCP

MCP provides a standard way to connect the coding agent to external tools and data sources, allowing it to use capabilities beyond what's inside the repository.

### 5.1 Best Practices for MCP with the Coding Agent

- **Only grant the access that is needed** - keep the agent focused and reduce unnecessary complexity
- **Review MCP configurations carefully** - make sure the correct tools and permissions are set before using them
- MCP servers can provide access to **third-party services**, **internal tools**, or **additional systems** the agent can use while completing tasks

### 5.2 Exercise: Review and Validate MCP Configuration

1.  Open `.vscode/mcp.json` and review the configured MCP servers.
2.  For each server, answer:
    - What tools does this server expose?
    - Are these tools necessary for the coding agent's work?
    - Are the permissions appropriately scoped?
3.  If you see any tools that are too broad or unnecessary, discuss with your group how you would tighten the configuration.

### 5.3 Exercise: Test MCP-Assisted Issue

Create a new issue that requires external context:

**Title:** `Document the current state of open issues and suggest priorities`

**Description:**

```
Using available MCP tools, analyze the current list of open issues in this
repository. Create a markdown summary document at docs/issue-priorities.md
that includes:

- Total number of open issues
- Issues grouped by label or category
- Suggested priority order with brief justification

Acceptance criteria:
- Summary is accurate and reflects current repository state
- Markdown file is well-formatted
- Priorities are justified based on issue content
```

Assign Copilot to the issue.

In the session, observe whether Copilot uses MCP tools to fetch live issue data.

**Expected Result:** The agent uses MCP tools to query GitHub data and produces a summary grounded in real repository state rather than guessing.

---

## ⚙️ Step 6: Pre-Install Dependencies in Copilot's Environment

The coding agent runs in its own **ephemeral development environment** powered by GitHub Actions. For the agent to work effectively, the project needs to build and run successfully in that environment.

### 6.1 Why Pre-Installing Matters

- If dependencies are **missing or installation takes too long**, the agent's work is slowed down
- Pre-installing required dependencies ensures the agent can **build, test, and validate changes faster**
- This is done by configuring a `copilot-setup-steps.yml` file in `.github/`

### 6.2 Exercise: Review or Create Setup Steps

1.  Check if `.github/copilot-setup-steps.yml` already exists in your repository.
2.  If it doesn't exist, create it with the following content:

```
steps:
  - name: Setup Node.js
    uses: actions/setup-node@v4
    with:
      node-version: "20"
      cache: "npm"

  - name: Install dependencies
    run: npm ci
```

1.  Commit and push the file to your repository.

**Discussion:**

- What other setup steps might your project need? (e.g., database seeds, environment variables, build tools)
- How does pre-installing dependencies compare to letting the agent install them on the fly?

**💡 Pro Tip:** Keep setup steps minimal and fast. The goal is to prepare the environment, not run the full CI pipeline.

---

## 🔒 Step 7: Managing the Coding Agent at the Organization Level

Organizations can control how the Copilot coding agent is used through policy settings, giving administrators centralized control over where and how the agent is enabled.

### 7.1 Key Management Controls

- **Repository-level access:** Admins can decide which repositories are allowed to use the coding agent and which should be excluded
- **Exclusion reasons:** Repositories with sensitive code, legacy systems, or strict compliance requirements may need to be excluded
- **Access hierarchy:** Enterprise administrators and organization owners control access for organization repositories, while individual users manage settings for their personal repositories

### 7.2 Exercise: Review Organization Policies

1.  If you have access to your organization's settings on GitHub, navigate to:  
    **Organization Settings → Copilot → Policies**
2.  Review the current coding agent policy:
    - Is the coding agent enabled for all repositories, selected repositories, or disabled?
    - Are there any repositories explicitly excluded?
3.  Discuss with your group:
    - Which repositories in your organization should have the coding agent enabled?
    - Which repositories should be excluded and why?
    - Who should have the authority to change these settings?

**Key idea:** Adopt the coding agent in a controlled way - enable it where it adds value while restricting it where needed.

---

## ✅ Part Two Completion Checklist

Mark each item as you complete it:

- Wrote a well-scoped issue with clear acceptance criteria
- Classified tasks as good fit or poor fit for the coding agent
- Assigned an issue to Copilot and tracked its progress
- Left PR review comments and observed Copilot iterate on feedback
- Reviewed existing custom instructions in the repository
- Verified the coding agent follows scoped instructions
- Reviewed MCP configuration and tested an MCP-assisted issue
- Reviewed or created `copilot-setup-steps.yml` for dependency pre-installation
- Discussed organization-level policies for managing the coding agent

---

## 🚀 What's Next?

Congratulations! You've completed both parts of the Coding Agent demo. You now understand how the coding agent works, how to set it up for success, and how to manage it at scale.

Continue exploring by:

- Creating more complex, multi-file issues to test the agent's capabilities
- Refining your custom instructions based on the agent's output quality
- Building custom MCP servers for your team's internal tools
- Establishing team guidelines for which tasks to assign to the coding agent
- Setting up `copilot-setup-steps.yml` across your organization's repositories

Happy coding!
