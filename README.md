# Spotify Clone

## Overview
This project is a simple yet functional Spotify clone that allows users to browse and play songs. It features an intuitive user interface with a left sidebar for navigation and a right section for displaying available albums along with a fully interactive music player. The project is designed to mimic key aspects of Spotify's experience while remaining lightweight and easy to use.

## Technologies Used
- **HTML**: Provides the structure and layout of the webpage.
- **CSS**: Used for styling and enhancing the UI with an external stylesheet.
- **JavaScript**: Handles song fetching, playback control, user interactions, and dynamic updates.

## Features
### 🎵 **Navigation Sidebar**
- Includes essential options such as **Home** and **Search**.
- A **Library** section to display the available songs.
- Footer section with links to legal pages and additional information.

### 🎶 **Music Player**
- Displays real-time song information, including title and duration.
- **Playback Controls**: Play, pause, previous, and next functionalities.
- **Seek Bar**: Allows users to track and control playback progress.
- **Volume Control**: Users can adjust volume levels and mute audio when needed.

### 📀 **Dynamic Playlist Fetching**
- Fetches songs dynamically from local folders.
- Displays albums and tracks using structured **JSON data**.
- Updates UI in real time with relevant song and album details.

## 🚀 How to Run
1. **Clone or download** the repository.
2. Open `index.html` in your preferred browser.
3. Ensure that a **local server is running** (e.g., using Live Server in VS Code for seamless playback).
4. Place your songs in the `songs/` directory along with the required `info.json` file and `cover.jpg` for album artwork.

## 🛠 Issues and Fixes
### **Current Issues**
- The **previous** and **next** buttons are not updating the song index correctly.
- The index value is consistently returning `-1`, causing playback issues.

### **Possible Fix**
- Debug the index calculation with the following code snippet:
  ```javascript
  let index = songs.indexOf(decodeURIComponent(currentsongs.src.split("/").slice(-1)[0]));
  ```
- Ensure `decodeURIComponent()` is properly used to match URL encoding.
- Log the `songs` array and `currentsongs.src` to verify correct indexing.

## 🔮 Future Enhancements
- Improve **UI responsiveness** for mobile and tablet devices.
- Implement **custom playlist creation** for personalized music selection.
- Integrate **real-time song lyrics display** for an enhanced user experience.
- Add **dark mode toggle** for user preference customization.
- Support for **streaming from external APIs** to expand music selection.

---
Contributions and feedback are welcome! Feel free to report issues or suggest new features. 🎧✨
