# Contributing to SpenserMcConnell.com

Thank you for considering contributing to SpenserMcConnell.com! This document outlines the standards and processes we follow for development.

## Code of Conduct

Please be respectful and considerate of others when contributing to this project. We aim to foster an inclusive and welcoming community.

## Branching Strategy

We follow a simplified Git Flow branching strategy:

- `main`: The primary branch that always reflects production-ready code
- `develop`: Integration branch for features before they're merged to `main`
- `feature/*`: Feature branches for new development
- `bugfix/*`: Branches for bug fixes
- `hotfix/*`: Emergency fixes for production issues
- `release/*`: Branches for preparing releases

## Branch Naming Convention

- Feature branches: `feature/short-description`
- Bug fix branches: `bugfix/issue-number-short-description`
- Hotfix branches: `hotfix/issue-number-short-description`
- Release branches: `release/version-number`

Examples:
- `feature/add-newsletter-signup`
- `bugfix/123-fix-broken-link`
- `hotfix/125-critical-security-fix`
- `release/1.2.0`

## Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `build`: Changes that affect the build system or external dependencies
- `ci`: Changes to our CI configuration files and scripts
- `chore`: Other changes that don't modify src or test files
- `revert`: Reverts a previous commit

### Examples

```
feat(newsletter): add email subscription form

Add form component with validation and API integration to handle newsletter subscriptions.

Closes #123
```

```
fix(projects): correct sorting algorithm for project grid

The projects were being sorted incorrectly due to a comparison error in the sort function.
```

## Pull Request Process

1. Ensure your code follows the project's coding standards
2. Update documentation as necessary
3. Include tests for new functionality
4. Ensure all tests pass
5. Request review from at least one team member
6. PRs require at least one approval before merging

## Development Workflow

1. Pick an issue from the issue tracker
2. Create a new branch from `develop` following the naming convention
3. Make your changes, following the coding standards
4. Write tests for your changes
5. Run the test suite to ensure all tests pass
6. Commit your changes following the commit message convention
7. Push your branch and create a pull request
8. Address any feedback from code reviews
9. Once approved, your PR will be merged

## Release Process

1. Create a release branch from `develop`
2. Perform final testing and bug fixes on the release branch
3. Update version numbers and CHANGELOG.md
4. Create a pull request to merge the release branch into `main`
5. After approval and merge, tag the release in `main`
6. Merge the release branch back into `develop`

Thank you for contributing to SpenserMcConnell.com!
