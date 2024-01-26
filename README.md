# React user management app

## Table of Contents

- [Introduction](#introduction)
- [Project Overview](#project-overview)
- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)

## Introduction

This project utilizes Vite and React for front-end development. It uses a api provided by mockapi.io for CRUD operations on a table of users, with functionalities such as adding, deleting, and editing user entries. The main page is a protected dashboard that can only be accessed after successful login. Users are also stored on the same api. Users have the option to be always logged in, in which case their login name is saved in local storage.

## Project Overview

The project consists of the following key components:

- **Login Page:** Allows users to log in with their credentials.
- **Registration Page:** Allows new users to register for an account.
- **Dashboard Page:** A protected route accessible only after login, displaying a table of users with options to add, delete, and edit entries.
- **React Context:** For managing Login, Registration & Crud operations

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/maharshdhasmana/Ijona.git
   cd Ijona
   ```

## usage

1. Install Dependencies
   ```sh
    npm install
   ```
2. Start Development Server
   ```sh
   npm run dev
   ```
3. Open your browser and navigate to http://localhost:5173 to access the application.

## Dependencies

- **Vite:** Fast development server and build tool for modern web development.
- **React:** A JavaScript library for building user interfaces.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **Other dependencies:** Check the `package.json` file for a complete list of project dependencies.
