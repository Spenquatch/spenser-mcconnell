# GitHub Repository Setup Instructions

This document provides detailed instructions for setting up the GitHub repository for SpenserMcConnell.com.

## Prerequisites

Before proceeding, ensure you have the following:

1. [GitHub CLI](https://cli.github.com/manual/installation) installed and authenticated
2. Git installed and configured with your credentials
3. Basic familiarity with Git and GitHub

## Automated Setup

We've provided a script that automates most of the GitHub repository setup process:

```bash
# Make the script executable if it's not already
chmod +x scripts/setup_github_repo.sh

# Edit the script to update your GitHub username and other configuration
nano scripts/setup_github_repo.sh

# Run the script
./scripts/setup_github_repo.sh
```

The script will:
1. Create a new GitHub repository
2. Add the GitHub remote to your local repository
3. Push your local code to GitHub
4. Set up branch protection rules for `main` and `develop` branches
5. Configure repository secrets for deployment

## Manual Setup

If you prefer to set up the repository manually, follow these steps:

### 1. Create a new GitHub repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top-right corner and select "New repository"
3. Enter "spenser-mcconnell" as the repository name
4. Add a description: "Personal brand hub featuring project portfolio, updates timeline, AI A Day newsletter, and more."
5. Choose visibility (public or private)
6. Do not initialize with README, .gitignore, or license (we'll push our existing code)
7. Click "Create repository"

### 2. Add the GitHub remote to your local repository

```bash
git remote add origin https://github.com/YOUR_USERNAME/spenser-mcconnell.git
```

### 3. Push your local code to GitHub

```bash
git add .
git commit -m "chore: initial commit"
git push -u origin main
```

### 4. Create and push the develop branch

```bash
git checkout -b develop
git push -u origin develop
```

### 5. Set up branch protection rules

1. Go to your repository on GitHub
2. Click "Settings" > "Branches"
3. Click "Add rule" under "Branch protection rules"
4. Enter "main" as the branch name pattern
5. Check the following options:
   - Require pull request reviews before merging
   - Require status checks to pass before merging
   - Require branches to be up to date before merging
6. Click "Create"
7. Repeat for the "develop" branch

### 6. Configure repository secrets for deployment

1. Go to your repository on GitHub
2. Click "Settings" > "Secrets and variables" > "Actions"
3. Click "New repository secret"
4. Add the following secrets:
   - CLOUDFLARE_API_TOKEN
   - CLOUDFLARE_ACCOUNT_ID
   - NEXT_PUBLIC_API_URL
   - NEXT_PUBLIC_SITE_URL

## Verification

After setting up the repository, verify that:

1. Both `main` and `develop` branches exist on GitHub
2. Branch protection rules are in place
3. GitHub Actions workflows are visible under the "Actions" tab
4. Repository secrets are configured

## Next Steps

After setting up the GitHub repository:

1. Clone the repository to your development environment
2. Set up the frontend and backend applications
3. Configure Cloudflare Pages for deployment
4. Start implementing the features according to the project plan
