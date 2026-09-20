const comics = [
  {
    title: "Superman",
    series: "Action Comics",
    issue: "#1",
    year: "1938",
    era: "golden",
    icon: "SUPERMAN"
  },
  {
    title: "Batman",
    series: "Detective Comics",
    issue: "#27",
    year: "1939",
    era: "golden",
    icon: "BATMAN"
  },
  {
    title: "Justice League",
    series: "Justice League",
    issue: "#1",
    year: "1960",
    era: "silver",
    icon: "JUSTICE<br>LEAGUE"
  },
  {
    title: "Green Lantern",
    series: "Green Lantern",
    issue: "#1",
    year: "1960",
    era: "silver",
    icon: "GREEN<br>LANTERN"
  },
  {
    title: "Wonder Woman",
    series: "Wonder Woman",
    issue: "#1",
    year: "1942",
    era: "golden",
    icon: "WONDER<br>WOMAN"
  },
  {
    title: "The Flash",
    series: "The Flash",
    issue: "#123",
    year: "1961",
    era: "silver",
    icon: "THE<br>FLASH"
  },
  {
    title: "Batman",
    series: "The Dark Knight Returns",
    issue: "Vol. 1",
    year: "1986",
    era: "modern",
    icon: "DARK<br>KNIGHT"
  },
  {
    title: "Superman",
    series: "All-Star Superman",
    issue: "Vol. 1",
    year: "2005",
    era: "modern",
    icon: "ALL-STAR<br>SUPERMAN"
  }
];

const grid = document.getElementById("grid");
const search = document.getElementById("search");
const era = document.getElementById("era");
const empty = document.getElementById("empty");

const reader = document.getElementById("reader");
const readerTitle = document.getElementById("readerTitle");
const pageTitle = document.getElementById("pageTitle");

function renderComics() {
  const query = search.value.toLowerCase().trim();
  const selectedEra = era.value;

  const filtered = comics.filter(comic => {
    const text = `
      ${comic.title}
      ${comic.series}
      ${comic.issue}
      ${comic.year}
    `.toLowerCase();

    const matchesSearch = !query || text.includes(query);
    const matchesEra =
      selectedEra === "all" || comic.era === selectedEra;

    return matchesSearch && matchesEra;
  });

  grid.innerHTML = "";
grid.innerHTML = "";

grid.innerHTML = "<h2>TESTE — O GRID ESTÁ FUNCIONANDO</h2>";

filtered.forEach(comic => {
  filtered.forEach(comic => {
    const card = document.createElement("article");
    card.className = "comic";

    card.innerHTML = `
      <div class="cover">
        <span>${comic.icon}</span>
      </div>

      <div class="comic-info">
        <h3>${comic.series}</h3>

        <p>
          ${comic.title} · ${comic.issue}
        </p>

        <div class="comic-meta">
          <span>${comic.year}</span>
          <span>♡ Favoritar</span>
        </div>
      </div>
    `;

    card.addEventListener("click", () => {
      openReader(comic);
    });

    grid.appendChild(card);
  });

  empty.hidden = filtered.length !== 0;
}

function openReader(comic) {
  readerTitle.textContent =
    `${comic.series} ${comic.issue}`;

  pageTitle.textContent =
    comic.series;

  reader.classList.add("open");

  reader.setAttribute(
    "aria-hidden",
    "false"
  );
}

function closeReader() {
  reader.classList.remove("open");

  reader.setAttribute(
    "aria-hidden",
    "true"
  );
}

search.addEventListener(
  "input",
  renderComics
);

era.addEventListener(
  "change",
  renderComics
);

document
  .getElementById("focusSearch")
  .addEventListener("click", () => {

    document
      .getElementById("catalogo")
      .scrollIntoView();

    setTimeout(() => {
      search.focus();
    }, 500);
  });

document
  .getElementById("closeReader")
  .addEventListener(
    "click",
    closeReader
  );

document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {
      closeReader();
    }

  }
);

renderComics();
console.log("DC HQ HUB FUNCIONANDO");
