async function getWeather() {
  const location = document.getElementById('locationInput').value;
  const display = document.getElementById('results');

  if (!location) {
    display.innerHTML = "Please enter a city name.";
    return;
  }

  try {
    const response = await fetch(`/weather?city=${encodeURIComponent(location)}`);
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Data from server:", data);

    if (data.success === false || !data.current) {
      display.innerHTML = "Error: " + (data.error?.info || "City not found.");
    } else {
      display.innerHTML = `
        <h2>${data.location.name}, ${data.location.country}</h2>
        <p>${data.current.weather_descriptions[0]}</p>
        <p>Temperature: ${data.current.temperature}°C</p>
        <p>Humidity: ${data.current.humidity}%</p>
        <p>Wind Speed: ${data.current.wind_speed} km/h</p>
      `;
    }
  } catch (error) {
    console.error("Fetch error:", error);
    display.innerHTML = "An error occurred. Check console.";
  }
}