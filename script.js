const cardContainer = document.querySelector('.countries-container')
const filterByRegion = document.querySelector('.filter')
const searchInput = document.querySelector('.search-container input')
const theme = document.querySelector('.theme-change')


let allCountriesData

fetch('https://restcountries.com/v3.1/all')
.then((res) => res.json())
.then((data) => {
    renderCountries(data)
    allCountriesData = data
})

filterByRegion.addEventListener('change',(e)=>{
    //console.log(filterByRegion.value);
    fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res) => res.json())
    .then(renderCountries)

})

function renderCountries(data){
    cardContainer.innerHTML=''
    data.forEach(country => {
    //console.log([country.borders]);
    const countryCard = document.createElement('a')
    countryCard.classList.add('country-card')
    countryCard.href = `/country.html?name=${country.name.common}`
    const cardHtml = `
        <img src="${country.flags.svg}" alt="flag">
        <div class="card-text">
            <h3 class="card-title">${country.name.common}</h3>
            <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
            <p><b>Region: </b>${country.region}</p>
            <p><b>Capital: </b>${country.capital?.[0]}</p>
        </div>
    `
    countryCard.innerHTML = cardHtml

    cardContainer.append(countryCard)
})
}

searchInput.addEventListener('input',(e)=>{
   // console.log(e.target.value);
   const filtered = allCountriesData.filter((country)=>{
   return country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
    })
    renderCountries(filtered)
    console.log(filtered);
})

theme.addEventListener('click',()=>{
    document.body.classList.toggle('dark')
})