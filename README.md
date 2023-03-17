# eCommerce-RESTful-API

<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/kilar95/eCommerce-RESTful-API.git">
    <img src="https://user-images.githubusercontent.com/104167965/214048722-6852a762-0ab5-47d9-9497-980075d4f4c9.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Meditation App</h3>

  <p align="center">
    Breathe and relax!
    <br />
    <a href="https://github.com/kilar95/eCommerce-RESTful-API"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    ·
    <a href="https://github.com/kilar95/eCommerce-RESTful-API/issues">Report Bug</a>
    ·
    <a href="https://github.com/kilar95/eCommerce-RESTful-API/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <a href="#libraries">Libraries</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#endpoints">Endpoints</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This project was created for the start2impact Node.js course. <br>
This RESTful API provides data about a fictional e-Commerce. You can view, create and update entries about:

<li>Products</li>
<li>Users</li>
<li>Orders</li>

The endpoints to perform CRUD operations are listed in the upcoming section of this guide.

This project was created using Node.js and MongoDB.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Libraries

- Express
- dotenv
- Mongoose

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

In order to proceed you should have Node.js installed.
If you don't, you can download it here: <a href="https://nodejs.org/it/download/">Node.js</a>
After installing Node you are ready to go!

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/kilar95/eCommerce-RESTful-API.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start!
   ```sh
   npm start
   ```
4. Connect you MongoDB database
   If you don't see an .env file in the folder, create one and the insert an enviroment variable called ATLAS_URI, which should be assigned to your MongoDB connection string.
   Example: ATLAS_URI="mongodb+srv://...
5. Test it
   For testing you can use a client like Thunder Client or Postman.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Endpoints

### Products

Get the full list of products with a <str>GET</str> request at:

```sh
/products
```

Create a product with a <str>POST</str> request at:

```sh
/products
```

```sh
{
  "name": "String",
  "price": Number,
  "inStock": Boolean
}
```

In the req.body it is required to specify the name of the product

Get the details about a specific product with a <str>GET</str> request at:

```sh
/products/:productID
```

where productID is a valid MongoDB ID of one of the products in the DB.
At the same endpoint you can <str>PATCH</str> and <str>DELETE</str> any product.

### Users

Get the full list of users with a <str>GET</str> request at:

```sh
/users
```

Create a user with a <str>POST</str> request at:

```sh
/users
```

```sh
{
  "name": "String"
  "surname": "String",
  "email": "String"
}
```

In the req.body it is required to specify the name, surname and email of the user

Get the details about a specific user with a <str>GET</str> request at:

```sh
/users/:userID
```

where userID is a valid MongoDB ID of one of the users in the DB.
At the same endpoint you can <str>PATCH</str> and <str>DELETE</str> any user.

### Orders

Get the full list of orders with a <str>GET</str> request at:

```sh
/orders
```

Create an order from the user specified in the url with a <str>POST</str> request at:

```sh
/orders/:userID
```

```sh
{
  "products": [ "array of valid productsID" ],
  "quantity": [ array of Numbers ]
}
```

In the req.body it is required to specify the products that you wish to order.
At the same endpoint you can get all the orders from the specified user with a <str>GET</str> request.

Get the details about a specific order with a <str>GET</str> request at:

```sh
/orders/details/:orderID
```

where orderID is a valid MongoDB ID of one of the orders in the DB.

You can also <str>PATCH</str> and <str>DELETE</str> any order at the following endpoint

```sh
/orders/:orderID
```

Finally, you can filter the orders by creation Date and by Products using a SEARCH query at the following endpoint:

```sh
/orders/query/filter
```

The parameters to filter the results are:

<ul>
    <li> **startDate**: valid ISO start date (e.g. 2023-03-16), returns orders created after the specified date </li>
    <li> **endDate**: valid ISO start date (e.g. 2023-03-18), returns orders created before the specified date  </li>
    <li> **productID**: valid MongoDB product ID, which allows you to search for all the orders of the corresponding product </li>
</ul>

examples:

```sh
/orders/query/filter?productID=641388b52d4a5f1039107eb2&startDate=2023-03-17&endDate=2023-03-17
```

```sh
/orders/query/filter?productID=641388b52d4a5f1039107eb
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Ilaria Bertoldi - [Linkedin](https://www.linkedin.com/in/ilaria-bertoldi-837a20176/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

- [Img Shields](https://shields.io)
- [GitHub Pages](https://pages.github.com)
- [Best README Template](https://github.com/othneildrew/Best-README-Template#readme)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/kilar95/MeditationApp.svg?style=for-the-badge
[contributors-url]: https://github.com/kilar95/eCommerce-RESTful-API/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/kilar95/MeditationApp.svg?style=for-the-badge
[forks-url]: https://github.com/kilar95/eCommerce-RESTful-API/network/members
[stars-shield]: https://img.shields.io/github/stars/kilar95/MeditationApp.svg?style=for-the-badge
[stars-url]: https://github.com/kilar95/eCommerce-RESTful-API/stargazers
[issues-shield]: https://img.shields.io/github/issues/kilar95/MeditationApp.svg?style=for-the-badge
[issues-url]: https://github.com/kilar95/eCommerce-RESTful-API/issues
[license-shield]: https://img.shields.io/github/license/kilar95/MeditationApp.svg?style=for-the-badge
[license-url]: https://github.com/kilar95/eCommerce-RESTful-API/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/ilaria-bertoldi-837a20176/
[product-screenshot]: ./src/assets/og-image.PNG
[next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[next-url]: https://nextjs.org/
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[vue-url]: https://vuejs.org/
[angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[angular-url]: https://angular.io/
[svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[svelte-url]: https://svelte.dev/
[laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[laravel-url]: https://laravel.com
[bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[bootstrap-url]: https://getbootstrap.com
[jquery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[jquery-url]: https://jquery.com
