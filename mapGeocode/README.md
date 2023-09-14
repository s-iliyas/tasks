# Location App README

## Overview

This Location App is a web application built using React that allows users to interact with a map and handle location-related tasks. It leverages the React Leaflet library for mapping and integrates with the Geolocation API and Google's Geocoding API for geolocation tasks. This README provides an overview of the app's functionality and instructions for setting it up and using it.

## Features

1. **Dynamic Loading**: The app checks the accuracy of the Geolocation API. If the accuracy is less than 20 meters, it automatically loads a map showing the user's location; otherwise, it opens an Ant Design (Antd) form to enter a manual address.

2. **Geolocation**: When using the map, users can see their current location marked on the map. They can also drag the map to update their location and see a new marker at the dragged position.

3. **Reverse Geocoding**: When users enter a manual address in the form, the app sends a request to a backend server (API endpoint `/coords?address=...`). The backend server then calls the Google Reverse Geocoding API to obtain latitude and longitude coordinates for the provided address. The result is displayed on the map as a user location orange marker when clicked.

4. **Forward Geocoding**: Users can also interact with the map by dragging or sliding on it to drop a black marker. When a marker is dropped, the app sends a request to a backend server (API endpoint `/address?latitude=...&longitude=...`), which, in turn, calls the Google Geocoding API to retrieve the address information for the selected location. The address details are then displayed to the user if clicked on marker.

## Prerequisites

Before using the Location App, make sure you have the following prerequisites installed:

- Node.js: You need Node.js to run the application. You can download it from [https://nodejs.org/](https://nodejs.org/).

## Installation

Follow these steps to set up and run the React Location App:

1. Clone the repository:

   ```bash
   git clone [repository-url]
   ```


2. Create a `.env` file in the services folder and add your Google API Key:

   ```env
   API_KEY=YOUR_GOOGLE_API_KEY

   NODE_PORT=8000
   ```

3. Navigate to the services directory and run server:

   ```bash
   cd mapGeocode/services
   yarn
   yarn run dev
   ```

4. Navigate to the interface directory and run server:

   ```bash
   cd mapGeocode/interface
   yarn
   yarn dev --port 3000
   ```

6. Open your web browser and go to [http://localhost:3000](http://localhost:3000) to access the app, for server access [http://localhost:8000](http://localhost:8000).
