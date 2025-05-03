# Kunafa Dashboard Laravel Starter Kit

A custom Laravel starter kit featuring the Kunafa Dashboard Vue template with RTL support, multi-language capabilities, charts, datatables, and more.

## Features

- Modern Vue 3 dashboard with Tailwind CSS
- RTL support for Arabic and other right-to-left languages
- Multi-language support
- Charts and data visualization
- Advanced data tables
- Form components
- Dark/Light mode
- And more!

## Installation

### Create a new Laravel project

```bash
laravel new project-name
cd project-name
```

### Install the Kunafa Dashboard starter kit

```bash
composer require kunafa/laravel-starter-kit
```

### Run the installation command

```bash
php artisan kunafa:install
```

### Install NPM dependencies and build assets

```bash
npm install
npm run dev
```

### Configure your .env file

Make sure you have set up your database connection in the `.env` file.

### Run migrations

```bash
php artisan migrate
```

### Start the development server

```bash
php artisan serve
```

Visit `http://localhost:8000/dashboard` to see your Kunafa Dashboard in action!

## Configuration

You can customize your Kunafa Dashboard by editing the `config/kunafa.php` file. This file includes settings for:

- Application name
- Default language
- Available languages
- RTL languages
- Default theme

## License

This starter kit is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
