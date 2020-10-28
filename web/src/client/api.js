export const apiServer = "localhost:8080"; /* TODO: read from env */
/* const apiRoot = `http://${apiServer}/api/v1`; */
const apiRoot = "/api/v1";
const artistsEndpoint = `${apiRoot}/library/artists/`;
const albumsEndpoint = `${apiRoot}/library/albums/`;
const tracksEndpoint = `${apiRoot}/library/tracks/`;

export const getArtists = (filters, callback) => {
  let filterStrings = [];
  for (const filter in filters) {
    filterStrings.push(`${filter}=${filters[filter]}`);
  }

  let artists = fetch(`${artistsEndpoint}?${filterStrings.join("&")}`)
    .then((res) => res.json())
    .then((result) => {
      callback(result.results);
    });
};

export const getAlbums = (filters, callback) => {
  let filterStrings = [];
  for (const filter in filters) {
    filterStrings.push(`${filter}=${filters[filter]}`);
  }

  let albums = fetch(`${albumsEndpoint}?${filterStrings.join("&")}`)
    .then((res) => res.json())
    .then((result) => {
      callback(result.results);
    });
};

export const getTracks = (filters, callback) => {
  let filterStrings = [];
  for (const filter in filters) {
    filterStrings.push(`${filter}=${filters[filter]}`);
  }

  let tracks = fetch(`${tracksEndpoint}?${filterStrings.join("&")}`)
    .then((res) => res.json())
    .then((result) => {
      callback(result.results);
    });
};
