//Get articles as JSON
$.getJSON("/articles", data => {
    for (let i = 0; i < data.length; i++) {
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + "<h2>" + data[i].headline + "</h2>" + "<br />" + data[i].summary + "<br />" + "<a href='" + data[i].link + "'>Read More</a></p>")
    }
});


//When scrape for articles button is pressed, gather new article list
$(document).on("click", "#getArticles", () => {
    $.ajax({
        method: "GET",
        url: "/scrape"
    })
    .then(function(data) {
        // Log the response
        console.log(data);
        location.reload();
    });
    
});

//TODO: Delete an article
$(document).on("click", ".deletearticle", function() {
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "DELETE",
        url: "/articles" + thisId
    })
    .then(data => {
        console.log(data);
        location.reload();
    })
});


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
                $("#titleinput").val(data.note.title);
                $("#bodyinput").val(data.note.body);
            }
        });
});

//Save a note
$(document).on("click", "#savenote", function () {
    //current id
    const thisId = $(this).attr("data-id");

    //AJAX post request
    $.ajax({
        method: "POST",
        url: "/articles" + thisId,
        data: {
            title: $("#titleInput").val(),
            body: $("#bodyInput").val()
        }
    })
        .then((data) => {
            $("#notes").empty();
        })
    $("#titleInput").val("");
    $("#bodyInput").val("");
});

//Delete a note
$(document).on("click", "#deletenote", function(event) {
    //current id
    const thisId = $(this).attr("data-id");

    $.ajax({
        method: "DELETE",
        url: "/articles/" + thisId,
        success(data) {},
        error(err) {
            console.log(err)
        }
    })
    .then((data) => {
        $("#titleInput").val("");
        $("#bodyInput").val("");
        $("#notes").empty()
    })
});

