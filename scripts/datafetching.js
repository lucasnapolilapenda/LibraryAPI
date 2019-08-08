function jsoncall (id, contenedor) {
    $.ajax({
        type:'get',
        url: 'https://openlibrary.org/api/books?jscmd=data&format=json&bibkeys=ISBN:'+id,
        dataType: 'json',
        success: function (response) {
            $('#title').empty()
            $('#title').append('Reading Books')
            var book = response['ISBN:'+ id];
            if (book){
                    var title;
                    var auth = [];
                    var publi = [];
                    var subje = '';
                    var picUrl;
                    var infoUrl;

                    title = book.title;

                    if (book.authors) {
                        book.authors.forEach(function (author) {
                            auth.push(author.name);
                        });
                    }

                    if (book.publishers) {
                        book.publishers.forEach(function (publisher){
                            publi.push(publisher.name);
                        });
                    }

                    if (book.subjects) {
                        book.subjects.forEach(function (subject) {
                            subje += '<a class = "letra" href="' + subject.url + '"target="_blank">' + subject.name + '</a>&nbsp;';
                        });
                    }
                    if (book.cover.large){
                        picUrl = book.cover.large;
                    }
                    if (book.url) {
                        infoUrl = book.url;
                    }


             bookformat = $('<div class="book fadeInUp">\n' +
                 '        <div class="content_book ">\n' +
                 '          <a href="'+ infoUrl +'" target="_blank"><img src="'+ picUrl + '" alt="" ></a>\n' +
                 '          </div>\n' +
                 '          <div class="text">\n' +
                 '            <h3>' + title +  '</h3>\n' +
                 '          </div>\n' +
                 '          <div class="text">\n' +
                 '            <h4>Author:&nbsp;' + auth +  '</h4>\n' +
                 '          </div>\n' +
                 '          <div class="text">\n' +
                 '            <h4>Publisher:&nbsp;' + publi +  '</h4>\n' +
                 '          </div>\n' +
                 '            <p>'+subje+'</p>\n' +
                 '          </div>\n' +
                 '        </div>');
                contenedor.append(bookformat)

            }
            $('#title').empty()
            $('#title').append('List of Books')

        }

    })


}

function searchRequest() {
    var $orders = $('#orders');
    var keyword = $('#searchTab').val();
    $('#orders').empty()

    $.ajax({
        type: 'GET',
        url: 'https://reststop.randomhouse.com/resources/works/?start=0&max=100&expandLevel=1&search=' + keyword,
        dataType: 'xml',
        success: function (orders) {
            var sIsbn;
                $(orders).find('work').each(function () {
                    sIsbn =  $(this).find('titles>:first-child').text();
                        console.log(sIsbn);
                        jsoncall(sIsbn, $orders);

                    })
                  }
            })
    }













/*
$(function () {
    var $orders = $('#orders');

    $.ajax({
        type: 'GET',
        url: 'https://reststop.randomhouse.com/resources/works/?start=0&max=10&expandLevel=1&search=usa',
        dataType: 'xml',
        success: function (orders) {
            $(orders).find('work').each(function () {
                $(orders).find('titles').each(function () {
                    var sIsbn =  $(this).find('isbn').text();
                    var isbnString = sIsbn.toString();
                    var splitIsbn = isbnString.slice(0,14).toString();
                    jsoncall(splitIsbn, $orders);

                })

            }   )}
    })
}) */



