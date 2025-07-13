document.addEventListener("DOMContentLoaded", function () {
  const botones = document.querySelectorAll(".ramo");

  botones.forEach((btn) => {
    const prereq = btn.dataset.prereq;
    if (prereq && !document.getElementById(prereq).classList.contains("aprobado")) {
      btn.classList.add("bloqueado");
    }

    btn.addEventListener("click", () => {
      if (btn.classList.contains("bloqueado")) return;

      btn.classList.toggle("aprobado");

      const next = btn.dataset.next;
      if (next) {
        const siguiente = document.getElementById(next);
        if (siguiente && !siguiente.classList.contains("aprobado")) {
          siguiente.classList.remove("bloqueado");
        }
      }

      // Si es prerrequisito de varios, desbloquearlos todos si corresponde
      botones.forEach((otroBtn) => {
        const prereq = otroBtn.dataset.prereq;
        if (prereq && document.getElementById(prereq).classList.contains("aprobado")) {
          otroBtn.classList.remove("bloqueado");
        }
      });
    });
  });
});
