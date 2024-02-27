const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");
const unifySpace = "spa_guwfkaTcfqVerxoetnb6AS"
const profileApiToken = "OnE2g7YLo4LqQBIKPUo5pcm73Ph7tIvJdAuy6__xZzaMKfMHmb6BSz9hO08hom4b4MpDcVKn3Gi0OKPy4gb4QsHz8_u8e7vwOsjk96yjiJfP5v2yqLqUjLk1bUltCR5G75jv2lLC9DABHccEE-5wl82dvvnSDCGe7P54GFNJ2gFD3vQPAp01nJ1_Dpjb1tQM7-kGOAqx8JxdeasC6o7dHFuIQ_Z5BfLif3b87TVHsmt0vHM0Uhf9XHqzBUavTJCSmu24kDnl_OwOX_O9lO5po8NDBZo="

/*
analytics.ready(function () {
  let anonymous_id = analytics.user().anonymousId();
  console.log("ANON ID:" + anonymous_id);
  let anon_id = (anonymous_id.replace(/['"]+/g, ''));
  console.log("NEW ANON:" + anon_id);
  let hash = btoa(profileApiToken + ':')
  console.log("HASH" + hash);

  const apiUrl = 'https://profiles.segment.com/v1/spaces/' + unifySpace + '/collections/users/profiles/anonymous_id:' + anon_id + '/traits';
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `${apiUrl}`);
  xhr.setRequestHeader("Basic", hash);
  xhr.send();
  xhr.responseType = "json";
  xhr.getResponseHeader
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const data = xhr.response;
      console.log(data);
    } else {
      console.log(`Error: ${xhr.status}`);
    }
  };
});*/

// Define the API URL


const products = [
    {
        id: 1,
        category: "Full File",
        price: 119,
        img: "./img/pexels-mnz-1598505.jpg",
        singleProductImg: "./img/blazer2.png",
        productTitle: "Blazer"
    },
    {
        id: 2,
        category: "Mens",
        price: 149,
        img: "./img/nike-men-hero.png",
        singleProductImg: "./img/blazer.png",
        productTitle: "Men's Blazer",
    },
    {
        id: 3,
        category: "Womens",
        price: 109,
        img: "./img/nike-women-hero.png",
        singleProductImg: "./img/women-metcon.png",
        productTitle: "Women's Metcon",
    },
    {
        id: 4,
        category: "Kids",
        price: 129,
        img: "./img/nike-kids-hero.png",
        singleProductImg: "./img/jordan-kids.png",
        productTitle: "Boys Jordans",
    },
    {
        id: 5,
        category: "Sale",
        price: 99,
        img: "./img/nike-sale.png",
        singleProductImg: "./img/air-jordan-mid.png",
        productTitle: "Air Jordan Mid",
    },
];

let chosenProduct = products[0];

const currentProductImg = document.querySelector(".productImg");
const carouselImg = document.querySelector(".carousel-img");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");
const cartProductImg = document.querySelector(".cartProductImg");
const cartProductTitle = document.querySelector(".cartProductTitle");
const cartProductPrice = document.querySelector(".cartProductPrice");

//handle anonymous ID
const cname = "ajs_anonymous_id";

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

let newCookie = getCookie(cname);


menuItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        //change the chosen product
        chosenProduct = products[index];

        //change texts of currentProduct
        currentProductTitle.textContent = chosenProduct.productTitle;
        currentProductPrice.textContent = "$" + chosenProduct.price;
        currentProductImg.src = chosenProduct.singleProductImg;
    });
});


document.querySelectorAll(".carousel").forEach((carousel) => {
    const items = carousel.querySelectorAll(".carousel_item");

    menuItems.forEach((button, i) => {
        button.addEventListener("click", () => {
            // un-select all the items
            chosenProduct = products[i];
            console.log("Chosen Product:" + chosenProduct.category);
            carouselImg.src = chosenProduct.img;
            analytics.track('Product Viewed', {
                category: chosenProduct.category,
                name: chosenProduct.productTitle,
                price: chosenProduct.price,
            });
        });
    });

    // Select the first item on page load
});

currentProductSizes.forEach((size, index) => {
    size.addEventListener("click", () => {
        currentProductSizes.forEach((size) => {
            size.style.backgroundColor = "white";
            size.style.color = "black";
        });
        size.style.backgroundColor = "black";
        size.style.color = "white";
    });
});

const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");
const payButton = document.querySelector(".payButton");
const resetAJS = document.querySelector(".resetAJS");
const newsletterButton = document.querySelector(".fButton");


newsletterButton.addEventListener("click", () => {
    let newsletterEmail = document.getElementById("newsletterEmail").value;
    console.log("BUTTON")
    analytics.identify(`${newsletterEmail}`, {
        email: `${newsletterEmail}`
    });
});

resetAJS.addEventListener("click", () => {
    analytics.reset()
});

productButton.addEventListener("click", () => {
    payment.style.display = "flex";
    cartProductImg.src = chosenProduct.singleProductImg;
    cartProductPrice.textContent = "$" + chosenProduct.price;
    cartProductTitle.textContent = chosenProduct.productTitle;

    analytics.track('Checkout Started', {
        name: chosenProduct.productTitle,
        price: chosenProduct.price,
        category: chosenProduct.category,
    });
});

payButton.addEventListener("click", () => {
    console.log("TEST" + chosenProduct.title);
    let payEmail = document.getElementById("email").value;

    analytics.identify(`${newCookie}`, {
        name: document.getElementById("fullName").value,
        email: document.getElementById("email").value
    });
    analytics.track('Order Completed', {
        name: chosenProduct.productTitle,
        price: chosenProduct.price,
        category: chosenProduct.category,
    });
    payment.style.display = "none";
});

close.addEventListener("click", () => {
    payment.style.display = "none";
});
