# Kunafa Dashboard Laravel Starter Kit

A custom Laravel starter kit featuring the Kunafa Dashboard Vue template with RTL support, multi-language capabilities, charts, datatables, and more. The starter kit now includes full authentication with Inertia.js integration.

## Features

- Modern Vue 3 dashboard with Tailwind CSS
- Full authentication system with Inertia.js
- RTL support for Arabic and other right-to-left languages
- Multi-language support
- Charts and data visualization
- Advanced data tables
- Form components
- Dark/Light mode
- And more!

## Installation

### Option 1: Quick Installation (Recommended)

You can install Kunafa directly when creating a new Laravel project:

```bash
laravel new project-name --using=yousefkadah/kunafa-laravel-starter-kit
```

This will set up everything for you automatically.

### Option 2: Manual Installation

#### Create a new Laravel project

```bash
laravel new project-name
cd project-name
```

#### Install the Kunafa Dashboard starter kit

```bash
composer require yousefkadah/kunafa-laravel-starter-kit
```

#### Run the installation command

```bash
php artisan kunafa:install
```

#### Install NPM dependencies and build assets

```bash
npm install
npm run dev
```

#### Configure your .env file

Make sure you have set up your database connection in the `.env` file.

#### Run migrations

```bash
php artisan migrate
```

### Start the development server

```bash
php artisan serve
```

Visit `http://localhost:8000` to see your Kunafa Dashboard in action!

## Authentication

The starter kit includes a complete authentication system built on Inertia.js:

- Login
- Registration
- Password Reset
- Email Verification
- Profile Management

These features are seamlessly integrated with the Kunafa Dashboard UI.

## Configuration

You can customize your Kunafa Dashboard by editing the `config/kunafa.php` file. This file includes settings for:

- Application name
- Default language
- Available languages
- RTL languages
- Default theme

## License

This starter kit is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
