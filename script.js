const apiKey = "60e9365ae3e797e20efd2df7cbd2939e"; // ← API Key real

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},CO&appid=${apiKey}&units=metric&lang=es`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== 200) {
      alert("Ciudad no encontrada");
      return;
    }

    document.getElementById("cityName").textContent = `🌍 Ubicación: ${data.name}, ${data.sys.country}`;
    document.getElementById("temperature").textContent = `🌡️ Temperatura: ${data.main.temp}°C`;
    document.getElementById("description").textContent = `☁️ Clima: ${data.weather[0].description}`;
    document.getElementById("weatherResult").classList.remove("d-none");

  } catch (error) {
    alert("Error al obtener el clima.");
    console.error(error);
  }
}

async function loadGallery() {
  const gallery = document.getElementById("gallery");

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/photos?_limit=15");
    const photos = await res.json();

    photos.forEach(photo => {
      const col = document.createElement("div");
      col.className = "col";

      col.innerHTML = `
        <div class="card h-100 shadow-sm">
          <img src="${photo.url}" class="card-img-top" alt="${photo.title}">
          <div class="card-body">
            <h6 class="card-title">${photo.title}</h6>
          </div>
        </div>
      `;

      gallery.appendChild(col);
    });
  } catch (err) {
    console.error("Error al cargar la galería", err);
  }
}

async function getPokemon() {
  const name = document.getElementById("pokemonInput").value.trim().toLowerCase();
  if (!name) return;

  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    document.getElementById("pokemonName").textContent = `🔎 ${data.name.toUpperCase()}`;
    document.getElementById("pokemonImage").src = data.sprites.front_default;

    const types = data.types.map(t => t.type.name).join(", ");
    const abilities = data.abilities.map(a => a.ability.name).join(", ");

    document.getElementById("pokemonTypes").textContent = `🧪 Tipo(s): ${types}`;
    document.getElementById("pokemonAbilities").textContent = `✨ Habilidades: ${abilities}`;

    document.getElementById("pokemonCard").classList.remove("d-none");
  } catch (err) {
    alert("Pokémon no encontrado.");
    console.error(err);
  }
}

window.onload = loadGallery;
