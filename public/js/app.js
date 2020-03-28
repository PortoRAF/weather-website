const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const messageThree = document.querySelector("#message-3");
const messageFour = document.querySelector("#message-4");
const messageFive = document.querySelector("#message-5");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  const location = search.value;
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  messageThree.textContent = "";
  messageFour.textContent = "";
  messageFive.textContent = "";

  fetch("/weather?address=" + location).then(response => {
    response.json().then(({ error, location, forecast }) => {
      if (error) {
        messageOne.textContent = error;
      } else {
        const {
          temperature,
          temperatureHigh,
          temperatureLow,
          precipProbability,
          summaryCurrently,
          summaryDaily
        } = forecast;
        messageOne.textContent = location;
        messageTwo.textContent =
          "Temperature now: " +
          temperature +
          " °F / Weather: " +
          summaryCurrently +
          ".";
        messageThree.textContent =
          "Temperature (MAX/MIN): " +
          temperatureHigh +
          "/" +
          temperatureLow +
          " °F";
        messageFour.textContent =
          "Chance of precipitation: " + precipProbability + " %";
        messageFive.textContent = "Day forecast: " + summaryDaily;
      }
    });
  });
});
