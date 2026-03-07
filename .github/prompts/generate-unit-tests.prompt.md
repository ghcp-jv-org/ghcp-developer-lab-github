---
description: "Generate unit tests for UI components following project conventions"
---

# Unit Test Generator

## Related Files

- /src/components/ui/cards/FeatureCard.tsx
- /src/components/gallery/GalleryGrid.tsx
- /src/components/upload/UploadZone.tsx
- /src/components/ui/layout/Hero.tsx
- /tests/example.spec.ts

## Task

Generate comprehensive unit tests for the selected UI component.

## Output Requirements

- Place test files next to the component or under the `tests/` directory, matching project conventions.
- Use the testing framework already configured in this repository (check `package.json` for test dependencies).
- Name test files using the pattern `<ComponentName>.test.tsx`.

## Test Coverage Rules

1. **Rendering** – Component renders without errors with default and optional props.
2. **Props & Variants** – Each prop combination produces the expected output.
3. **User Interactions** – Click, hover, keyboard, drag-and-drop handlers fire correctly.
4. **Edge Cases** – Empty data, missing optional props, extremely long strings, special characters.
5. **Accessibility** – Correct ARIA roles/labels, keyboard navigation, focus management.
6. **Dark Mode** – If the component supports dark mode classes, verify they apply.
7. **Responsive Behavior** – Verify class changes for different breakpoints where applicable.

## Style Guidelines

- Use `describe` / `it` blocks with clear, human-readable test names.
- Prefer `screen.getByRole` and accessibility queries over test-ids.
- Keep each test focused on a single behavior.
- Add a short comment above each `describe` block explaining what group of behaviors it covers.

## Example Test Structure

    ```tsx
    import { render, screen } from '@testing-library/react';
    import { FeatureCard } from '@/components/ui/cards/FeatureCard';

    // Rendering and prop handling
    describe('FeatureCard', () => {
      it('renders title and description', () => {
        render(<FeatureCard icon={Icon} title="Test" description="Desc" iconColor="text-blue-600" />);
        expect(screen.getByText('Test')).toBeInTheDocument();
      });
    });
    ```
