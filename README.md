# Kunafa Laravel Starter Kit

A Laravel starter kit that integrates a Vue.js dashboard with multilingual support, RTL layouts, charts, datatables, and form components.

## Features

- **Modern Laravel & Vue.js Integration**: Uses Laravel with Inertia.js and Vue 3
- **Multilingual Support**: Easily switch between languages including RTL languages like Arabic
- **Comprehensive Dashboard**: Pre-built dashboard components for data visualization
- **Interactive Forms**: Various form layouts (object, inline, tabbed, multi-step)
- **Data Tables**: Sortable, searchable, and server-side processing tables
- **Charts**: Multiple chart types (bar, line, pie, doughnut, radar, etc.)
- **Authentication**: Built-in Laravel authentication
- **Responsive Design**: Mobile-friendly interface

## Requirements

- PHP 8.2+
- Node.js 18+
- Composer

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/kunafa-laravel-starter-kit.git
cd kunafa-laravel-starter-kit
```

2. Install PHP dependencies
```bash
composer install
```

3. Install Node.js dependencies
```bash
npm install
```

4. Copy the environment file and set up your database
```bash
cp .env.example .env
```

5. Generate an application key
```bash
php artisan key:generate
```

6. Run migrations
```bash
php artisan migrate
```

7. Start the development server
```bash
npm run dev
```

8. In a separate terminal, start the Laravel server
```bash
php artisan serve
```

## Dashboard Structure

The dashboard is organized into several sections:

- **Main Dashboard**: Overview with key metrics and charts
- **Forms**:
  - Object Forms
  - Inline Forms
  - Tabs Forms
  - Steps Forms
- **Data Tables**:
  - Basic Tables
  - Sortable Tables
  - Searchable Tables
  - Server-side Processing Tables
- **Charts**:
  - Bar Charts
  - Bubble Charts
  - Doughnut Charts
  - Line Charts
  - Pie Charts
  - Polar Area Charts
  - Radar Charts
  - Scatter Charts

## Customization

### Adding New Dashboard Pages

1. Create a new Vue component in `resources/js/pages/Dashboard`
2. Add a new route in `routes/web.php`
3. Create a controller method in `app/Http/Controllers/Dashboard/DashboardController.php`
4. Update the navigation in `resources/js/composables/useDashboardNavigation.js`

### Styling

The dashboard uses Tailwind CSS for styling. You can customize the appearance by:

1. Modifying the theme in `tailwind.config.js`
2. Adding custom styles in `resources/css/dashboard`

### Languages

To add or modify languages:

1. Add a new language file in `resources/js/i18n/locales`
2. Update the language list in your app.ts or i18n initialization file

## License

[MIT](LICENSE)

## Credits

This starter kit integrates the Kunafa Dashboard Vue with Laravel, creating a powerful foundation for building admin panels and dashboards.
