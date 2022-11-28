# Development

### Link to Deployed Website
If you used the stencil code, this is `https://disputedbaboon10.github.io/deployment/`

### Goal and Value of the Application
This application is meant to be a store for random objects. I used an online photo generator to create these objects. I have some interesting sorting methods. I hope this website is fun to navigate and funny to shop!

### Usability Principles Considered
I wanted to make it very clear what are interaction items and what are not. I wanted to keep a consistent design language for all of the buttons which is why they look the same. I wanted to keep the structure very simple to not overcomplicate such a simple functionality.

### Organization of Components
I have 4 different components. One is the header which is the header of the page. This is very simple. Another is the basket which all of the items are added to. Another is the product. I have many instances of the product componet which contains an image, a title and a button. The main has the main list of all the products. App is the top level class that relates the sorting panel with the basket and the main.

### How Data is Passed Down Through Components
The app controls all the data of the products. It controls the listed products (which ones are visible and in what order they should be shown). It also stores what items are added to the cart. App passes those items into Main and Basket components.

### How the User Triggers State Changes
The user clicks on the buttons in App and app calls functions to control the data. After the user sets all the filters, they can apply filters. Apply filters retrieves the values of the different filters and loops through each product to make sure they are in the right order and only the correct ones are shown.
