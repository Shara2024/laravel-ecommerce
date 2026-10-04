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

You can verify the installed versions:

```bash
php -v
composer -V
node -v
npm -v
mysql --version
git --version
```

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

### 4. Create the Environment File

Create a `.env` file from the provided `.env.example` file.

#### Windows PowerShell

```powershell
Copy-Item .env.example .env
```

#### macOS / Linux

```bash
cp .env.example .env
```

You can also manually copy `.env.example` and rename it to:

```text
.env
```

### 5. Generate the Application Key

Generate the Laravel application encryption key:

```bash
php artisan key:generate
```

### 6. Create the Database

Create a MySQL database for the application.

For example:

```sql
CREATE DATABASE laravel_ecommerce;
```

You can create the database using MySQL Workbench, phpMyAdmin, or the MySQL command line.

### 7. Configure the Database

Open the `.env` file and update the database configuration according to your local environment.

Example:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_ecommerce
DB_USERNAME=root
DB_PASSWORD=
```

If your MySQL server uses a password, enter it in `DB_PASSWORD`.

For example:

```env
DB_USERNAME=root
DB_PASSWORD=your_password
```

### 8. Run Database Migrations

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

### 10. Start the Laravel Development Server

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

## Application Modules

### Dashboard

The dashboard provides an overview of the application and quick access to the main modules.

### Products

The product management module allows users to:

- Add products
- Edit products
- Delete products
- View products
- Manage stock
- Search products

### Customers

The customer management module allows users to:

- Add customers
- Edit customers
- Delete customers
- View customer information
- Search customers

### Sales

The sales module allows users to:

- Create a new sale
- Select a customer
- Search for products
- Add multiple products to a sale
- Set product quantities
- Calculate the sale total
- Complete the sale
- Update product stock
- View completed sales
- View sale details

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

### Resetting the Database

For development purposes, the database can be completely recreated using:

```bash
php artisan migrate:fresh
```

To recreate the database and run seeders:

```bash
php artisan migrate:fresh --seed
```

> **Warning:** `migrate:fresh` will delete all existing database tables and data.

## Environment Configuration

The `.env` file contains environment-specific configuration such as database credentials.

Example:

```env
APP_NAME="Laravel E-Commerce"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://127.0.0.1:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_ecommerce
DB_USERNAME=root
DB_PASSWORD=
```

The `.env` file should **never be committed to GitHub**.

The repository includes `.env.example` as a template for local configuration.

## Troubleshooting

### Composer Installation Problems

If dependencies are not installed correctly, try:

```bash
composer install
```

If you need to update dependencies:

```bash
composer update
```

### Application Key Error

If Laravel reports that the application key is missing:

```bash
php artisan key:generate
```

### Database Connection Error

Check your `.env` database configuration:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_ecommerce
DB_USERNAME=root
DB_PASSWORD=
```

Then clear the Laravel configuration cache:

```bash
php artisan config:clear
```

You can also clear all Laravel caches:

```bash
php artisan optimize:clear
```

### Migration Error

If you are working with a fresh development database, you can recreate the database tables:

```bash
php artisan migrate:fresh
```

> **Warning:** This will remove existing database data.

### Vite Not Loading

Make sure the frontend dependencies are installed:

```bash
npm install
```

Then start the Vite development server:

```bash
npm run dev
```

### Permission / Storage Issues

If Laravel has problems accessing storage or cache directories, run:

```bash
php artisan storage:link
```

## Security

Sensitive configuration such as database credentials and application keys should be stored in the `.env` file.

The `.env` file should not be committed to the repository.

Make sure the following files remain private:

```text
.env
```

The repository provides:

```text
.env.example
```

as a template for the required environment configuration.

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