# Event Scheduler Readme

## Project Overview

Welcome to the Event Scheduler project! This application allows users to schedule events with various details such as name, description, day, month, year, time, and duration. It provides two main views: List View and Calendar View, making it easy for users to manage their scheduled events. This README file will guide you through the project setup and usage.

## Technologies Used

- **React**: The frontend of the application is built using React, a popular JavaScript library for building user interfaces.

- **JSON Server**: The backend of the application is powered by JSON Server, a simple and lightweight MOCK API server that stores data in a JSON file.

- **Redux**: Redux is used for state management of events and user actions on events.

- **Context**: Context API is used for toggling theme across the application.

## Getting Started

Follow these steps to set up and run the Event Scheduler project on your local machine.

1. **Unzip the eventsTask.zip:**

   ```
   cd eventsTask/interface
   ```

2. **Install Dependencies:**

   ```
   yarn
   ```

3. **Start the JSON Server (Backend):**

   In a separate terminal window, navigate to the project folder and run the following command to start the JSON Server:

   ```
   json-server --watch db.json --port 8000
   ```

   This will start the backend server and serve the JSON data.

4. **Create .env in root interfcae directory:**

   .env should contain
   ```
   VITE_BACKEND_BASE_URL=http://localhost:8000
   ```

5. **Start the React App (Frontend):**

   In another terminal window, navigate to the project folder and run the following command to start the React development server:

   ```
   yarn dev --port 3000
   ```

   This will start the frontend application and open it in your default web browser.

## Usage

Once the application is running, you can use it to schedule and manage events.

### Home Page (List View)

- **Schedule Event Button:** Click this button to open the event scheduling form, where you can enter event details, including name, description, day, month, year, time, and duration. After filling in the details, click the "Save" button to schedule the event.

- **Event List:** All scheduled events will be displayed in a list view on the home page. Each event card includes options to edit and delete the event.

  - **Edit Button:** Click the "Edit" button on an event card to open the same scheduling form with pre-filled inputs. You can update the event details and click "Save" to save your changes.

  - **Delete Button:** Click the "Delete" button on an event card to delete the event from the JSON server and remove it from the list.

- **Filter Button:** Next to the view toggle button, you can find a "Filter" button that allows you to filter events by name and date. Enter the filter criteria and click "Filter" to see filtered results and you can clear filter results on clicking 'Clear' button.

### Calendar View

- **View Toggle Button:** To switch to the Calendar View, click the calendar icon next to the "Schedule Event" button on the home page.

- **Calendar:** The calendar displays the current date with scheduled events listed below it. You can change the date to view events for a specific day.

- **View Toggle Button (Calendar View):** To switch back to the List View, click the list icon (replaces the calendar icon). In this view, the event list and filter options will be shown again.
