# Laravel E-Commerce

A simple e-commerce management application built with Laravel. The application allows users to manage products, customers, inventory, and sales through a clean web-based interface.

## Features

- User registration and authentication
- User login and logout
- Dashboard
- Product management
- Customer management
- Inventory management
- Create and manage sales
- Add multiple products to a sale
- Calculate sale totals
- Automatically update product stock after a sale
- View completed sales
- View individual sale details
- Search and manage products and customers

## Technologies Used

- **Laravel** - PHP web application framework
- **PHP** - Backend programming language
- **MySQL** - Relational database
- **Blade** - Laravel templating engine
- **JavaScript** - Frontend interactions
- **Bootstrap** - UI styling and components
- **Vite** - Frontend asset bundling
- **Composer** - PHP dependency management
- **npm** - JavaScript dependency management
- **Git & GitHub** - Version control

## Requirements

Before running the project, make sure the following are installed:

- PHP 8.1 or higher
- Composer
- Node.js
- npm
- MySQL
- Git


## Installation

Follow the steps below to install and run the project locally.

### 1. Clone the Repository

Clone the repository from GitHub:

```bash
git clone https://github.com/Shara2024/laravel-ecommerce.git
```

Navigate into the project directory:

```bash
cd laravel-ecommerce
```

### 2. Install PHP Dependencies

Install the required Laravel dependencies using Composer:

```bash
composer install
```

### 3. Install Frontend Dependencies

Install the required JavaScript packages:

```bash
npm install
```

### 4. Run Database Migrations

Create the required database tables by running:

```bash
php artisan migrate
```

If the project contains database seeders, you can also run:

```bash
php artisan migrate --seed
```

### 9. Build Frontend Assets

For development, start the Vite development server:

```bash
npm run dev
```

For a production build:

```bash
npm run build
```

### 5. Start the Laravel Development Server

Open another terminal in the project directory and run:

```bash
php artisan serve
```

The application will be available at:

```text
http://127.0.0.1:8000
```

Open the URL in your web browser.

## Running the Application

During development, run the following commands in separate terminals.

### Terminal 1 - Laravel Server

```bash
php artisan serve
```

### Terminal 2 - Vite Development Server

```bash
npm run dev
```

Then open:

```text
http://127.0.0.1:8000
```

## Database

The application uses **MySQL** for data storage.

Laravel migrations are used to create and manage the database structure.

Run the migrations with:

```bash
php artisan migrate
```

To run migrations together with seeders:

```bash
php artisan migrate --seed
```
## Future Improvements

Possible future improvements include:

- Product categories
- Product images
- Advanced inventory management
- Sales reports
- Dashboard analytics
- Invoice generation
- Payment integration
- Order management
- Product filtering and advanced search
- Role-based access control
- REST API
- Improved reporting and analytics

## Learning Objectives

This project was developed to practice and demonstrate:

- Laravel application development
- MVC architecture
- CRUD operations
- Laravel routing
- Controllers and models
- Eloquent ORM
- Database migrations
- MySQL database management
- Authentication and sessions
- Form handling and validation
- Frontend and backend integration
- JavaScript interactions
- Vite asset management
- Git and GitHub workflow

## License

This project is developed for educational and portfolio purposes.

Laravel is open-source software licensed under the MIT license.