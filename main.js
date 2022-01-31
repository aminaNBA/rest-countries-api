// ALL COUNTRIES
const allCountries = document.querySelector(".countries .container");

// API COUNTRIES
const url = "https://restcountries.com/v2/all";
async function loadCountries() {
  const response = await fetch(url);
  const countries = await response.json();
  displayCountries(countries);
}

// DISPLAY COUNTRIES IN DOM HTML
function displayCountries(countries) {
  // LOOP THROUTH ARRAY OF COUNTRIES
  countries.forEach((country) => {
    //   CREATE COUNTRY IN DOM
    let oneCountry = document.createElement("div");
    oneCountry.classList.add("country");
    oneCountry.innerHTML = `
        <div class="flag">
          <img src=${country.flags.svg} alt="flag">
        </div>
        <div class="infos">
            <h3 class="country-name">${country.name}</h3>
            <p><strong>Population: </strong>${country.population}</p>
            <p class="country-region"><strong>Region: </strong>${country.region}</p>
            <p><strong>Capital: </strong>${country.capital}</p>
        </div>
    `;
    allCountries.appendChild(oneCountry);

    // TOGGLE BETWEEN THE MAIN AND DETAILS PAGES
    const mainPage = document.querySelector(".main-page");
    const detailPage = document.querySelector(".detail-page");
    const backBtn = detailPage.querySelector(".back");
    oneCountry.addEventListener("click", () => {
      mainPage.classList.add("hide");
      detailPage.classList.add("show-page");
      showCountryDetails(country);
    });
    backBtn.addEventListener("click", () => {
      mainPage.classList.remove("hide");
      detailPage.classList.remove("show-page");
    });
  });
}
loadCountries();

// DETAILS PAGES
const detailCountry = document.querySelector(".detail-country");
// CREATE DETAIL COUNTRY PAGE
function showCountryDetails(country) {
  detailCountry.innerHTML = `<div class="flag">
  <img src=${country.flags.svg} alt="flag">
</div>
<div class="more-details">
  <h2 class="name">${country.name}</h2>
  <p><strong>native Name: </strong>${country.name}</p>
  <p><strong>Population: </strong>${country.population}</p>
  <p><strong>Region: </strong>${country.region}</p>
  <p><strong>Sub Region: </strong>${country.subregion}</p>
  <p><strong>Capital: </strong>${country.capital}</p>
  <p><strong>Top Level Domain: </strong>${country.topLevelDomain}</p>
  <p><strong>Currencies: </strong>${country.currencies[0].name}</p>
  <p><strong>Languages: </strong>${country.languages.map(
    (language) => language.name
  )}</p>
  <br/>
  <div class="borders">
      <p><strong>Border Countries:  </strong><span class="border"> ${
        country.borders
      }</span></p>
  </div>
</div>`;
}

// SEARCH COUNTIES WITH NAME
const search = document.getElementById("search");
search.addEventListener("keyup", (e) => {
  const {
    value
  } = e.target;
  const countryName = document.querySelectorAll(".country-name");
  countryName.forEach((name) => {
    if (name.innerHTML.toLowerCase().includes(value.toLowerCase())) {
      name.parentElement.parentElement.style.display = "";
    } else {
      name.parentElement.parentElement.style.display = "none";
    }
  });
});

// SHOW CONTINENT DROPDOWN
const showContinent = document.querySelector(".filter-by-region");
const continents = showContinent.querySelectorAll("li");
const continent = document.querySelector(".continent");
const titleContinent = document.querySelector(".filter-by-region span")

showContinent.addEventListener("click", () => {
  continent.classList.toggle("show-continent");
});

continents.forEach((continent) => {
  continent.addEventListener("click", () => {
    const countryRigion = document.querySelectorAll(".country-region");
    const value = continent.textContent;
    titleContinent.textContent = continent.textContent
    countryRigion.forEach((region) => {
      if (region.innerHTML.indexOf(value) > -1 || value === "All") {
        region.parentElement.parentElement.style.display = "";
      } else {
        region.parentElement.parentElement.style.display = "none";
      }
    });
  });
});

// DARK MODE
const switchBtn = document.querySelector(".switch-theme");
const darkMode = document.querySelector(".switch-theme .dark");
const lightMode = document.querySelector(".switch-theme .light");
const titleThemeDark = document.querySelector(".switch-theme .title-dark")

const titleThemeLight = document.querySelector(".switch-theme .title-light")
const nabvar = document.querySelector("nav");

switchBtn.addEventListener("click", swicherTheme);

function swicherTheme() {
  document.body.classList.toggle("dark");
  darkMode.classList.toggle("show");
  lightMode.classList.toggle("hidden");
  nabvar.classList.toggle("dark");
  showContinent.classList.toggle("dark");
  continent.classList.toggle('dark')
  titleThemeLight.classList.toggle('show')
  titleThemeDark.classList.toggle('hide')
}