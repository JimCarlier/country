const mainContainer = document.querySelector(".mainContainer");
const secondContainer = document.querySelector(".secondContainer")
const searchBtn = document.querySelector(".searchBtn");
const countryInput = document.querySelector("input");
const add = document.querySelector('#add_btn');


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
          // getCountryFromDB();
          
          
        }
      });
    });
}
const addToWishList = () => {
  fetch('api/countries', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    data.data.forEach((country) => {
      const img = `<div class = "WishCountries" data-id=${country.id}>
      <br data-id=${country.id}>
      <h4 data-id=${country.id}>${country.location}</h4><h3 data-id=${country.id}>${country.restrictions}</h3>
      <button class="remove" data-id=${country.id}> Remove country</button></div>`;
      
     

        secondContainer.insertAdjacentHTML("beforeend", img);
      
      
    });
    removeCountry();
    
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}
const sendRemoveToServer = (rem) => {
  fetch('api/removedCountry', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rem)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}
const removeCountry = () => {
  
  const btn = document.querySelectorAll('.remove');
  
  
  console.log(btn)
  btn.forEach((button)=> {
    button.addEventListener('click', (event)=> {
      // alert('okkkkkkkk')
        
          // const test = document.querySelector('h4');
          console.log(button.dataset.id);
          button.parentNode.remove();
          // console.log(test.children[1].innerText)
          // console.log(test.children[2].innerText)
          // console.log(button.children[2].innerText);
          // console.log(button.previousElementSibling.previousElementSibling.innerText);
          // console.log(button.previousElementSibling.innerText);
          const remData = {remId: button.dataset.id};
        // console.log(test)
        // alert(button.dataset.id)
        
          sendRemoveToServer(remData);
        
      
    })

  })
  // const divs = document.querySelectorAll('.Countries');
  // divs.forEach((div)=> {
  //   div.addEventListener('click', (e)=> {
      
  //     if(div.dataset.id == '2') {
  //       alert('damn')
  //     }
  //   })
  // })

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
      addToWishList();
  })
  

}



searchBtn.addEventListener("click", (event) => {
  console.log(countryInput.value);
  searchCountry(countryInput.value);


});
fetchCountry();

// Easy ones

// Add a button to load countries
// Change the lorem ipsum of before departure and about?
// Change the copyright line
// Maybe customize a little the template


// Harder ones
// Add a delete button on the wish list
// Try to match the picture with the country

addToWishList();
