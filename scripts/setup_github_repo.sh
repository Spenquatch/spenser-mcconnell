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

# Create the repository on GitHub
echo -e "${YELLOW}Creating GitHub repository: ${REPO_NAME}...${NC}"
gh repo create "${GITHUB_USERNAME}/${REPO_NAME}" --description "${REPO_DESCRIPTION}" --${REPO_VISIBILITY}

# Add the GitHub remote to the local repository
echo -e "${YELLOW}Adding GitHub remote to local repository...${NC}"
git remote add origin "https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"

# Push the local repository to GitHub
echo -e "${YELLOW}Pushing local repository to GitHub...${NC}"
git add .
git commit -m "chore: initial commit"
git push -u origin main

# Set up branch protection rules
echo -e "${YELLOW}Setting up branch protection rules...${NC}"
gh api --method PUT "repos/${GITHUB_USERNAME}/${REPO_NAME}/branches/main/protection" \
  -f required_status_checks='{"strict":true,"contexts":["lint","test","build"]}' \
  -f enforce_admins=false \
  -f required_pull_request_reviews='{"dismissal_restrictions":{},"dismiss_stale_reviews":true,"require_code_owner_reviews":true,"required_approving_review_count":1}' \
  -f restrictions=null

# Create develop branch
echo -e "${YELLOW}Creating and pushing develop branch...${NC}"
git checkout -b develop
git push -u origin develop

# Set up branch protection for develop branch
echo -e "${YELLOW}Setting up branch protection for develop branch...${NC}"
gh api --method PUT "repos/${GITHUB_USERNAME}/${REPO_NAME}/branches/develop/protection" \
  -f required_status_checks='{"strict":true,"contexts":["lint","test","build"]}' \
  -f enforce_admins=false \
  -f required_pull_request_reviews='{"dismissal_restrictions":{},"dismiss_stale_reviews":true,"require_code_owner_reviews":true,"required_approving_review_count":1}' \
  -f restrictions=null

# Set up repository secrets for deployment
echo -e "${YELLOW}Setting up repository secrets for deployment...${NC}"
echo -e "${YELLOW}Please enter your Cloudflare API Token:${NC}"
read -s CLOUDFLARE_API_TOKEN
gh secret set CLOUDFLARE_API_TOKEN -b"${CLOUDFLARE_API_TOKEN}"

echo -e "${YELLOW}Please enter your Cloudflare Account ID:${NC}"
read CLOUDFLARE_ACCOUNT_ID
gh secret set CLOUDFLARE_ACCOUNT_ID -b"${CLOUDFLARE_ACCOUNT_ID}"

echo -e "${YELLOW}Please enter your API URL (e.g., https://api.spensermcconnell.com):${NC}"
read NEXT_PUBLIC_API_URL
gh secret set NEXT_PUBLIC_API_URL -b"${NEXT_PUBLIC_API_URL}"

echo -e "${YELLOW}Please enter your Site URL (e.g., https://spensermcconnell.com):${NC}"
read NEXT_PUBLIC_SITE_URL
gh secret set NEXT_PUBLIC_SITE_URL -b"${NEXT_PUBLIC_SITE_URL}"

echo -e "${GREEN}GitHub repository setup complete!${NC}"
echo -e "${GREEN}Repository URL: https://github.com/${GITHUB_USERNAME}/${REPO_NAME}${NC}"
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Clone the repository to your local machine"
echo "2. Set up the frontend and backend applications"
echo "3. Configure Cloudflare Pages for deployment"

exit 0
