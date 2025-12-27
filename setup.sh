#!/bin/bash

# Setup script for @labs-gg/auth package

echo "🔐 Setting up @labs-gg/auth package..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this from the package root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the package
echo "🔨 Building TypeScript..."
npm run build

# Check if build was successful
if [ -d "lib" ]; then
    echo "✅ Build successful! Files created in lib/"
else
    echo "❌ Build failed. Check for TypeScript errors."
    exit 1
fi

echo ""
echo "🎉 Package setup complete!"
echo ""
echo "Next steps:"
echo "1. To test locally: npm link"
echo "2. In your project: npm link @labs-gg/auth"
echo "3. Or publish: npm publish --access public"
echo ""
echo "📖 See README.md for usage instructions"
echo "🔗 See INTEGRATION.md for integration guide"
