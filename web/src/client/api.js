import { template } from "./util";

export const apiServer = "localhost:8080"; /* TODO: read from env */
/* const apiRoot = `http://${apiServer}/api/v1`; */
const apiRoot = "/api/v1";
const artistsEndpoint = `${apiRoot}/library/artists/`;
const albumsEndpoint = `${apiRoot}/library/albums/`;
const tracksEndpoint = `${apiRoot}/library/tracks/`;
const infoEndpoint = `${apiRoot}/library/info/`;

export const getArtists = (filters, callback) => {
  const filterStrings = filters.map((f) => f.replace(":", "="));

  fetch(`${artistsEndpoint}?${filterStrings.join("&")}`)
    .then((res) => res.json())
    .then((result) => {
      callback(result.results);
    });
};

export const getAlbums = (filters, callback) => {
  const filterStrings = filters.map((f) => f.replace(":", "="));

  fetch(`${albumsEndpoint}?${filterStrings.join("&")}`)
    .then((res) => res.json())
    .then((result) => {
      callback(result.results);
    });
};

export const getTracks = (filters, callback) => {
  const filterStrings = filters.map((f) => f.replace(":", "="));

  fetch(`${tracksEndpoint}?${filterStrings.join("&")}`)
    .then((res) => res.json())
    .then((result) => {
      callback(result.results);
    });
};

export const getInfo = (callback) => {
  fetch(infoEndpoint)
    .then((res) => res.json())
    .then((result) => {
      callback(result);
    });
};

const ENDPOINTS = {
  util: {
    auth: template`${"root"}/auth/`,
  },
  library: {
    artists: template`${"root"}/library/artists/${"filters"}`,
    albums: template`${"root"}/library/artists/${"filters"}`,
    songs: template`${"root"}/library/songs/${"filters"}`,
  },
};

export class API {
  constructor({ host, token }) {
    this.host = host;
    this.token = token;
  }

  authHeader() {
    if (this.token) {
      return { 'Authorization': 'Token {}'.format(this.token) }
    }
    return {}
  }

  async postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        ...{ 'Content-Type': 'application/json' },
        ...this.authHeader(),
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
    });
    return response.json();
  }

  getToken(username, password) {
    this.postData()
  }

  getSongs(filters, callback) {
    let filterStrings = [];
    for (const filter in filters) {
      filterStrings.push(`${filters[filter].key}=${filters[filter].value}`);
    }
    fetch(
      ENDPOINTS.library.songs({
        root: this.apiRoot(),
        filters: filterStrings.join("&"),
      })
    )
      .then((res) => res.json())
      .then((result) => {
        callback(result.results);
      });
  }
}
