# Movie Recommendation App

Welcome to the Movie Recommendation and Search App! This comprehensive README will guide you through the functionalities and components of this React application.

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Features](#features)
  - [Home Page](#home-page)
  - [Search Page](#search-page)
  - [Movie Details Page](#movie-details-page)
  - [Watchlist Page](#watchlist-page)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Movie Recommendation and Search App is a React-based web application that allows users to explore and discover movies, search for movies using various criteria, view movie details, and manage their watchlist. The app leverages React Router for navigation and Redux for state management.

## Getting Started

To run the app locally, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd moviesFrontend-Iliyas`
3. Install dependencies: `yarn`
4. Start the development server: `yarn dev --port 3000`
5. Open your browser and navigate to `http://localhost:3000`

## Features

### Home Page

The home page displays a list of recommended movies. It showcases a collection of movies that users might find interesting. If the list of movies is empty, the app will fetch movies using the `GetMovies` hook and display them.

### Search Page

The search page enables users to search for movies based on various criteria. Users can search by movie name, filter by rating, year, and genre, and sort the results by latest, oldest, alphabetical order, or rating. This page provides a versatile search functionality to help users discover movies that match their preferences.

### Movie Details Page

The movie details page presents in-depth information about a specific movie. Users can explore details such as the movie's title, description, release year, genre, and rating. Additionally, users can like the movie or add it to their watchlist directly from this page.

### Watchlist Page

The watchlist page allows users to manage the list of movies they want to watch. Movies that users have added to their watchlist can be viewed here. From this page, users can also remove movies from their watchlist.

## Usage

1. **Home Page**: Upon visiting the app, the home page will display a selection of recommended movies. If no movies are shown, it fetches movies using the `GetMovies` hook.

2. **Search Page**: Navigate to the search page using the navigation bar. Here, you can search for movies by name, filter by rating, year, and genre, and sort the results as desired.

3. **Movie Details Page**: Click on a movie from the home page or search results to view its details. You can like the movie or add it to your watchlist from this page.

4. **Watchlist Page**: Access your watchlist from the navigation bar. Here, you can view the movies you've added to your watchlist and remove them if needed.

## Contributing

I welcome contributions to enhance the Movie Recommendation and Search App. To contribute:

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature-name`
3. Make your changes and commit them with descriptive messages.
4. Push your changes to your branch: `git push origin feature-name`
5. Open a pull request, describing your changes and their purpose.

## License

This project is licensed under the [MIT License](LICENSE).

---

With the Movie Recommendation and Search App, exploring and discovering movies has never been easier. Enjoy your cinematic journey! If you have any questions or feedback, please don't hesitate to get in touch.
