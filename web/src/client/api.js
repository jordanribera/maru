import { template } from "./util";

const ENDPOINTS = {
  util: {
    root: template`${"protocol"}://${"host"}/api/v1`,
    relativeRoot: "/api/v1",
    auth: template`${"root"}/auth/`,
  },
  library: {
    info: template`${"root"}/library/info/`,
    artists: template`${"root"}/library/artists/${"filters"}`,
    albums: template`${"root"}/library/albums/${"filters"}`,
    songs: template`${"root"}/library/tracks/${"filters"}`,
  },
};

export class API {
  constructor({ protocol, host, token } = {}) {
    this.protocol = protocol || "http";
    this.host = host;
    this.token = token;
  }

  apiRoot() {
    if (this.host) {
      return ENDPOINTS.util.root({ protocol: this.protocol, host: this.host });
    }
    return ENDPOINTS.util.relativeRoot;
  }

  authHeader() {
    if (this.token) {
      return { Authorization: `Token ${this.token}` };
    }
    return {};
  }

  async getData(url = "") {
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        ...{ "Content-Type": "application/json" },
        ...this.authHeader(),
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
    return response.json();
  }

  async postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        ...{ "Content-Type": "application/json" },
        ...this.authHeader(),
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    return response.json();
  }

  filterString(filters = []) {
    if (filters.length > 0) {
      let filterStrings = [];
      filters.map((f) => {
        const [field, key] = f.split(":");
        filterStrings.push(`${field}=${key}`);
      });
      return `?${filterStrings.join("&")}`;
    }
  }

  async getToken(username, password) {
    const response = await this.postData(
      ENDPOINTS.util.auth({ root: this.apiRoot() }),
      {
        username: username,
        password: password,
      }
    );
    return response;
  }

  async getInfo() {
    const response = await this.getData(
      ENDPOINTS.library.info({
        root: this.apiRoot(),
      })
    );
    return response;
  }

  async getArtists(filters) {
    const response = await this.getData(
      ENDPOINTS.library.artists({
        root: this.apiRoot(),
        filters: this.filterString(filters),
      })
    );
    return response;
  }

  async getAlbums(filters) {
    const response = await this.getData(
      ENDPOINTS.library.albums({
        root: this.apiRoot(),
        filters: this.filterString(filters),
      })
    );
    return response;
  }

  async getSongs(filters) {
    const response = await this.getData(
      ENDPOINTS.library.songs({
        root: this.apiRoot(),
        filters: this.filterString(filters),
      })
    );
    return response;
  }
}

export default API;
