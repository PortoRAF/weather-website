const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/ba6767b45e917880e905658425f510d4/" +
    latitude +
    "," +
    longitude;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services.", undefined);
    } else if (body.error) {
      callback("Unable to find location.", undefined);
    } else {
      const {
        summary: summaryDaily,
        temperatureHigh,
        temperatureLow
      } = body.daily.data[0];
      const {
        summary: summaryCurrently,
        temperature,
        precipProbability
      } = body.currently;
      callback(undefined, {
        temperature,
        temperatureHigh,
        temperatureLow,
        precipProbability,
        summaryCurrently,
        summaryDaily
      });
    }
  });
};

module.exports = forecast;
