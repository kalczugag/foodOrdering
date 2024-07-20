# Food Ordering App

Welcome to the Food Ordering App repository! This application is a dynamic platform for ordering pizzas and other food items online. Built with scalability, security, and user-friendliness in mind, it provides a seamless ordering experience for customers.

## Features

- **User Authentication**: Secure user login and registration using modern authentication protocols.
- **Browse Menu**: View and search through a comprehensive menu of food items.
- **Order Management**: Easily add items to your cart, place orders, and track order status.
- **Stripe Integration**: Secure online payments using Stripe.
- **Admin Panel**: Manage menu items, view orders, and update order statuses.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Technology Stack

- **Frontend**: React.js for a responsive and dynamic user interface.
- **Backend**: Node.js and Express for a robust and scalable server-side architecture.
- **Database**: MongoDB for efficient data storage and retrieval.
- **Authentication**: Google OAuth 2.0 for secure user authentication.
- **Payments**: Stripe for secure payment processing.

## Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/kalczugag/foodOrdering.git
    cd foodOrdering
    ```

2. **Install backend dependencies**:
    ```sh
    npm install
    ```

3. **Install frontend dependencies**:
    ```sh
    cd client
    npm install
    cd ..
    ```

4. **Set up environment variables**:
    Create a `dev.ts` file in the config directory and add the following:
    ```env
    module.exports = {
        googleClientID: "your-google-client-id",
        googleClientSecret: "your-google-client-secret",
        googleProjectId: "your-google-project-id",
        googleBucketName: "your-google-bucket-name",
        googleClientEmail: "your-google-client-email",
        googlePrivateKey: "your-google-private-key",
        mongoURI: "your-mongodb-uri",
        cookieKey: "your-cookie-key",
        stripeSecretKey: "your-stripe-secret",
        stripePublishableKey: "your-stripe-publishable",
        stripeEndpointSecret: "your-stripe-endpoint",
        redirectDomain: "your-redirect-domain",
    };
    ```

5. **Start the application**:
    ```sh
    npm run dev
    ```

6. **Access the application**:
    Open your browser and go to `http://localhost:3000`

## Contributing

We welcome contributions from the community! If you'd like to contribute, please follow these steps:

1. **Fork the repository**.
2. **Create a new branch**:
    ```sh
    git checkout -b feature/your-feature-name
    ```
3. **Make your changes and commit them**:
    ```sh
    git commit -m 'Add some feature'
    ```
4. **Push to the branch**:
    ```sh
    git push origin feature/your-feature-name
    ```
5. **Open a pull request**.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or suggestions, feel free to open an issue or contact us at [kalczugag@gmail.com](mailto:kalczugag@gmail.com).

---

Thank you for using Pizza Order App! We hope it enhances your food ordering experience. Enjoy your meal!
