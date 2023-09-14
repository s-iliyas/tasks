# Movie API Documentation

Welcome to the Movie API documentation. This API provides endpoints to manage movie data, including adding, updating, searching, and deleting movies. It also offers functionality to retrieve a list of movies, genres, and specific movie details by ID. Below, you'll find detailed information about the available endpoints and how to use them.

## Table of Contents

- [Getting Started](#getting-started)
- [Endpoints](#endpoints)
  - [Add a Movie](#add-a-movie)
  - [Search Movies](#search-movies)
  - [Get Genres](#get-genres)
  - [Get Movies](#get-movies)
  - [Update a Movie](#update-a-movie)
  - [Get Movie by ID](#get-movie-by-id)
  - [Delete a Movie](#delete-a-movie)

## Getting Started

To get started, make sure you have Node.js and npm (Node Package Manager) installed on your machine. You can download them from the official [Node.js website](https://nodejs.org/). Additionally, you'll need to have a MongoDB database set up and running.

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install the required dependencies.
4. Create a `.env` file in the project root and add your MongoDB connection string as `MONGO_URI`.

Example `.env` file:

```
DATABASE_URL=mongodb+srv://<USERNAME>:<PASSWORD>@agencydb.hdaek8r.mongodb.net/<COLLETION NAME>?retryWrites=true&w=majority"

NODE_PORT=8000
```

5. Start the server by running `npm start`.
6. The API should now be accessible at `http://localhost:8000`.

## Endpoints

### Add a Movie

Add a new movie to the database.

- **Endpoint**: `POST /api/movies/add`
- **Request Body**:

  - `title` (string, required): The title of the movie.
  - `genre_ids` (array, required): The genre of the movie.
  - `overview` (string, required): The plot summary of the movie.
  - `backdrop_path` (string, required): The image url for background of the movie.
  - `poster_path` (string, required): The poster url of the movie.
  - `release_date` (string, required): The realease date of the movie.
  - `vote_average` (float, required): The rating of the movie.
  - `vote_count` (integer, required): The totla likes of the movie.
  - `adult` (boolean, required): The check whether the movie is for adults only.

- **Example**:

  ```json
  {
    "adult": true,
    "vote_count": 35,
    "genre_ids": [18],
    "vote_average": 9.4,
    "title": "Solo Leveling",
    "overview": "Solo Leveling, also alternatively translated as Only I Level Up (Korean: 나 혼자만 레벨업; RR: Na Honjaman Rebeleop), is a South Korean web novel written by Chugong. It was serialized in Kakao's digital comic and fiction platform KakaoPage beginning on July 25, 2016, and was later published in full by D&C Media under their Papyrus label on November 4, 2016. The novel has been licensed in English by Yen Press.[1]",
    "backdrop_path": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP51Q201FC43K5Mdqegj8iNbwWdDNgqKh59A&usqp=CAU",
    "poster_path": "https://upload.wikimedia.org/wikipedia/en/thumb/9/99/Solo_Leveling_Webtoon.png/220px-Solo_Leveling_Webtoon.png",
    "release_date": "2023-01-30"
  }
  ```

- **Response**:
  - `id` (string): The ID of the newly added movie.
  - `message` (string): A success message.

### Search Movies

Search for movies based on title and genre.

- **Endpoint**: `POST /api/movies/search`
- **Request Body**:

  - `movieGenre` (string, optional): The poster url of the movie.
  - `movieRating` (string, optional): The realease date of the movie.
  - `movieYear` (string, optional): The rating of the movie.
  - `movieSort` (string, optional): The totla likes of the movie.
  - `movieName` (string, optional): The check whether the movie is for adults only.

- **Example**:

  ```json
  {
    "movieYear": "2020-2023"
  }
  ```

- **Response**:
  - An array of movies matching the search criteria.

### Get Genres

Get a list of available movie genres.

- **Endpoint**: `GET /api/movies/genres/get`

- **Response**:
  - An array of available genres.

### Get Movies

Get a list of movies.

- **Endpoint**: `GET /api/movies/get/:count?`
- **Parameters**:

  - `count` (number, optional): The number of movies to retrieve.

- **Response**:
  - An array of movies.

### Update a Movie

Update movie information.

- **Endpoint**: `POST /api/movies/update/:id`
- **Parameters**:
  - `id` (string): The ID of the movie to update.
- **Request Body**:

  - Fields to update (same as those in the "Add a Movie" section).

- **Response**:
  - `message` (string): A success message.

### Get Movie by ID

Get information about a specific movie.

- **Endpoint**: `GET /api/movies/id/get/:id`
- **Parameters**:

  - `id` (string): The ID of the movie.

- **Response**:
  - Information about the requested movie.

### Delete a Movie

Delete a movie from the database.

- **Endpoint**: `DELETE /api/movies/delete/:id`
- **Parameters**:

  - `id` (string): The ID of the movie to delete.

- **Response**:
  - `message` (string): A success message.

---

Feel free to refer to this documentation whenever you need to interact with the Movie API. If you encounter any issues or have questions, don't hesitate to reach out to me.

Happy coding!
