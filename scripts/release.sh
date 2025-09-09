#!/bin/bash

# Release script for creating version tags

set -e

# Check if version argument is provided
if [ $# -eq 0 ]; then
    echo "Usage: ./scripts/release.sh <version>"
    echo "Example: ./scripts/release.sh 1.0.0"
    exit 1
fi

VERSION=$1

# Validate version format
if ! echo "$VERSION" | grep -qE '^[0-9]+\.[0-9]+\.[0-9]+(-[a-zA-Z0-9]+)?$'; then
    echo "Error: Invalid version format. Use semantic versioning (e.g., 1.0.0 or 1.0.0-beta1)"
    exit 1
fi

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "Error: You have uncommitted changes. Please commit or stash them first."
    exit 1
fi

# Update package.json version
echo "Updating package.json version to $VERSION..."
npm version $VERSION --no-git-tag-version

# Build the project
echo "Building project..."
npm run build

# Commit version update
git add package.json package-lock.json
git commit -m "Release v$VERSION"

# Create git tag
echo "Creating git tag v$VERSION..."
git tag -a "v$VERSION" -m "Release v$VERSION"

echo ""
echo "✅ Release v$VERSION created successfully!"
echo ""
echo "Next steps:"
echo "  1. Push changes: git push origin main"
echo "  2. Push tag: git push origin v$VERSION"
echo "  3. Publish to npm: npm publish"
echo ""
echo "Or run all at once:"
echo "  git push origin main && git push origin v$VERSION && npm publish"