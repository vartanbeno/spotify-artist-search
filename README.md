# Spotify Artist Search

This is a fun little project done to experiment with Spotify's API. It lets the user search for artists and view their albums.

The project is currently hosted [here](http://vartanbeno.com:12000/).

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

Login                      | Search Suggestions
:-------------------------:|:-------------------------:
![](https://user-images.githubusercontent.com/23425661/53997084-dfb16700-4108-11e9-9bf6-d13a19d45123.png)  |  ![](https://user-images.githubusercontent.com/23425661/53998499-ef7f7a00-410d-11e9-9b78-947531795794.png)

Search Results             | Artist Albums
:-------------------------:|:-------------------------:
![](https://user-images.githubusercontent.com/23425661/53998505-f4442e00-410d-11e9-8c6b-405494313f60.png)  |  ![](https://user-images.githubusercontent.com/23425661/53998509-f73f1e80-410d-11e9-9f16-d01865a0acd6.png)

## Demo (dark theme)

Login                      | Search Suggestions
:-------------------------:|:-------------------------:
![](https://user-images.githubusercontent.com/23425661/53996606-15ede700-4107-11e9-8f9a-38246903385f.png)  |  ![](https://user-images.githubusercontent.com/23425661/53998514-fd34ff80-410d-11e9-82d3-7c2679922617.png)

Search Results             | Artist Albums
:-------------------------:|:-------------------------:
![](https://user-images.githubusercontent.com/23425661/53998521-00c88680-410e-11e9-8632-5e4df64c4742.png)  |  ![](https://user-images.githubusercontent.com/23425661/53998522-032ae080-410e-11e9-8384-75ed4f16929a.png)

## Author

- **Vartan Benohanian**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
