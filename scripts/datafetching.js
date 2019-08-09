function jsoncall (id, contenedor) {
    $.ajax({
        type:'get',
        url: 'https://openlibrary.org/api/books?jscmd=data&format=json&bibkeys=ISBN:'+id,
        dataType: 'json',
        success: function (response) {
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
                            subje += '<a class = "letra" style="text-decoration: none" href="' + subject.url + '"target="_blank">' + subject.name + '</a>&nbsp;';
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
                 '            <h2>' + title +  '</h2> <h5 style="font-weight: normal"><span style="font-weight: bold">Author:&nbsp;</span>' + auth +  '</h5>\n' +
                 '          </div>\n' +
                 '          <div class="text">\n' +
                 '            </h2> <h5 style="font-weight: normal"><span style="font-weight: bold">Publisher:&nbsp;</span>' + publi +  '</h5>\n' +
                 '          </div>\n' +
                 '            <p><span style="font-weight: bold; font-size: 13px">Subjects:&nbsp;</span>'+subje+'</p>\n' +
                 '          </div>\n' +
                 '        </div>');
                contenedor.append(bookformat)

            }


        }


    })

}

function searchRequest() {
    var $orders = $('#orders');
    var keyword = $('#searchTab').val();
    $('#orders').empty()
    $('#title').empty()

    $.ajax({
        type: 'GET',
        url: 'https://reststop.randomhouse.com/resources/works/?start=0&max=100&expandLevel=1&search=' + keyword,
        dataType: 'xml',
        success: function (orders) {
            var sIsbn;
                if($(orders).find(':first-child').text) {
                    console.log($(orders).find(':first-child').text);
                    $(orders).find('work').each(function () {
                        sIsbn = $(this).find('titles>:first-child').text();
                        if (sIsbn.valueOf()) {
                            console.log(sIsbn);
                            jsoncall(sIsbn, $orders);
                        }
                    })
                    $('#title').append('    <h2 class="book_title fadeInUp">List of Books</h2>')
                }

                if (!sIsbn) {
                    alert('No book Found')
                    $('#title').empty()
                }

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



