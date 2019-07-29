//Get articles as JSON
$.getJSON("/articles", data => {
    for (let i = 0; i < data.length; i++) {
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + "<h2>" + data[i].headline + "</h2>" + "<br />" + data[i].summary + "<br />" + "<a href='" + data[i].link + "'>Read More</a></p>" + 
        "<button type='button' id='addnote' width='10%' style='color: white; background-color: #663399'>Add Note</button>")
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
    const thisId = $(this).attr("data-id");
    $.ajax({
        method: "DELETE",
        url: "/articles" + thisId
    })
    .then(data => {
        console.log(data);
        location.reload();
    })
});


//TODO: When clicking on #addnote notes can be added
$(document).on("click", "#addnote", function () {
    console.log("button click registered");
    $("#notes").empty();

    const thisId = $(this).attr("data-id");
    console.log("id: " + thisId)
    //TODO: id is currently undefined

    //AJAX call for the article
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId,

    })
        .then((data) => {
            console.log("data" + data);
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

//Save a note into the article document
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

