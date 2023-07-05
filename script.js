// const title = "Avatar";
// const apikey = "b4cdfba7";
// const url = `https://www.omdbapi.com/?t=${title}&apikey=b4cdfba7`;
// fetch(url)
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//     movieTitle.innerHTML = `Title: <b>${title}</b>`;
//     rating.innerHTML = `IMDB Rating:<b> ${data.imdbRating}</b><br> Release Year: <b>${data.Year}</b><br>Director Name: <b>${data.Director}</b><br><br><img src="${data.Poster}" style="max-width:160px">`;
//   });
function searchBtn() {
  const input = document.getElementById("movieName").value.trim();
  const title = input !== "" ? input : "Avatar";
  const apikey = "b4cdfba7";
  const url = `https://www.omdbapi.com/?t=${title}&apikey=b4cdfba7`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "True") {
        const movies = data.Search;
        let moviesHTML = "";
        const maxMovies = 5;
        const moviePromises = [];

        if (movies && movies.length > 0) {
          for (let i = 0; i < Math.min(maxMovies, movies.length); i++) {
            const movie = movies[i];
            const detailUrl = `https://www.omdbapi.com/?t=${title}&apikey=b4cdfba7`;

            moviePromises.push(
              fetch(detailUrl)
                .then((response) => response.json())
                .then((movieData) => {
                  return {
                    title: movie.Title,
                    year: movie.Year,
                    type: movie.Type,
                    poster: movie.Poster,
                    rating: movieData.imdbRating,
                  };
                })
            );
          }

          Promise.all(moviePromises)
            .then((moviesData) => {
              moviesData.forEach((movie) => {
                moviesHTML += `
                  <div class="movie-info">
                    <img src="${movie.poster}" alt="${movie.title} Poster">
                    <h3>${movie.title}</h3>
                    <p>Release year: ${movie.year}</p>
                    <p>Type: ${movie.type}</p>
                    <p>IMDB rating: ${movie.rating}</p>
                  </div>
                `;
              });

              document.getElementById("movieTitle").innerHTML = moviesHTML;
            })
            .catch((error) => {
              console.log("Error:", error);
              document.getElementById("movieTitle").innerHTML = "An error occurred.";
            });
        } else {
          moviesHTML = "No movies found.";
          document.getElementById("movieTitle").innerHTML = moviesHTML;
        }
      } else {
        document.getElementById("movieTitle").innerHTML = "Movie not found.";
      }
    })
    .catch((error) => {
      console.log("Error:", error);
      document.getElementById("movieTitle").innerHTML = "An error occurred.";
    });
}

searchBtn(); // Call the function initially to load "Avatar" by default