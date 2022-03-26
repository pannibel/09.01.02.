window.addEventListener("DOMContentLoaded", init);

function init(event) {
  loadBikes();
}

async function loadBikes() {
  const response = await fetch(
    "https://themotelmellow.com/bikeshop/wp-json/wp/v2/bike?_embed"
  );
  console.log("lacj-response", response);
  const thedata = await response.json();
  displayData(thedata);
}

function displayData(bikes) {
  console.log(bikes);
  bikes.forEach((bike) => {
    console.log(bike.title.rendered);
    const templateEl = document.querySelector("template").content;
    const cloneEl = templateEl.cloneNode(true);


    cloneEl.querySelector(".bikeimg").src =
      bike._embedded[
        "wp:featuredmedia"
      ][0].media_details.sizes.medium_large.source_url;
    cloneEl.querySelector("h4").textContent =
      bike.brand;
    cloneEl.querySelector("h2").textContent = bike.title.rendered;
    let priceEl = cloneEl.querySelector(".price span");
    let priceText = bike.price;

    cloneEl.querySelector(".pricespan").textContent = bike.price+' '+'$';
    cloneEl.querySelector(".instock span").textContent = bike.in_stock;
  

    let colors = bike._embedded["wp:term"][1];
    if (colors.length) {
    //   alert("hey");
     cloneEl.querySelector(".colour span").textContent = "";
     const ulEl = document.createElement("ul");
     colors.forEach((color) => {
    const liEl = document.createElement("li");
     liEl.style.backgroundColor = color.name;
     ulEl.appendChild(liEl);
     });
    cloneEl.querySelector(".colour span").appendChild(ulEl);
    }

    const parentEl = document.querySelector("main");
    parentEl.appendChild(cloneEl);
  });

}