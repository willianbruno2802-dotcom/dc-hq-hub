const comics = [
 {title:"Superman", series:"Action Comics", issue:"#1", year:"1938", era:"golden", icon:"SUPERMAN"},
 {title:"Batman", series:"Detective Comics", issue:"#27", year:"1939", era:"golden", icon:"BATMAN"},
 {title:"Justice League", series:"Justice League", issue:"#1", year:"1960", era:"silver", icon:"JUSTICE\nLEAGUE"},
 {title:"Green Lantern", series:"Green Lantern", issue:"#1", year:"1960", era:"silver", icon:"GREEN\nLANTERN"},
 {title:"Wonder Woman", series:"Wonder Woman", issue:"#1", year:"1942", era:"golden", icon:"WONDER\nWOMAN"},
 {title:"The Flash", series:"The Flash", issue:"#123", year:"1961", era:"silver", icon:"THE\nFLASH"},
 {title:"Batman", series:"The Dark Knight Returns", issue:"Vol. 1", year:"1986", era:"modern", icon:"DARK\nKNIGHT"},
 {title:"Superman", series:"All-Star Superman", issue:"Vol. 1", year:"2005", era:"modern", icon:"ALL-STAR\nSUPERMAN"}
];

const grid = document.querySelector("#grid");
const search = document.querySelector("#search");
const era = document.querySelector("#era");
const empty = document.querySelector("#empty");
const reader = document.querySelector("#reader");
const readerTitle = document.querySelector("#readerTitle");
const pageTitle = document.querySelector("#pageTitle");

function render(){
  const q = search.value.toLowerCase().trim();
  const e = era.value;
  const list = comics.filter(c =>
    (!q || `${c.title} ${c.series} ${c.issue}`.toLowerCase().includes(q)) &&
    (e === "all" || c.era === e)
  );
  grid.innerHTML = list.map((c,i)=>`
    <article class="comic" data-index="${comics.indexOf(c)}">
      <div class="cover"><span>${c.icon.replace("\n","<br>")}</span></div>
      <div class="comic-info">
        <h3>${c.series}</h3>
        <p>${c.title} · ${c.issue}</p>
        <div class="comic-meta"><span>${c.year}</span><span>♡ Favoritar</span></div>
      </div>
    </article>`).join("");
  empty.hidden = list.length !== 0;
  document.querySelectorAll(".comic").forEach(card=>card.addEventListener("click",()=>{
    const c=comics[Number(card.dataset.index)];
    readerTitle.textContent=`${c.series} ${c.issue}`;
    pageTitle.textContent=c.series;
    reader.classList.add("open");
    reader.setAttribute("aria-hidden","false");
  }));
}
search.addEventListener("input",render); era.addEventListener("change",render);
document.querySelector("#focusSearch").onclick=()=>{document.querySelector("#catalogo").scrollIntoView(); setTimeout(()=>search.focus(),500)};
document.querySelector("#closeReader").onclick=()=>{reader.classList.remove("open");reader.setAttribute("aria-hidden","true")};
document.addEventListener("keydown",e=>{if(e.key==="Escape") document.querySelector("#closeReader").click()});
render();
