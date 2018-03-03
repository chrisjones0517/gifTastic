


$(document).ready(() => {

    let carArr = ['Corvette', 'Audi R8 V10', 'Lamborgini Centenario', 'Ferrari', 'Dodge Viper', 'Dodge Challenger Hellcat', 'Camaro Z-28', 'Alpha Romeo 4C', 'Bentley Mulsanne', 'Ford Mustang'];
    let car;
    let query;
    let limit = 10;
    let rating;


    $.each(carArr, (index, item) => {
        $('#carButtons').append(`<button>${item}</button>`);
    });

    $('#addCar').on('click', (e) => {
        e.preventDefault();
        car = $('#car-input').val();
        if (car !== '') {
            $('#carButtons').append(`<button class="added">${car}</button>`);
        }
    });
    $('.added').click(() => {
        console.log('new button clicked');
    });
    $('button').click((e) => {
        $('.gif').remove();
        query = e.target.textContent;
        console.log(e);
        let queryURL = `https://api.giphy.com/v1/gifs/search?api_key=lpIfKCoXBupObInfL6H7Kx4yBATSBbXT&q=${query}&limit=${limit}&offset=0&rating=&lang=en`;
        console.log(query);
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then((res) => {
            console.log(res.data);
            $.each(res.data, (index, item) => {
                let imgHt = item.images.original.height;
                let imgWd = item.images.original.width;
                let x = 125 / imgHt;
                let newWd = x * imgWd;
                $('#cars').append(`<div class="gif"><p>Rating: ${item.rating.toUpperCase()}</p><img src=${item.images.original.url} width=${newWd} height="125"></div>`);
                $('.gif').css({'display':'inline-block', 'margin-right':'1rem'});
                //console.log(item.images.preview_webp.url);
            });

        });

    });




    // API key   lpIfKCoXBupObInfL6H7Kx4yBATSBbXT

    // 

});