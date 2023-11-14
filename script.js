const url = "./countries.json"
const lista = document.querySelector("#countries-list")
const barraPesquisa = document.querySelector("#barraPesquisa")
const subTit = document.querySelector("#subtitle");
const buttonName = document.querySelector("#name");
const buttonCapital = document.querySelector("#capital")
let ordemAtual = "ascendente"

getAllCountries()

barraPesquisa.addEventListener("input", () => {
    termo = barraPesquisa.value.toLowerCase()
    termo === ""? getAllCountries() : getListCountries()
})

async function getAllCountries() {
    const response = await fetch(url)
    console.log(response)
    const data = await response.json()
    console.log(data); 

    buttonName.addEventListener("click", () => {
        sortCountries(data)
    })


    lista.innerHTML = "";

    data.map((pais) => {
        const div = document.createElement("div")
        div.classList.add("caixinha")
        const text = document.createElement("div")
        text.classList.add("texts")
        const name = document.createElement("h3") 
        const capital = document.createElement("p")
        const population = document.createElement("p")
        const flag = document.createElement("img")
        const lang = document.createElement("p")


       name.innerText = pais.name
       capital.innerText = "Capital: " + pais.capital
       population.innerText = "Population: " + pais.population
       flag.setAttribute("src", `${pais.flag}`)
       lang.innerText = "Languages: " + pais.languages

       div.appendChild(flag)
       div.appendChild(name)
       text.appendChild(capital)
       text.appendChild(lang)
       text.appendChild(population)

       div.appendChild(text)
   
       lista.appendChild(div) 
    })
}

async function getListCountries(){
    const response = await fetch(url)
    console.log(response)
    const data = await response.json() 
    console.log(data);

    const cFiltered = data.filter((pais) => {
        return pais.name.toLowerCase().includes(termo)
    })

    buttonName.addEventListener("click", () => {
        sortCountries(cFiltered)
    })

    lista.innerHTML = ""
    
    cFiltered.map((pais) => {
    const div = document.createElement("div")
    div.classList.add("caixinha")
    const text = document.createElement("div")
    text.classList.add("texts")
    const name = document.createElement("h3") 
    const capital = document.createElement("p")
    const population = document.createElement("p")
    const flag = document.createElement("img")
    const lang = document.createElement("p")

    name.innerText = pais.name
    capital.innerText = "Capital: " + pais.capital
    population.innerText = "Population: " + pais.population
    flag.setAttribute("src", `${pais.flag}`)
    lang.innerText = "Languages: " + pais.languages

    div.appendChild(flag)
    div.appendChild(name);
    text.appendChild(capital)
    text.appendChild(lang)
    text.appendChild(population)

    div.appendChild(text);

    lista.appendChild(div) 
    })

}

function sortCountries(CountriesData) {
    if(CountriesData.length === 0) {
        console.error("Nenhum pais para ordenar, Carregue os países primeiro.")
    }

    CountriesData.sort((a, b) => {
        const valueA = a.name.toLowerCase()
        const valueB = b.name.toLowerCase()

        if(valueA < valueB) return (ordemAtual ==="ascendente")? -1 : 1
        if(valueA > valueB) return (ordemAtual ==="ascendente")? 1 : -1
        return 0;
    })

    lista.innerHTML = ""

    CountriesData.map((pais) => {
        const div = document.createElement("div")
        div.classList.add("caixinha")
        const text = document.createElement("div")
        text.classList.add("texts")
        const name = document.createElement("h3") 
        const capital = document.createElement("p")
        const population = document.createElement("p")
        const flag = document.createElement("img")
        const lang = document.createElement("p")

        name.innerText = pais.name
        capital.innerText = "Capital: " + pais.capital
        population.innerText = "Population: " + pais.population
        flag.setAttribute("src", `${pais.flag}`)
        lang.innerText = "Languages: " + pais.languages

        div.appendChild(flag)
        div.appendChild(name);
        text.appendChild(capital)
        text.appendChild(lang)
        text.appendChild(population)

        div.appendChild(text);

        lista.appendChild(div) 
    })

        ordemAtual = (ordemAtual === "ascendente") ? "descendente" : "ascendente"
    }