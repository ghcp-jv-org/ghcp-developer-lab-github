---
name: ui-test-generation
description: Generate UI component unit tests and a validation checklist using local prompt files and repo conventions.
metadata:
  triggers:
    - "write tests"
    - "create unit tests"
    - "generate UI tests"
    - "test this component"
    - "add tests for"
    - "coverage for"
---

# UI Test Generation Skill

## Purpose

Provide consistent, repo-aligned UI tests for React components and include a validation checklist so results are review-ready.

## When to Use

Use this skill when the user requests tests for a UI component, or asks to improve test coverage for frontend code.

## Inputs to Collect

1. Target component file (or selection).
2. Related prompt files:
   - `.github/prompts/generate-unit-tests.prompt.md`
3. Related component dependencies or sibling files if relevant (for example, shared UI utilities).

## Workflow

### Step 1: Detect intent

If the user asks to generate, add, or improve UI tests, start this workflow.

### Step 2: Gather context

Collect the following in workspace context:

- Target component file
- `.github/prompts/generate-unit-tests.prompt.md`
- Any related components referenced by the target component
- Existing tests (if any) near the component or in `/tests`

### Step 3: Produce tests

Generate tests that follow repository conventions:

- TypeScript tests (`.test.tsx`)
- Test file colocated with component or in `/tests`
- Use `@testing-library/react` if present in `package.json`

### Step 4: Include validation checklist

Add a checklist that the user can use to verify coverage:

- Rendering (default + optional props)
- Props/variants
- User interactions
- Edge cases
- Accessibility
- Dark mode classes (if applicable)
- Responsive behavior (if applicable)

## Output Format

### 1) Test File

- Provide a complete test file using the correct path and name.
- Keep tests focused and readable.
- Use accessible queries (`getByRole`, `getByLabelText`, and similar).

### 2) Validation Checklist

Provide a checklist formatted like this:

- [ ] Rendering works with default props
- [ ] Optional props render correctly
- [ ] Interaction handlers fire as expected
- [ ] Edge cases covered
- [ ] Accessibility checks included
- [ ] Dark mode classes validated (if applicable)
- [ ] Responsive class changes validated (if applicable)

## Example Invocation

User prompt:

```
Generate UI tests for FeatureCard and add a checklist for validation.
```

Expected output:

- A full `FeatureCard.test.tsx` file
- A validation checklist underneath

## Notes

- Do not invent dependencies. If the testing library is missing, note that and ask the user whether to install it.
- Keep tests deterministic and avoid network calls unless mocked.
