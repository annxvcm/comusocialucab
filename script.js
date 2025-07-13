document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  // Inicializa el estado bloqueado según los prerrequisitos
  ramos.forEach((ramo) => {
    const prereqs = ramo.dataset.prereq?.split(" ") || [];
    if (prereqs.length > 0) {
      let bloqueado = false;
      for (let id of prereqs) {
        const prereqElem = document.getElementById(id);
        if (!prereqElem || !prereqElem.classList.contains("aprobado")) {
          bloqueado = true;
          break;
        }
      }
      if (bloqueado) ramo.classList.add("bloqueado");
    }
  });

  // Manejo de clics
  ramos.forEach((ramo) => {
    ramo.addEventListener("click", () => {
      if (ramo.classList.contains("bloqueado")) return;

      ramo.classList.toggle("aprobado");

      // Revalidar todos los botones que tienen prerequisitos
      ramos.forEach((otro) => {
        const prereqs = otro.dataset.prereq?.split(" ") || [];
        if (prereqs.length > 0) {
          let desbloquear = true;
          for (let id of prereqs) {
            const prereqElem = document.getElementById(id);
            if (!prereqElem || !prereqElem.classList.contains("aprobado")) {
              desbloquear = false;
              break;
            }
          }
          if (desbloquear) {
            otro.classList.remove("bloqueado");
          } else {
            otro.classList.add("bloqueado");
            otro.classList.remove("aprobado"); // opcional: quitar aprobación si pierde el prerrequisito
          }
        }
      });
    });
  });
});
