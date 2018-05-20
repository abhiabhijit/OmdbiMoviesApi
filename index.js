$(document).ready(function() {



    $(function() {
        $("#button").hide();
        $('#loader').hide();


        $("#imdbid1").hide();
        $("#imdbid2").hide();
        $('#plot2').hide();
        $('#plot0').hide();

        $(document).on('change', '#column-select', function() {


            if ($('#column-select').val() == 'id') {
                $("#imdbid1").show();
                $("#imdbid2").show();
                $('#plot2').show();
                $('#plot0').show();
                $("#q").hide();
                $("#w").hide();


                $("#submitbutton").text("Get Movie ");

            } else {
                $("#imdbid1").hide();
                $("#imdbid2").hide();
                $("#q").show();


                $("#w").show();
                $("#submitbutton").text("Search ");


            }


        });
    });

    $(document).on('click', '#submitbutton', function(e) {


        let Url = ""


        if ($('#column-select').val() == 'id') {


            let imdbid = $('#imdbid2').val()
            let year = $('#y').val()

            let title = $('#t').val()


            let movieDescription = $('#plot2').val()

            let type = $("#type").val()

            if (!imdbid && !title) {
                alert("Both Title and ImdbId Should not be Empty");
                location.reload();
            } else {

                if (imdbid) {
                    Url = Url + "&i=" + imdbid
                }

                if (title) {
                    Url = Url + "&t=" + title
                }
                if (year) {
                    Url = Url + "&y=" + year
                }
            }

            Url = Url + "&plot=" + movieDescription
            Url = Url + "&type=" + type


        } else {



            let title = $('#t').val()

            let year = $('#y').val()

            let movieDescription = $('#plot2').val()

            let type = $("#type").val()
            if (title == "") {
                alert("Title Should not be Empty");
                location.reload();
            } else {
                if (title) {
                    Url = Url + "&s=" + title
                }
                if (year) {
                    Url = Url + "&y=" + year
                }
            }
            Url = Url + "&plot=" + movieDescription
            Url = Url + "&type=" + type



        }



        (Ajaxrequest(Url))

    })

    let Ajaxrequest = (para) => {


        $.ajax({


            type: 'GET', // request type GET, POST, PUT
            async: true,
            url: 'http://www.omdbapi.com/?apikey=89bb80f' + para, // URL of getting data

            success: (data) => {
                $("#head").show();
                if (data.Response === "False") {
                    $("#inputform").hide()

                    $("#final2").append(`<h1 style="color:white">Movie Not Found</h1>`)

                    $("#final1").append(`<button  id="button" class="btn btn-primary " " >Search Another</button>`)
                    return
                }


                $("#inputform").hide()
                console.log(data)
                $("#final2").append(`<h1>Search Results...</h1>`)

                let code
                let Poster
                let website

                if (data.Search) {
                    for (l of data.Search) {
                        let getinfo = "&i=" + l.imdbid
                        if (l.Poster == "N/A") {
                            Poster = "1.png"
                        } else {
                            Poster = l.Poster
                        }
                        code = `<div class="col-md-3 " style="padding-top:20px;color: black;">
                          }
                        <div class="card">
                            <img class="img-responsive " style="height: 350px;" src="${Poster}" id="dp" />
                          </a>
                            <div class="card-content">
                                <h3 class="card-title  " id="title"> 
                                     ${l.Title}
                                  
                                </h3>
                                  <ul  style="font-weight: bold;" class="list-group list-group-flush ">
                                    <li class="list-group-item">IMDBID:${l.imdbID}</li>
                                     <li class="list-group-item">Type:${l.Type}</li>
                                     <li class="list-group-item">Year:${l.Year}</li>
                                  </ul>

                            </div>
                            
                        </div>
                    </div>`




                        $("#final").append(code)


                    }
                } else {
                    l = data
                    if (l.Poster == "N/A") {
                        Poster = "1.png"
                    } else {
                        Poster = l.Poster
                    }
                    if (l.Website == "N/A") {
                        t = l.Title.replace(/\s/g, "_")
                        website = 'https://en.wikipedia.org/wiki/' + t
                    } else {
                        website = l.Website
                    }
                    code = ` <div class="row" id="final" style="padding-top: 100px;">
                  
            <div class="row" style="color:black;">
    
<div class="col align-self-center">

                    <div class="card text-center">
  <div class="card-header">
    <h1> ${l.Title}</h1>
  </div>
  <div class="card-body">
    <h5 class="card-title" >Movie Description</h5>
    <div style="display: flex;justify-content: center;flex-wrap: wrap;">
    <img class="img-responsive " style="height: 400px;  " src="${Poster}" id="dp">

    <h5 class="card-text" style=" padding-left: 10px;width:50%; text-align: justify;"> ${l.Plot}</h5></div><br><br>

<hr style="height:1px;border:none;color:#333;background-color:#333;">
    <div style="display: flex;flex-direction: column;">
     <h5 class="card-text" style="">Genre :  ${l.Genre}</h5>

    <h5 class="card-text" style="padding-left:auto;"> Release Year : ${l.Year}</h5></div><br><br>
<hr style="height:1px;border:none;color:#333;background-color:#333;">
     <div >
     <h5 class="card-text">IMDB ID : ${l.imdbID}</h5>

    <h5 class="card-text" style="padding-left: 10px;"> IMDB RATING :${l.imdbRating}</h5></div><br><br>

 
<hr style="height:1px;border:none;color:#333;background-color:#333;">
     <div >
     <h5 class="card-text">Actors : ${l.Actors} </h5>

    <h5 class="card-text" style="padding-left: 10px;"> Director : ${l.Director} </h5>

<hr style="height:1px;border:none;color:#333;background-color:#333;">
  <h5 class="card-text" style="text-align:center">Writer(s)</h5><br>

    <h5 class="card-text" style="padding-left: 10px;text-align:justify;">  ${l.Writer} </h5></div><br><br>
    <hr style="height:1px;border:none;color:#333;background-color:#333;">
     <div >
     <h5 class="card-text">Country : ${l.Country} </h5>

    <h5 class="card-text" style="padding-left: 10px;"> Language :${l.Language}</h5>

    <h5 class="card-text">Awards : ${l.Awards}</h5>

  </div><br><br>

  <hr style="height:1px;border:none;color:#333;background-color:#333;">
     <div >
     <h5 class="card-text">Production : ${l.Production}</h5>

    <h5 class="card-text" style="padding-left: 10px;"> Collections :${l.BoxOffice}</h5></div><br><br>

     <hr style="height:1px;border:none;color:#333;background-color:#333;">
     <div >
     <h5 class="card-text">Release Date : ${l.Released}</h5>

    <h5 class="card-text" style="padding-left: 10px;"> Movie Duration :${l.Runtime}</h5>

   <h5 class="card-text" style="padding-left: 10px;"> Rated :${l.Rated}</h5></div><br><br>
<hr style="height:1px;border:none;color:#333;background-color:#333;">
     <div >
     <h3 class="card-text">Ratings </h3>
   `


                    for (k of l.Ratings) {
                        code = code + `<h5 class="card-text" style="padding-left: 10px;"> ${k.Source} :${k.Value}</h5>`
                    }
                    code = code + `</div><br><br>


    <a href="${website}" class="btn btn-primary" id="link">Visit Website</a>
  </div>
  
  </div>
</div>
</div></div>`




                    $("#final").append(code)


                }

                $("#final1").append(`<button  id="button" class="btn btn-primary " " >Search Another</button>`)




            },
            error: (data) => { // in case of error response
                $("#head").show();

                $("#inputform").hide()

                $("#final2").append(`<h1 style="color:white">Movie Not Found</h1>`)

                $("#final1").append(`<button  id="button" class="btn btn-primary " " >Search Another</button>`)
                return

            },
            beforeSend: () => {
                $("#inputform").hide()
                $("#head").hide();
                $('#loader').show();



                $('#loader').delay(1000).hide(0);


            },


            timeout: 3000 // this is in milli seconds

        });
    }


    $(document).on('click', '#button', function(e) {

        location.reload();




    });
}); // end document ready function