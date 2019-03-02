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

![image](https://user-images.githubusercontent.com/23425661/53673452-9ae38700-3c55-11e9-9325-b403cb335721.png)

![image](https://user-images.githubusercontent.com/23425661/53673469-c49cae00-3c55-11e9-8567-eac3f9a7a52e.png)

![image](https://user-images.githubusercontent.com/23425661/53673478-d8e0ab00-3c55-11e9-9b55-d62f683ba91f.png)

![image](https://user-images.githubusercontent.com/23425661/53673488-e5650380-3c55-11e9-8a23-a1ae0f5f8b27.png)

## Author

- **Vartan Benohanian**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
