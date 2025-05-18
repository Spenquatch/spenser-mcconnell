#!/bin/bash

# GitHub Repository Setup Script
# This script automates the setup of a GitHub repository for spensermcconnell.com

# Exit on error
set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration - Replace these values with your own
GITHUB_USERNAME="spenquatch"
REPO_NAME="spenser-mcconnell"
REPO_DESCRIPTION="Personal brand hub featuring project portfolio, updates timeline, AI A Day newsletter, and more."
REPO_VISIBILITY="private" # or "private"

echo -e "${YELLOW}Starting GitHub repository setup for ${REPO_NAME}...${NC}"

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo -e "${RED}GitHub CLI (gh) is not installed. Please install it first:${NC}"
    echo "https://cli.github.com/manual/installation"
    exit 1
fi

# Check if user is authenticated with GitHub CLI
if ! gh auth status &> /dev/null; then
    echo -e "${YELLOW}Please authenticate with GitHub CLI:${NC}"
    gh auth login
fi

# Check if repository already exists
echo -e "${YELLOW}Checking if repository exists...${NC}"
if gh repo view "${GITHUB_USERNAME}/${REPO_NAME}" &> /dev/null; then
    echo -e "${YELLOW}Repository already exists, using existing repo...${NC}"
else
    # Create the repository on GitHub
    echo -e "${YELLOW}Creating GitHub repository: ${REPO_NAME}...${NC}"
    gh repo create "${GITHUB_USERNAME}/${REPO_NAME}" --description "${REPO_DESCRIPTION}" --${REPO_VISIBILITY} || {
        echo -e "${RED}Failed to create repository. It might already exist or there might be permission issues.${NC}"
        exit 1
    }
fi

# Add the GitHub remote to the local repository
echo -e "${YELLOW}Adding GitHub remote to local repository...${NC}"
if git remote | grep -q "^origin$"; then
    echo -e "${YELLOW}Remote 'origin' already exists. Updating URL...${NC}"
    git remote set-url origin "https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"
else
    git remote add origin "https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"
fi

# Check if repository already exists
echo -e "${YELLOW}Checking if repository exists...${NC}"
if gh repo view "${GITHUB_USERNAME}/${REPO_NAME}" &> /dev/null; then
    echo -e "${YELLOW}Repository already exists, using existing repo...${NC}"
else
    # Initialize git repository if not already initialized
    if [ ! -d ".git" ]; then
        git init
    fi
    
    # Add and commit files
    echo -e "${YELLOW}Pushing local repository to GitHub...${NC}"
    git add .
    git commit -m "chore: initial commit" || true  # Use || true in case there's nothing to commit
fi

# Try to push to main branch, if it exists
if git show-ref --verify --quiet refs/heads/main; then
    git push -u origin main || echo -e "${YELLOW}Could not push to main branch, it may be protected${NC}"
else
    git push -u origin master || echo -e "${YELLOW}Could not push to master branch, it may be protected${NC}"
fi

# Set up branch protection rules
echo -e "${YELLOW}Setting up branch protection rules...${NC}"
gh api --method PUT "repos/${GITHUB_USERNAME}/${REPO_NAME}/branches/main/protection" \
  -f required_status_checks='{"strict":true,"contexts":["lint","test","build"]}' \
  -f enforce_admins=false \
  -f required_pull_request_reviews='{"dismissal_restrictions":{},"dismiss_stale_reviews":true,"require_code_owner_reviews":true,"required_approving_review_count":1}' \
  -f restrictions=null || {
    echo -e "${YELLOW}Could not set up branch protection for main. This may require a Pro account or the branch might not exist yet.${NC}"
  }

# Create develop branch if it doesn't exist
echo -e "${YELLOW}Creating and pushing develop branch...${NC}"
if git show-ref --verify --quiet refs/heads/develop; then
    echo -e "${YELLOW}Develop branch already exists locally.${NC}"
else
    git checkout -b develop
fi

# Push develop branch if it doesn't exist remotely
git push -u origin develop || {
    echo -e "${YELLOW}Could not push develop branch. It might already exist remotely or be protected.${NC}"
    git fetch origin
    git branch --set-upstream-to=origin/develop develop || echo -e "${YELLOW}Could not set upstream for develop branch.${NC}"
}

# Set up branch protection for develop branch
echo -e "${YELLOW}Setting up branch protection for develop branch...${NC}"
gh api --method PUT "repos/${GITHUB_USERNAME}/${REPO_NAME}/branches/develop/protection" \
  -f required_status_checks='{"strict":true,"contexts":["lint","test","build"]}' \
  -f enforce_admins=false \
  -f required_pull_request_reviews='{"dismissal_restrictions":{},"dismiss_stale_reviews":true,"require_code_owner_reviews":true,"required_approving_review_count":1}' \
  -f restrictions=null || {
    echo -e "${YELLOW}Could not set up branch protection for develop. This may require a Pro account or the branch might not exist yet.${NC}"
  }

# Set up repository secrets for deployment
echo -e "${YELLOW}Setting up repository secrets for deployment...${NC}"
echo -e "${YELLOW}Please enter your Cloudflare API Token (leave empty to skip):${NC}"
read -s CLOUDFLARE_API_TOKEN
if [ -n "$CLOUDFLARE_API_TOKEN" ]; then
    gh secret set CLOUDFLARE_API_TOKEN -b"${CLOUDFLARE_API_TOKEN}" || echo -e "${YELLOW}Could not set CLOUDFLARE_API_TOKEN secret.${NC}"
else
    echo -e "${YELLOW}Skipping CLOUDFLARE_API_TOKEN setup.${NC}"
fi

echo -e "${YELLOW}Please enter your Cloudflare Account ID (leave empty to skip):${NC}"
read CLOUDFLARE_ACCOUNT_ID
if [ -n "$CLOUDFLARE_ACCOUNT_ID" ]; then
    gh secret set CLOUDFLARE_ACCOUNT_ID -b"${CLOUDFLARE_ACCOUNT_ID}" || echo -e "${YELLOW}Could not set CLOUDFLARE_ACCOUNT_ID secret.${NC}"
else
    echo -e "${YELLOW}Skipping CLOUDFLARE_ACCOUNT_ID setup.${NC}"
fi

echo -e "${YELLOW}Please enter your API URL (e.g., https://api.spensermcconnell.com) (leave empty to skip):${NC}"
read NEXT_PUBLIC_API_URL
if [ -n "$NEXT_PUBLIC_API_URL" ]; then
    gh secret set NEXT_PUBLIC_API_URL -b"${NEXT_PUBLIC_API_URL}" || echo -e "${YELLOW}Could not set NEXT_PUBLIC_API_URL secret.${NC}"
else
    echo -e "${YELLOW}Skipping NEXT_PUBLIC_API_URL setup.${NC}"
fi

echo -e "${YELLOW}Please enter your Site URL (e.g., https://spensermcconnell.com) (leave empty to skip):${NC}"
read NEXT_PUBLIC_SITE_URL
if [ -n "$NEXT_PUBLIC_SITE_URL" ]; then
    gh secret set NEXT_PUBLIC_SITE_URL -b"${NEXT_PUBLIC_SITE_URL}" || echo -e "${YELLOW}Could not set NEXT_PUBLIC_SITE_URL secret.${NC}"
else
    echo -e "${YELLOW}Skipping NEXT_PUBLIC_SITE_URL setup.${NC}"
fi

echo -e "${GREEN}GitHub repository setup complete!${NC}"
echo -e "${GREEN}Repository URL: https://github.com/${GITHUB_USERNAME}/${REPO_NAME}${NC}"
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Clone the repository to your local machine"
echo "2. Set up the frontend and backend applications"
echo "3. Configure Cloudflare Pages for deployment"

exit 0
