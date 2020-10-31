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
