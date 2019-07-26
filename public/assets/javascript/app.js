//Get articles as JSON
$.getJSON("/articles", data => {
    for (let i = 0; i < data.length; i++) {
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>")
    }
});


//When scrape button is pressed, gather new article list
$(document).on("click", "#getArticles", () => {
    $("#load").css("visibility", "visible");
}) ;


//When clicking on an article(p-tag) notes can be added
$(document).on("click", "p", function () {
    $("#notes").empty();

    const thisId = $(this).attr("data-id");

    //AJAX call for the article
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId,

    })
    .then((data) => {
        $("#notes").append("<h2>" + data.title + "</h2>");
        $("#notes").append("<input id='titleinput' name='title' >");
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        $("#notes").append("<button class='btn btn-secondary' data-id='" + data._id + "' id='savenote'>Save Note</button>");
        $("#notes").append("<button class='btn btn-secondary' data-id='" + data._id + "' id='deletenote>Delete Note</button>")

        //If there is a note attached to the article
        if (data.note) {
            $("titleinput").val(data.note.title);
            $("#bodyinput").val(data.note.body);
        }
    });
});


