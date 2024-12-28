# ExpiryGuard

ExpiryGuard is a comprehensive, collaborative real-time supply chain management system designed to tackle the challenges of managing perishable items nearing expiry. It enables retailers and suppliers to work together seamlessly, ensuring effective inventory management and reducing wastage of near-expiry products.

## Key Features

### Real-Time Inventory Tracking
- **Retailers** and **suppliers** can monitor inventory levels and expiry dates in real-time.
- Facilitates better decision-making and inventory optimization.

### Expiry Management
- Tracks inventory by expiry dates.
- Provides alerts and notifications for near-expiry items.
- Prioritizes near-expiry products for sale or redistribution.

### Supplier-Retailer Collaboration
- Suppliers have access to dashboards to monitor product status at various retail locations.
- Enables proactive redistribution of near-expiry items to stores with higher demand.

---

## Modules

### Retailer Dashboard

#### Features:

| Feature                               | Description                                                                                   |
|---------------------------------------|-----------------------------------------------------------------------------------------------|
| **Signup and Login**                  | Retailers can register with personal and store details and log in securely using email/password. |
| **View and Manage Inventory**         | Retailers can view all products, including quantity, price, and expiry date. Alerts for near-expiry items are provided. |
| **Track Sales and Redistribution Data** | Retailers can view sales data summaries (quantities sold, revenue) and redistribution details via tables and graphs. |
| **Request Products from Suppliers**   | Retailers can add products to a request list, specify quantities, and track request statuses. |
| **Transfer Near-Expiry Products**     | Retailers can request transfers of near-expiry items to other stores with higher demand. Status tracking included. |
| **Track All Requests**                | Retailers can view and track statuses of all requests sent to suppliers. |

### Supplier Dashboard

#### Features:

| Feature                               | Description                                                                                   |
|---------------------------------------|-----------------------------------------------------------------------------------------------|
| **Signup and Login**                  | Suppliers can register with company details and log in securely using email/password.         |
| **Track Real-Time Inventory at Retailers** | Suppliers can view and filter inventory data for connected retailers, sorted by criteria such as stock levels and expiry dates. Alerts for low stock are provided. |
| **Track Sales and Redistribution Data** | Suppliers can view summaries of sales, redistribution, and product requests, presented as tables and cards. |
| **View and Respond to Product Requests** | Suppliers can view requests from retailers and update statuses (e.g., Pending, Processing, Completed). |
| **Manage Drivers and Deliveries**     | Suppliers can assign drivers to specific tasks and track delivery statuses in real-time.       |

### Driver Functionality

| Feature                               | Description                                                                                   |
|---------------------------------------|-----------------------------------------------------------------------------------------------|
| **Task Notifications**                | Drivers receive notifications via email about assigned tasks, including detailed information. |
| **Task Status Updates**               | Drivers can update task statuses upon completing deliveries.                                  |

---

## Technology Stack

| Component        | Technology                         |
|-------------------|-------------------------------------|
| **Frontend**      | React.js with Redux, RTK Query     |
| **Backend**       | Node.js with Express.js            |
| **Database**      | MongoDB                            |
| **Authentication**| JSON Web Tokens (JWT)              |
| **Hosting**       | Render or Netlify                  |

---

## Installation and Usage

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/ExpiryGuard.git
   cd ExpiryGuard
   ```

2. **Install dependencies:**
   Navigate to both the `Major_Frontend` and `Major_Backend` directories and install dependencies:
   ```bash
   # For Frontend
   cd Major_Frontend
   npm install

   # For Backend
   cd Major_Backend
   npm install
   ```

3. **Run the development server:**
   Start the development servers in both directories:
   ```bash
   # Frontend (in Major_Frontend)
   npm run dev

   # Backend (in Major_Backend)
   npm run dev
   ```

4. **Environment Variables:**
   Configure your `.env` files in both `Major_Backend` and `Major_Frontend` directories with the required settings:

   **Backend `.env` file:**
   ```env
   DB_URL=<your-mongodb-connection-string>
   PORT=<your-port-number>
   SECRET_KEY=<your-secret-key>
   GMAIL_MAILER_PASSWORD=<your-gmail-mailer-password>
   SMTP_MAIL=<your-smtp-email>
   SMTP_PASS=<your-smtp-password>
   ```

   **Frontend `.env` file:**
   ```env
   # VITE_URL=<your-backend-url>
   VITE_URL=http://localhost:5001
   ```

5. **Temporary Login Credentials:**

| User Type    | Email             | Password |
|--------------|-------------------|----------|
| **Retailer** | `12345@gmail.com` | `12345`  |
| **Supplier** | `1234@gmail.com`  | `1234`   |

---

## Contributions
We welcome contributions from the community! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature/bug fix.
3. Commit your changes.
4. Submit a pull request.

---

## Contact
For any queries or suggestions, feel free to reach out:

- Email: kajit0408@gmail.com
- GitHub: [Ajitkumar-25](https://github.com/Ajitkumar-25)

---

Make supply chain management smarter and wastage-free with **ExpiryGuard**! 🚀
