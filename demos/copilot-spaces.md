# GitHub Copilot Spaces Demo

Welcome to the GitHub Copilot Spaces demo! In this exercise, you'll learn how to create and utilize GitHub Copilot Spaces to collaborate on development tasks within the Photo Gallery & Portfolio application.

## What You'll Learn

By the end of this demo, you will:

- Understand what GitHub Copilot Spaces are and their benefits
- Know how to create a new Copilot Space
- Be able to set up a Space with specific goals and context
- Complete development tasks using collaborative AI assistance
- Share and manage Spaces with team members

**Estimated Time:** 20-25 minutes

## 🎯 Step 1: Create Your First Copilot Space

**Goal:** Set up a dedicated Copilot Space for working on gallery features.

### Setup

1.  Go to `https://github.com/copilot/spaces`
2.  Select `Create Space`

### Group A Option: Security Analysis & Hardening

1.  Type in name `Photo Gallery - Security Assessment`
2.  Select the owner `Username` OR `OrgName`
3.  Add in description `Implement security best practices for the photo gallery application`
4.  Select `Save`

**Adding instructions**

1.  Select `Instructions` and add the following prompt:

```
You are a security expert helping to analyze and improve the security posture of a Next.js 15 photo gallery application. Focus on:

- File upload security vulnerabilities and mitigations
- Input validation and sanitization
- Authentication and authorization patterns
- XSS prevention in user-generated content
- Secure image processing and storage
- OWASP Top 10 web application security risks
- Next.js specific security best practices

Provide specific code examples and security recommendations that follow industry standards and OWASP guidelines. Consider both client-side and server-side security measures.
```

1.  Select save

**Adding sources**

1.  Select `Add sources` and select `Add files and repositories`
2.  Add the following files and press `save`

```
src/components/upload/UploadZone.tsx
src/lib/mock-photo-data.ts
src/app/layout.tsx
next.config.ts
```

1.  Select `Add sources` and select `Add text content`
2.  Add the following content. Use title `OWASP Top 10 2021 - Key Security Risks for Web Applications` and press `save`

```
1. **A01 Broken Access Control** - Users can act outside of their intended permissions
2. **A02 Cryptographic Failures** - Failures related to cryptography which often leads to sensitive data exposure
3. **A03 Injection** - User-supplied data is not validated, filtered, or sanitized by the application
4. **A04 Insecure Design** - Risks related to design and architectural flaws
5. **A05 Security Misconfiguration** - Missing appropriate security hardening across any part of the application stack
6. **A06 Vulnerable and Outdated Components** - Using components with known vulnerabilities
7. **A07 Identification and Authentication Failures** - Confirmation of the user's identity, authentication, and session management
8. **A08 Software and Data Integrity Failures** - Code and infrastructure that does not protect against integrity violations
9. **A09 Security Logging and Monitoring Failures** - Failures in logging and monitoring coupled with missing or ineffective integration with incident response
10. **A10 Server-Side Request Forgery** - SSRF flaws occur whenever a web application is fetching a remote resource without validating the user-supplied URL

## Next.js Security Headers

- Content Security Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy

## File Upload Security Considerations

- File type validation
- File size limits
- Malware scanning
- Secure file storage
- Image processing vulnerabilities
```

**Outcome:** You now have a fully configured Copilot Space with security-focused instructions, relevant project source files, and OWASP reference material loaded as context. This Space is ready to use in Step 2, where you'll ask it to perform a security analysis of the photo gallery application.

### Group B Option: Documentation Generation & API Design

> Follow the same [Setup](#setup) steps above to create a new Space, then continue below.

1.  Type in name `Photo Gallery - Documentation Hub`
2.  Select the owner `Username` OR `OrgName`
3.  Add in description `Create comprehensive documentation and API design documentation for the photo gallery application`
4.  Select `Save`

**Adding instructions**

1.  Select `Instructions` and add the following prompt:

```
You are a technical documentation specialist helping to create comprehensive documentation for a Next.js 15 photo gallery application. Focus on:

- API documentation using OpenAPI/Swagger specifications
- Component documentation with usage examples
- Architecture decision records (ADRs)
- User guides and installation instructions
- Code documentation and inline comments
- README improvements and contribution guidelines
- Performance optimization documentation

Follow industry best practices for technical writing, API documentation standards (OpenAPI 3.0), and modern documentation tools. Create clear, actionable documentation that serves both developers and end users.
```

1.  Select save

**Adding sources**

1.  Select `Add sources` and select `Add files and repositories`
2.  Add the following files and press `save`

```
README.md
src/components/ui/index.ts
src/app/page.tsx
package.json
```

1.  Select `Add sources` and select `Add text content`
2.  Add the following content. Use name `Documentation Standards` and press `save`

```
## API Documentation

- OpenAPI 3.0 specification with complete schemas
- Clear endpoint naming and HTTP status codes
- Request/response examples and error handling
- Authentication and rate limiting documentation

## Code Documentation

- Function/method purpose and parameters
- Usage examples and dependencies
- Error conditions and return values
- Performance considerations

## Architecture Documentation

- Decision records (ADRs) with context and rationale
- System design and component relationships
- Deployment and configuration guides
- Troubleshooting and maintenance procedures

## Tools & Formats

- **API Docs**: Swagger UI, Postman, Insomnia
- **Code Docs**: JSDoc, TypeDoc, inline comments
- **Wikis**: GitHub Wiki, Notion, Confluence
- **Static Sites**: Docusaurus, GitBook, MkDocs
```

**Outcome:** You now have a fully configured Copilot Space with documentation-focused instructions, relevant project source files, and documentation standards loaded as context. This Space is ready to use in Step 2, where you'll ask it to generate API specs, component docs, and architecture decision records for the photo gallery application.

### Share your Space \[OPTIONAL\]

**This option is ONLY if you made the Owner an organization**

1.  Select `Share` on the top right side
2.  Update `No Access` to `Viewer`
3.  Copy the link and send to the Option B Group.

**Expected Result:** A new Copilot Space will be created and opened, providing you with a dedicated environment for this development session.

## 🤝 Step 2: Collaborate and Share

**Goal:** Use the Copilot Space you created in Step 1 to complete the task listed below.

**Challenge:** If your group created the Space in an organization, switch Copilot Spaces to try out the other group's Space! I.e, if you chose **Group B** in Step 1, try the **Group A** Space this time and vice versa.

### Group A Option

1.  Go to `https://github.com/copilot/spaces` and open the **Photo Gallery - Security Assessment** Space
2.  Type in the following prompt to analyze security vulnerabilities:

```
I need help identifying and fixing security vulnerabilities in our photo gallery application. Please analyze our file upload component and suggest:

1. How to validate file types securely (not just by extension)
2. Protection against malicious file uploads and XSS attacks
3. Proper input sanitization for photo titles and tags
4. Content Security Policy (CSP) headers for Next.js
5. Rate limiting strategies for upload endpoints

Based on the OWASP Top 10 guidelines, what are the most critical security issues I should address first in this photo gallery application?
```

1.  Ask another question! What else do you want to learn?

### Group B Option

1.  Go to `https://github.com/copilot/spaces` and open the **Photo Gallery - Documentation Hub** Space
2.  Type in the following prompt to create comprehensive documentation:

```
I need to create professional documentation for our photo gallery application. Please help me:

1. Generate an OpenAPI 3.0 specification for our photo management API endpoints
2. Create detailed component documentation with usage examples for our UI components
3. Write an Architecture Decision Record (ADR) for choosing Next.js 15 with TypeScript
4. Improve our README with installation, development, and deployment instructions
5. Create a contributing guide for other developers

Following industry best practices, what documentation structure would you recommend for this type of application?
```

1.  Ask another question! What else do you want to learn?

### Final discussion

**How were you able to collaborate with your team using Copilot Spaces?**

- Shared a single Space with the team so everyone had the same context, instructions, and source files — no need to repeat setup or re-explain the codebase.
- Could hand off the Space link and a teammate could immediately continue the conversation with full context.
- The Space acted as a shared knowledge base, keeping security findings or documentation decisions in one place.

**How did Copilot's suggestions help (or hinder) your collaboration?**

- ✅ Copilot gave consistent, context-aware answers because the instructions and source files were pre-loaded — everyone got responses aligned with the same security/documentation standards.
- ✅ It accelerated repetitive tasks like generating boilerplate docs, listing OWASP risks, or drafting CSP headers.
- ❌ Copilot may have generated overly generic recommendations when the source files didn't provide enough detail about the actual implementation (e.g., no real API routes exist yet).

**What would you do differently next time to improve teamwork and productivity?**

- Add more source files upfront (e.g., all component files, config files) so Copilot has a fuller picture of the codebase.
- Write more specific instructions to narrow Copilot's focus to the exact task at hand instead of broad topics.
- Split large tasks into separate Spaces (e.g., one for upload security, one for auth) rather than covering everything in a single Space.

Share your thoughts and any tips you discovered for making the most of Copilot Spaces in a team setting.

- **✅** You will have successfully used AI assistance with industry-standard external sources to either conduct a security analysis or create comprehensive documentation for the Photo Gallery & Portfolio application.

## ✅ Completion Checklist

Mark off each item as you complete it:

- Created a new GitHub Copilot Space with a clear security or documentation focus
- Set detailed instructions incorporating industry standards
- Added relevant project files to the Space context
- Used the Space to analyze existing code structure
- Documented progress and decisions within the Space
- Shared or saved the Space for future collaboration

## 🚀 What's Next?

Congratulations! You've successfully created and used a GitHub Copilot Space for focused development work.

👉 [**Start GitHub Copilot Coding Agent Demo**](./coding-agent.md)
