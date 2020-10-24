const apiRoot = 'http://localhost:8080/api/v1';

export const getTracks = (filters, callback) => {
  let filterStrings = [];
  for (const filter in filters) {
    filterStrings.push(`${filter}=${filters[filter]}`)
  }

  let tracks = fetch(`${apiRoot}/library/tracks/?${filterStrings.join("&")}`)
    .then(res => res.json())
    .then(
      (result) => {
        callback(result.results);
      },
    );
};
