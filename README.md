# Maru [![Build status](https://badge.buildkite.com/93665fc87856b435a73715c4f49a9af1f59eee1836a4c66f46.svg)](https://buildkite.com/spiralpower/maru)
Maru is a host-it-yourself music streaming platform. Simply mount your music
library as a docker volume and it will index and present the metadata in a
searchable API. Your library remains untouched.

Along with this API, a web client (and soon Android) is provided for streaming
the indexed content.

## Disclaimer
This is a work in progress. API auth is not implemented yet; consider the
project only suitable for testing and local use. Library import has only been
tested against a small set of files. If you encounter problems please
[open an issue](https://github.com/jordanribera/maru/issues).

## Enticing Images
**Album View**
![Album View](http://old.spiralpower.net/files/maru/maru_album.png)

**Library View**
![Library View](http://old.spiralpower.net/files/maru/maru_library.png)


## Setup
Follow these steps to get a working API and web client:

**Clone**

Clone this repository.


**Mount Library**

You will need to modify `docker-compose.yml` to give the api container access
to your music library.

Under the `api` service find the `/media` volume and change it to `<path to
your library>:/media`. If you're just testing things out you can paste a few
albums into the existing `./media` folder.


**Docker**

Start up the containers by running `docker-compose up -d`


**Indexing**

Once the containers are up and running, run the following command to index
your library:
  - `docker-compose exec api ./manage.py setup`


## Known Issues / Coming Soon

API authentication:
* Somewhat important
* Coming soon

Library import untested:
* Currently only imports `.mp3` and `.flac` files
* Still finding new metadata edge cases that can break import

Seeking is broken:
* Fix coming soon

Playlists:
* Coming soon

Listen history:
* Coming soon
* Record per-track and per-album listen count and thumbs up/down
* Use `modified` field for recently listened
