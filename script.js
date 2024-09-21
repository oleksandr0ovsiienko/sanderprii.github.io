// Primitiivid
let totalCars = 5; // number
let companyName = "Autoettevõte OÜ"; // string
let isActive = true; // boolean

// Spetsiaalsed väärtused
let specialNumber = NaN;
let infiniteValue = Infinity;
let emptyValue = null;
let notDefined;

// Kompleksandmetüübid
let carBrands = ["Toyota", "Ford", "BMW", "Audi", "Mercedes"]; // Array

// Klass Car
class Car {
    constructor(brand, model, year, price) {
        this.brand = brand; // string
        this.model = model; // string
        this.year = year; // number
        this.price = price; // number
    }

    // Meetod auto info saamiseks
    getInfo() {
        return `${this.brand} ${this.model} (${this.year}) - €${this.price}`;
    }
}

// Funktsioon autode genereerimiseks
function generateCars() {
    let cars = [];
    // Tsükkel
    for (let i = 0; i < carBrands.length; i++) {
        let brand = carBrands[i];
        // Tingimus
        let luxury = (brand === "BMW" || brand === "Audi" || brand === "Mercedes");

        // Spetsiaalse väärtuse kasutamine
        let price = luxury ? 50000 + (i * 1000) : 20000 + (i * 1000);
        if (price === Infinity) {
            price = infiniteValue;
        }

        // Uue auto loomine
        let car = new Car(
            brand,
            "Mudel " + (i + 1),
            2020 + i,
            price
        );
        cars.push(car);
    }
    return cars;
}

// Autode nimekirja loomine
let carsList = generateCars();

// Funktsioon autode kuvamiseks lehel
function displayCars(cars) {
    let container = document.getElementById('car-container');
    container.innerHTML = ''; // Tühjendame konteineri enne kuvamist

    // Tsükkel
    cars.forEach(function(car) {
        let carDiv = document.createElement('div');
        carDiv.className = 'car';

        let carTitle = document.createElement('h2');
        carTitle.textContent = car.brand + " " + car.model;

        let carYear = document.createElement('p');
        carYear.textContent = "Aasta: " + car.year;

        let carPrice = document.createElement('p');
        carPrice.textContent = "Hind: €" + car.price;

        carDiv.appendChild(carTitle);
        carDiv.appendChild(carYear);
        carDiv.appendChild(carPrice);
        container.appendChild(carDiv);
    });
}

// Funktsiooni kutsumine autode kuvamiseks
displayCars(carsList);

// Uue auto lisamise funktsioon
function addCar(event) {
    event.preventDefault(); // Vältida vormi vaikimisi submit'i

    // Saame vormi väärtused
    let brandInput = document.getElementById('brand').value;
    let modelInput = document.getElementById('model').value;
    let yearInput = parseInt(document.getElementById('year').value);
    let priceInput = parseFloat(document.getElementById('price').value);

    // Kontrollime, kas sisestatud andmed on korrektsed
    if (!brandInput || !modelInput || isNaN(yearInput) || isNaN(priceInput)) {
        alert("Palun täitke kõik väljad õigesti.");
        return;
    }

    // Loome uue auto objekti
    let newCar = new Car(brandInput, modelInput, yearInput, priceInput);

    // Lisame auto nimekirja
    carsList.push(newCar);

    // Kuvame uuendatud autode nimekirja
    displayCars(carsList);

    // Tühjendame vormi väljad
    document.getElementById('add-car-form').reset();
}

// Lisame vormile kuulaja
let addCarForm = document.getElementById('add-car-form');
addCarForm.addEventListener('submit', addCar);