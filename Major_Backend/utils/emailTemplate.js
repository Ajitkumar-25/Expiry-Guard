// emailTemplate.js
const emailTemplate = ({
  sourceRetailerName,
  sourceRetailerAddress,
  targetRetailerName,
  targetRetailerAddress,
  products,
  supplierEmail,
  driverEmail,
  taskId,
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .container {
      width: 80%;
      margin: auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #333;
    }
    p {
      font-size: 16px;
      color: #555;
    }
    .details {
      margin: 20px 0;
    }
    .details h2 {
      font-size: 18px;
      color: #333;
      border-bottom: 2px solid #ddd;
      padding-bottom: 5px;
    }
    .details p {
      margin: 5px 0;
    }
    .products-table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    .products-table th, .products-table td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    .products-table th {
      background-color: #f2f2f2;
    }
    .footer {
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Transfer Task Assignment</h1>
    <p>Dear Driver,</p>
    <p>You have been assigned a new transfer task. Please find the details below:</p>
    <div class="details">
      <h2>Source Retailer</h2>
      <p><strong>Name:</strong> ${sourceRetailerName}</p>
      <p><strong>Address:</strong> ${sourceRetailerAddress}</p>
    </div>
    <div class="details">
      <h2>Target Retailer</h2>
      <p><strong>Name:</strong> ${targetRetailerName}</p>
      <p><strong>Address:</strong> ${targetRetailerAddress}</p>
    </div>
    <div class="details">
      <h2>Products</h2>
      <table class="products-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          ${products
            .map(
              (product) => `
              <tr>
                <td>${product.productName}</td>
                <td>${product.quantity}</td>
                <td>${product.price}</td>
              </tr>`
            )
            .join("")}
        </tbody>
      </table>
    </div>
    <div class="details">
      <p><strong>For Any Help contact : </strong> ${supplierEmail}</p>
    </div>
    <div class="footer">
      <p>Best regards,<br>ExpiryGuard</p>
    </div>
    <div class="footer">
      <a href="http://localhost:5001/api_update_task_status/${taskId}" class="button">Confirm Task Completion</a>
    </div>
  </div>
</body>
</html>
`;

module.exports = emailTemplate;
