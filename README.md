# Currency Converter Web Application

## Overview

This project is a web application that allows users to convert between EURO (EUR) and US Dollars (USD). It provides a simple interface where users can input an amount, select the source and target currencies, and view the converted amount. Additionally, the application logs each conversion into a PostgreSQL database, allowing users to retrieve their past conversions.

## Features

### 1. User Interface
- **Currency Selection:** Dropdown menus for selecting the source and target currencies.
- **Amount Input:** Input field for the amount to be converted.
- **Conversion Result:** Display area showing the converted amount.
- **Conversion History:** A section to view past conversion logs.

### 2. Currency Conversion API
- **/convert:** Stores the conversion details into the database.
- **/history:** Retrieves and returns past conversion logs from the database.

### 3. Dynamic Currency Rates
- **Mock Rates:** Simulated conversion rates between EURO and USD for demonstration purposes.

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Package Manager:** npm

## Setup Instructions

### 1. Project Setup
1. Clone the repository to your local machine.
    ```bash
    git clone https://github.com/akhilesh-sahu12/Currency-Conversion-History-Analytics.git
    ```
2. Navigate into the project directory.
    ```bash
    cd Currency-Conversion-History-Analytics
    ```
3. Initialize a Node.js application and install necessary packages.
    ```bash
    npm init -y
    npm install express pg body-parser
    ```

### 2. Database Setup
1. Install PostgreSQL on your machine.
2. Create a new database for the project.
3. Execute the following SQL command to create a table for storing conversion logs:
    ```sql
    CREATE TABLE conversions (
        id SERIAL PRIMARY KEY,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        source_currency VARCHAR(3),
        source_amount NUMERIC,
        target_currency VARCHAR(3),
        converted_amount NUMERIC
    );
    ```

### 3. Backend Development
1. Create an Express server (`index.js`) to serve the HTML file and handle API requests.
2. Implement the `/convert` and `/history` endpoints.
3. Use a predefined object with mock exchange rates for the conversion logic.

### 4. Frontend Development
1. Create a simple HTML page (`index.html`) with:
    - A form for selecting currencies and inputting the amount.
    - A section for displaying the conversion result.
    - A section for displaying the conversion history.
2. Use JavaScript to capture form submissions, make asynchronous requests to the backend, and update the DOM with the results.

### 5. Integration
1. On form submission, send a request to the `/convert` endpoint.
2. Implement functionality to retrieve and display conversion history from the `/history` endpoint.

## Running the Application

1. Start the PostgreSQL server.
2. Run the Express server.
    ```bash
    node index.js
    ```
3. Open your browser and navigate to `http://localhost:3000` to use the application.

## Future Enhancements

- **Live Exchange Rates:** Integrate with a real-time exchange rate API for dynamic conversion rates.
- **User Authentication:** Implement user accounts to track conversions individually.
- **Multiple Currency Support:** Extend support to additional currencies beyond EUR and USD.


## Screenshots
![App Screenshot](https://github.com/akhilesh-sahu12/Currency-Conversion-History-Analytics/blob/master/public/screenshots/1.png)

![App Screenshot](https://github.com/akhilesh-sahu12/Currency-Conversion-History-Analytics/blob/master/public/screenshots/2.png)

![App Screenshot](https://github.com/akhilesh-sahu12/Currency-Conversion-History-Analytics/blob/master/public/screenshots/3.png) 

![App Screenshot](https://github.com/akhilesh-sahu12/Currency-Conversion-History-Analytics/blob/master/public/screenshots/4.png)

![App Screenshot](https://github.com/akhilesh-sahu12/Currency-Conversion-History-Analytics/blob/master/public/screenshots/DB.png)
