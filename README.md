# Mixed Greens

[🔗 Try out the app here!](https://rszeredi.github.io/mixed-greens)

## About this project
Pandora-style playlists, but using Spotify's recommendation algorithm. In this app you can select songs, artists and genres and let Spotify generate a playlist for you.

## Technologies Used:
- [Spotify API](https://developer.spotify.com/documentation/web-api/reference/#/) (via `spotify-web-api-node` and `react-spotify-web-playback`)
  - The API powers the searchbar, music recommendation and streaming
- React Context API for shared state
- React Hooks, like: `useReducer`, `useRef`, `useContext`
- A simple Express server for [Spotify Authentication](https://developer.spotify.com/documentation/general/guides/authorization/code-flow/)
- Bootstrap and React Bootstrap (eg. for the search dropdown)
- HTML, CSS, Javascript

## Demo
https://user-images.githubusercontent.com/11175618/164957713-fccc4004-7989-4b7b-aad1-2b21ca10f697.mov

## Project Status
- This app is mostly complete, but could do with some extra features, such as the ability to save the generated playlist
- Other improvements: clean up the Context to include fewer state variables (and so avoid unnecessary re-renders)
