var x;
var y;
var earth;
var marker;
var countriesList = $('#countries');
$('#search').click(searchCountries);
$(window).on('load', getCountries);

function getCountries() {
    $.ajax({
        url: 'https://restcountries.eu/rest/v1/all',
        method: 'GET',
        success: avaliableCountries
    });
}

function searchCountries() {
    var countryName = $('#country-name').val();
    if (!countryName) { countryName = 'Poland' };
    $.ajax({
        url: 'https://restcountries.eu/rest/v1/name/' + countryName + '?fullText=true',
        method: 'GET',
        success: showCountriesList
    });
}

function showCountriesList(resp) {
    countriesList.empty();
    resp.forEach(function (item) {
        x = item.latlng[0];
        y = item.latlng[1];
        $('<li><div class="image"><img src=img/' + item.alpha2Code.toLowerCase() + '.png></div><div class="country"><h2>' + item.name + '</h2></div></li>').appendTo(countriesList);
        $('<li><div class="item"><h3>Capital:</h3></div><div class="value">' + item.capital + '</div></li>').appendTo(countriesList);
        $('<li><div class="item"><h3>Region:</h3></div><div class="value">' + item.region + '</div></li>').appendTo(countriesList);
        $('<li><div class="item"><h3>Subregion:</h3></div><div class="value">' + item.subregion + '</div></li>').appendTo(countriesList);
        $('<li><div class="item"><h3>Population:</h3></div><div class="value">' + item.population + '</div></li>').appendTo(countriesList);
        $('<li><div class="item"><h3>Area:</h3></div><div class="value">' + item.area + '</div></li>').appendTo(countriesList);
        $('<li><div class="item"><h3>Borders:</h3></div><div class="value">' + item.borders + '</div></li>').appendTo(countriesList);
        $('<li><div class="item"><h3>Currencies:</h3></div><div class="value">' + item.currencies + '</div></li>').appendTo(countriesList);
        $('<li><div class="item"><h3>Languages:</h3></div><div class="value">' + item.languages + '</div></li>').appendTo(countriesList);
        earth.panTo([x, y]);
        marker = WE.marker([x, y]).addTo(earth);
    });
};

function initialize() {
    earth = new WE.map('earth_div', { zoom: 2 });
    var layer = WE.tileLayer('http://tileserver.maptiler.com/cassini-terrestrial/{z}/{x}/{y}.jpg', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(earth);
}

function avaliableCountries(resp) {
    var availableTags = [];
    resp.forEach(function (item) {
        availableTags.push(item.name);
    });
    $("#country-name").autocomplete({
        source: availableTags
    });
};

