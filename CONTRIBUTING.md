# GitHub Contribution Guidelines

## Branch Structure

To maintain a clean and organized repository, our project uses the following branch structure:

- **Main Branch (`main`)**
  - The `main` branch is the showcase branch and should always contain production-ready code. This is where releases are tagged, and from which deployments occur.
  - Changes to this branch should only be made through Pull Requests (PRs) after thorough code reviews and passing tests.

- **Development Branch (`dev`)**
  - The `dev` branch is used for integrating features and fixes before they are merged into `main`. It's the staging area for upcoming releases.
  - All feature and fix branches should be merged into `dev` via PRs after proper code review and testing.

- **Feature Branch (`feat/<user_name>_<feat>`)**
  - Feature branches are where individual developers work on new features.
  - The branch name should follow the pattern `feat/<user_name>_<feat>`, where `<user_name>` is your GitHub username or initials, and `<feat>` is a short description of the feature.
  - Before creating a feature branch, ensure it aligns with the project's goals and has approval from the team lead or product owner.

- **Fix Branch (`fix/<user_name>_<fix>`)**
  - Fix branches are for bug fixes or code maintenance.
  - The branch name should follow the pattern `fix/<user_name>_<fix>`, where `<fix>` is a brief description of the fix.
  - Bug fixes should have corresponding issue numbers, and commits should reference these issues.

## Pull Requests and Merging

- **Pull Requests (PRs)**
  - All changes to `dev` and `main` must go through PRs.
  - PRs should contain a clear description of the changes, referencing related issues or requirements.
  - Include at least one reviewer (preferably two) for code reviews.
  - PRs must pass all automated tests and have successful manual tests (if required) before being approved.

- **Merging**
  - Merging into `main` should be done by a designated team member, ensuring all checks and reviews are complete.
  - Avoid force pushes to `main` and `dev` unless necessary and approved by the team.

## Commit and Comment Semantics

- **Commit Messages**
  - Use clear and concise commit messages.
  - Follow the format: `Type: Brief summary`
    - `Type` can be `feat`, `fix`, `chore`, `refactor`, `style`, `test`, etc.
  - Include a longer description if necessary, especially for complex changes.

- **Comments in Code**
  - Write comments to explain the intent and functionality, not to restate the obvious.
  - Use comments to clarify complex logic, assumptions, or potential improvements.
  - Avoid excessive comments that clutter the code.

## Code Review and Collaboration

- **Code Review**
  - Engage in constructive feedback and ask questions during code reviews.
  - Look for code quality, best practices, and adherence to project standards.
  - Ensure documentation is updated where required.

- **Collaboration**
  - Communicate with team members regularly about progress and issues.
  - Follow project conventions and coding standards.
  - Respect others' time and efforts; be responsive to feedback and changes.
