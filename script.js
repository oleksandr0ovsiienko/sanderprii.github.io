class Car {
    constructor(brand, model, year, price, image) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.price = price;
        this.image = image || 'default-car.jpg'; // Default image if none provided
    }

    getInfo() {
        return `${this.brand} ${this.model} (${this.year}) - €${this.price}`;
    }
}

// Sample car images (you can replace these with actual image URLs)
const sampleImages = {

    'Toyota': 'https://kong-proxy-intranet.toyota-europe.com/c1-images/resize/ccis/680x680/zip/ee/product-token/a0ea7f5a-107c-4ead-8934-7ef9e3179066/vehicle/ffe6ebe8-7883-4b68-99cf-ad735ab05575/padding/50,50,50,50/image-quality/70/day-exterior-04_040.png',
    'Ford': 'https://hips.hearstapps.com/hmg-prod/images/2025-ford-explorer-st-110-65ba6d640cbb3.jpg',
    'BMW': 'https://www.bmw.ee/content/dam/bmw/common/all-models/m-series/m8-coupe/2022/navigation/bmw-8series-coupe-modellfinder.png',
    'Audi': 'https://mediaservice.audi.com/media/live/50900/fly1400x601n1/4a2a/2023.png?wid=850',
    'Mercedes': 'https://media.ed.edmunds-media.com/mercedes-benz/s-class/2024/oem/2024_mercedes-benz_s-class_sedan_amg-s-63-e-performance_fq_oem_1_1600.jpg',
};

let carBrands = ["Toyota", "Ford", "BMW", "Audi", "Mercedes"];
let carsList = generateCars();

function generateCars() {
    let cars = [];
    for (let i = 0; i < carBrands.length; i++) {
        let brand = carBrands[i];
        let luxury = (brand === "BMW" || brand === "Audi" || brand === "Mercedes");
        let price = luxury ? 50000 + (i * 1000) : 20000 + (i * 1000);
        let image = sampleImages[brand];

        let car = new Car(
            brand,
            "Model " + (i + 1),
            2020 + i,
            price,
            image
        );
        cars.push(car);
    }
    return cars;
}

function displayCars(cars) {
    let container = document.getElementById('car-container');
    container.innerHTML = '';

    cars.forEach(function(car) {
        let carDiv = document.createElement('div');
        carDiv.className = 'car';
        carDiv.setAttribute('data-brand', car.brand);

        let carImage = document.createElement('img');
        carImage.src = car.image;
        carImage.alt = car.brand + ' ' + car.model;

        let carTitle = document.createElement('h3');
        carTitle.textContent = car.brand + " " + car.model;

        let carYear = document.createElement('p');
        carYear.innerHTML = "<strong>Aasta:</strong> " + car.year;

        let carPrice = document.createElement('p');
        carPrice.innerHTML = "<strong>Hind:</strong> €" + car.price;

        carDiv.appendChild(carImage);
        carDiv.appendChild(carTitle);
        carDiv.appendChild(carYear);
        carDiv.appendChild(carPrice);
        container.appendChild(carDiv);
    });
}

displayCars(carsList);

// Update menu items dynamically
function updateMenu() {
    let brandList = document.getElementById('brand-list');
    brandList.innerHTML = '';

    // Add "Kõik Autod" option
    let allCarsItem = document.createElement('li');
    let allCarsLink = document.createElement('a');
    allCarsLink.href = '#';
    allCarsLink.textContent = 'Kõik Autod';
    allCarsLink.setAttribute('data-brand', 'all');

    allCarsItem.appendChild(allCarsLink);
    brandList.appendChild(allCarsItem);

    // Get unique brands from carsList
    let brands = [...new Set(carsList.map(car => car.brand))];

    brands.forEach(function(brand) {
        let listItem = document.createElement('li');
        let link = document.createElement('a');
        link.href = '#';
        link.textContent = brand;
        link.setAttribute('data-brand', brand);

        listItem.appendChild(link);
        brandList.appendChild(listItem);
    });
}

updateMenu();

// Menu toggle functionality
let menuButton = document.getElementById('menu-button');
let menu = document.getElementById('menu');
let overlay = document.createElement('div');
overlay.className = 'overlay';
document.body.appendChild(overlay);

function openMenu() {
    menu.classList.add('open');
    overlay.classList.add('active');
    document.body.classList.add('menu-open');
}

function closeMenu() {
    menu.classList.remove('open');
    overlay.classList.remove('active');
    document.body.classList.remove('menu-open');
}

menuButton.addEventListener('click', function() {
    if (menu.classList.contains('open')) {
        closeMenu();
    } else {
        openMenu();
    }
});

overlay.addEventListener('click', closeMenu);

// Filter cars by brand when menu item is clicked
document.getElementById('brand-list').addEventListener('click', function(event) {
    if (event.target.tagName === 'A') {
        event.preventDefault();
        let selectedBrand = event.target.getAttribute('data-brand');

        if (selectedBrand === 'all') {
            // Show all cars
            displayCars(carsList);
        } else {
            // Filter cars
            let filteredCars = carsList.filter(car => car.brand === selectedBrand);
            displayCars(filteredCars);
        }

        closeMenu();
    }
});

// Function to add a new car
function addCar(event) {
    event.preventDefault();

    let brandInput = document.getElementById('brand').value;
    let modelInput = document.getElementById('model').value;
    let yearInput = parseInt(document.getElementById('year').value);
    let priceInput = parseFloat(document.getElementById('price').value);
    let imageInput = document.getElementById('image').value;

    if (!brandInput || !modelInput || isNaN(yearInput) || isNaN(priceInput)) {
        alert("Palun täitke kõik väljad õigesti.");
        return;
    }

    let newCar = new Car(brandInput, modelInput, yearInput, priceInput, imageInput);

    carsList.push(newCar);

    displayCars(carsList);

    // Update the menu with new brand if necessary
    updateMenu();

    document.getElementById('add-car-form').reset();
}

document.getElementById('add-car-form').addEventListener('submit', addCar);
