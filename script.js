let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
let filtro = "todas";

const lista = document.getElementById("listaTareas");
const contador = document.getElementById("contador");

document.getElementById("btnAgregar").addEventListener("click", agregarTarea);

document.querySelectorAll(".filtros button").forEach(btn => {
  btn.addEventListener("click", () => {
    filtro = btn.dataset.filtro;
    mostrarTareas();
  });
});

function agregarTarea() {
  const materia = document.getElementById("materia").value;
  const tarea = document.getElementById("tarea").value;
  const fecha = document.getElementById("fecha").value;

  if (!materia || !tarea || !fecha) {
    alert("Completa todo bro 😭");
    return;
  }

  tareas.push({ materia, tarea, fecha });
  localStorage.setItem("tareas", JSON.stringify(tareas));

  document.getElementById("materia").value = "";
  document.getElementById("tarea").value = "";
  document.getElementById("fecha").value = "";

  mostrarTareas();
}

function mostrarTareas() {
  lista.innerHTML = "";
  const hoy = new Date().toISOString().split("T")[0];

  let filtradas = tareas.filter(t => {
    if (filtro === "hoy") return t.fecha === hoy;
    if (filtro === "vencidas") return t.fecha < hoy;
    return true;
  });

  filtradas.forEach((t, i) => {
    const li = document.createElement("li");
    if (t.fecha < hoy) li.classList.add("vencida");

    li.innerHTML = `
      <span><b>${t.materia}</b><br>${t.tarea}<br>📅 ${t.fecha}</span>
      <button onclick="eliminarTarea(${i})">X</button>
    `;
    lista.appendChild(li);
  });

  contador.textContent = `Tareas: ${tareas.length}`;
}

function eliminarTarea(i) {
  tareas.splice(i, 1);
  localStorage.setItem("tareas", JSON.stringify(tareas));
  mostrarTareas();
}

mostrarTareas();
