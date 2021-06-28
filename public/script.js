const mainContainer = document.querySelector(".mainContainer");
const searchBtn = document.querySelector(".searchBtn");
const countryInput = document.querySelector("input");
const add = document.querySelector('#add_btn')

const fetchCountry = () => {
  fetch("https://www.trackcorona.live/api/travel")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.data.forEach((country) => {
        const img = `<div class = "Countries">
        <h4>${country.location}</h4><h4>${country.data}</h4></div>`;

        mainContainer.insertAdjacentHTML("beforeend", img);
      });
    });
};
const searchCountry = (pays) => {
  mainContainer.innerHTML = "";
  fetch("https://www.trackcorona.live/api/travel")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.data.forEach((country) => {
        const img = `<div class = "Countries">
        <h4>${country.location}</h4><h3>${country.data}</h3></div>
        <button id="add_btn">Add to my wish list</button>`;
        if(pays == country.location) {

          mainContainer.insertAdjacentHTML("beforeend", img);
          addCountry();
        }
      });
    });
}
const addCountry = () => {
  const country = document.querySelector('.Countries');
  const loc = country.querySelector('h4').innerText;
  const rest = country.querySelector('h3').innerText;
  const dataToSend = {location: loc, restriction: rest};

  add_btn.addEventListener('click', (e)=> {
    console.log(loc)
    console.log(rest)
    console.log(dataToSend)
  })

  fetch("api/countries/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

const sendCountryToServer = (country) => {
  fetch("api/countries/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(country),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

searchBtn.addEventListener("click", (event) => {
  console.log(countryInput.value);
  searchCountry(countryInput.value);
  // sendCountryToServer({ data: countryInput.value });
  // mainContainer.innerHTML = "";

});
fetchCountry();


