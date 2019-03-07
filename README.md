# Spotify Artist Search

This is a fun little project done to experiment with Spotify's API. It lets the user search for artists and view their albums.

## Getting Started

### Prerequisites

**Important:** For the application to work, you must have a valid client ID placed in [src/config/spotify.json](src/config/spotify.json):

```
{
  "clientId": "Place your client id here"
}
```

You must also make sure that `http://localhost:3000` (or wherever you're running the app from) is placed in its redirect URIs.

Here's how to set it all up:

1. Make a Spotify account.
2. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/) and click on _Log In_.
3. Once logged in, click on _Create a client ID_.
4. Name it whatever you want, describe it however you want.
5. Once created and on its page, click on the _Edit Settings_ button.
6. In the _Redirect URIs_ section, add `http://localhost:3000` (or wherever you think is appropriate).
7. Copy the client ID in [src/config/spotify.json](src/config/spotify.json).

### Docker

```
docker-compose up
```

You can also add `-d` or `--detach` to run in detached mode. The app can be viewed at [http://localhost](http://localhost).

### Running

```
npm start
```

Then head over to [http://localhost:3000](http://localhost:3000).

## Demo

Login             |  Search Suggestions
:-------------------------:|:-------------------------:
![](https://user-images.githubusercontent.com/23425661/53997084-dfb16700-4108-11e9-9bf6-d13a19d45123.png)  |  ![](https://user-images.githubusercontent.com/23425661/53997113-f5269100-4108-11e9-8f53-06ce272eb526.png)

Search Results             |  Artist Albums
:-------------------------:|:-------------------------:
![](https://user-images.githubusercontent.com/23425661/53997119-fb1c7200-4108-11e9-9a2b-658976f2eee1.png)  |  ![](https://user-images.githubusercontent.com/23425661/53997120-feaff900-4108-11e9-9664-a151c67415c8.png)

## Demo (dark theme)

Login             |  Search Suggestions
:-------------------------:|:-------------------------:
![](https://user-images.githubusercontent.com/23425661/53996606-15ede700-4107-11e9-8f9a-38246903385f.png)  |  ![](https://user-images.githubusercontent.com/23425661/53997158-1dae8b00-4109-11e9-8cd0-57efe0c8510f.png)

Search Results             |  Artist Albums
:-------------------------:|:-------------------------:
![](https://user-images.githubusercontent.com/23425661/53996631-30c05b80-4107-11e9-9c82-c995dba2020a.png)  |  ![](https://user-images.githubusercontent.com/23425661/53996643-3cac1d80-4107-11e9-91ba-3e2684c3b652.png)

## Author

- **Vartan Benohanian**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
