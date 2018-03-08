$(document).ready(function () {

    let topics = ['Corvette', 'Audi R8 V10', 'Lamborgini Centenario', 'Ferrari', 'Dodge Viper', 'Dodge Challenger Hellcat', 'Camaro', 'Lexus', 'Bentley Mulsanne', 'Ford Mustang', 'Aston Martin', 'Tesla'];
    let car;
    let query;
    let limit = 10;
    let rating;

    $.each(topics, function (index, item) {
        $('#carButtons').append(`<button>${item}</button>`);
    });

    $('#addCar').on('click', function (e) {
        e.preventDefault();
        car = $('#car-input').val();

        if (car !== '') {
            $('#carButtons').append(`<button class="added">${car}</button>`);
        }
    });

    $('#clear').on('click', function () {
        $('.added').remove();
    });

    $('#carButtons').on('click', 'button', function (e) {
        $('.gif').remove();
        query = e.target.textContent;

        let queryURL = `https://api.giphy.com/v1/gifs/search?api_key=lpIfKCoXBupObInfL6H7Kx4yBATSBbXT&q=${query}&limit=${limit}&offset=0&rating=&lang=en`;

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function (res) {

            for (let i = 0; i < res.data.length; i++) {
                let stillImage = res.data[i].images.original_still.url;
                let animation = res.data[i].images.original.url;
                $('#cars').append(`
                <div class="gif">
                    <p>Rating: ${res.data[i].rating.toUpperCase()}</p>
                    <img src=${stillImage} data-animated=${animation} data-still=${stillImage} alt="car image" height="125">
                </div>
                `);
                $('.gif').css({ 'display': 'inline-block', 'margin-right': '1rem' });
            }
        }).fail(function(xhr) {
            alert('Sorry, there was a problem processing your request!');
            console.log("Status: " + xhr.status);
            console.dir(xhr);
        });
    });

    $('#cars').on('click', 'img', function () {
        let animated = $(this).attr('data-animated');
        let still = $(this).attr('data-still');

        $(this).toggleClass('animated');
        if (this.className === 'animated') {
            $(this).attr('src', animated);
        } else {
            $(this).attr('src', still);
        }
    });
});

