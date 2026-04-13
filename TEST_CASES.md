# Test Cases

| TC Number | Requirement | What is Testing | Expected Result |
|-----------|-------------|-----------------|-----------------|
| TC-01 | REQ-01 | Login with valid credentials | User is directed to the inventory page (https://www.saucedemo.com/inventory.html) |
| TC-02 | REQ-01 | Error message for locked users | Error message displays: 'Epic sadface: Sorry, this user has been locked out.' |
| TC-03 | REQ-01 | Login with invalid credentials | Error message displays: 'Epic sadface: Username and password do not match any user in this service' |
| TC-04 | REQ-01 | Login fields are kept empty | Error message displays: 'Epic sadface: Username is required' |
| TC-05 | REQ-02 | All products are displayed on the inventory page after login | 6 products are displayed on the inventory page (https://www.saucedemo.com/inventory.html) |
| TC-06 | REQ-02 | Sort product name by Ascending Order (A-Z) | Products are sorted by name in ascending order (A-Z) |
| TC-07 | REQ-02 | Sort product name by Descending Order (Z-A) | Products are sorted by name in descending order (Z-A) |
| TC-08 | REQ-02 | Sort product by Price (Low to High) | Products are sorted by price in ascending order (Low to High) |
| TC-09 | REQ-02 | Sort product by Price (High to Low) | Products are sorted by price in descending order (High to Low) |
| TC-10 | REQ-02 | Product Description | Each product displays name, description, price and image on the inventory page |
| TC-11 | REQ-03 | Add a product to cart | Cart icon count increases to 1 after adding a product |
| TC-12 | REQ-03 | Remove a product from cart | Cart icon count decreases to 0 after removing the product |
| TC-13 | REQ-03 | Cart icon shows the item count added | Cart icon displays the correct number of items added to the cart |
| TC-14 | REQ-03 | Cart item must persist | After adding item to cart and navigating to product page, item still exists in cart |
| TC-15 | REQ-04 | User must be able to proceed to checkout | After adding items to cart, clicking checkout redirects to (https://www.saucedemo.com/checkout-step-one.html) |
| TC-16 | REQ-04 | Fill the mandatory checkout details | User must enter First name, Last name and Postal code to proceed to checkout |
| TC-17 | REQ-04 | Empty fields must show an error message | If user clicks continue without entering mandatory fields, error message is shown |
| TC-18 | REQ-04 | Order summary must show correct items and total | After providing mandatory fields and clicking continue, user is directed to (https://www.saucedemo.com/checkout-step-two.html) where item details and total amount are shown |
| TC-19 | REQ-04 | User must see confirmation after successful checkout | Clicking Finish navigates to (https://www.saucedemo.com/checkout-complete.html) with message 'Thank you for your order!' |
