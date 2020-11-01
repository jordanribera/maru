import React from "react";

import Art from "../components/Art";
import AvTimerIcon from "@material-ui/icons/AvTimer";

const zeroPad = (num, places) => String(num).padStart(places, "0");

export const formatTime = (time, forceHours = false) => {
  const hours = Math.floor(time / 3600);
  time %= 3600;
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  let hourString = "";
  let mPad = 1;
  if (hours > 0 || forceHours) {
    hourString = `${hours}:`;
    mPad = 2;
  }
  let minuteString = `${zeroPad(minutes, mPad)}`;
  let secondString = zeroPad(seconds, 2);

  return `${hourString}${minuteString}:${secondString}`;
};

export function template(strings, ...keys) {
  return function (...values) {
    let dict = values[values.length - 1] || {};
    let result = [strings[0]];
    keys.forEach(function (key, i) {
      let value = Number.isInteger(key) ? values[key] : dict[key];
      result.push(value, strings[i + 1]);
    });
    return result.join("");
  };
}

export const COLUMNS = {
  art: {
    key: "art",
    label: "Art",
    value: (object) => <Art url={object.artwork_url} fit="height" />,
  },
  title: {
    key: "title",
    label: "Title",
    value: (object) => object.title,
  },
  artist: {
    key: "artist",
    label: "Artist",
    value: (object) => object.artist,
  },
  album: {
    key: "album",
    label: "Album",
    value: (object) => object.album,
  },
  year: {
    key: "year",
    label: "Year",
    value: (object) => object.year,
  },
  time: {
    key: "time",
    label: <AvTimerIcon />,
    value: (object) => object.length,
  },
};

export const DEFAULT_COLUMNS = [
  "art",
  "title",
  "artist",
  "album",
  "year",
  "time",
];
export const SORT_COLUMNS = ["art", "artist", "year", "album", "title", "time"];
