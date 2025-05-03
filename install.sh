#!/bin/bash

# Kunafa Dashboard Laravel Starter Kit - Installation Script
echo "Installing Kunafa Dashboard Laravel Starter Kit..."

# Check if composer is installed
if ! command -v composer &> /dev/null; then
    echo "Error: composer is not installed. Please install composer first."
    exit 1
fi

# Check if a Laravel project exists in the current directory
if [ ! -f "artisan" ]; then
    echo "Error: Laravel project not found in the current directory."
    echo "Please run this script in the root of your Laravel project."
    exit 1
fi

# Install the package via composer
echo "Adding Kunafa Dashboard package to your Laravel project..."
composer require kunafa/laravel-starter-kit

# Run the installation command
echo "Running the installation command..."
php artisan kunafa:install

# Install npm dependencies
echo "Installing npm dependencies..."
npm install

# Build assets
echo "Building assets..."
npm run dev

echo "Installation complete! Visit http://localhost:8000/dashboard to see your Kunafa Dashboard in action."
