# Git Workflow Guide

## Branch Strategy
- **`main`**: Production-ready code (default branch)
- **`feature-branch`**: Development branch for new features

## Recommended Workflow

### 1. Starting New Development
```bash
# Always start from main
git checkout main
git pull origin main

# Create a new feature branch
git checkout -b feature/new-feature-name
# OR work on existing feature-branch
git checkout feature-branch
```

### 2. Making Changes
```bash
# Make your changes, then:
git add .
git commit -m "Description of changes"
git push origin feature-branch
```

### 3. Creating Pull Request
1. Go to GitHub repository
2. Click "Compare & pull request" (appears after pushing)
3. Set base branch to `main` and compare branch to `feature-branch`
4. Add description and create pull request
5. Review and merge via GitHub interface

### 4. After Merge
```bash
# Switch back to main and pull latest changes
git checkout main
git pull origin main

# Update your feature branch (optional)
git checkout feature-branch
git pull origin main
```

## Important Commands

### Daily Workflow
```bash
# Start work
git checkout main
git pull origin main
git checkout feature-branch

# Make changes and commit
git add .
git commit -m "Your commit message"
git push origin feature-branch

# Create PR on GitHub, then after merge:
git checkout main
git pull origin main
```

### Branch Management
```bash
# List all branches
git branch -a

# Delete local branch
git branch -d branch-name

# Delete remote branch
git push origin --delete branch-name
```

## Best Practices
1. Always pull latest `main` before starting new work
2. Keep feature branches small and focused
3. Use descriptive commit messages
4. Create PRs for all changes to `main`
5. Review code before merging
6. Delete feature branches after successful merge
