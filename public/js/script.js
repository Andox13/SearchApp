document.addEventListener("DOMContentLoaded", function() {
    const searchForm = document.querySelector("form");

    if (searchForm) {
        searchForm.addEventListener("submit", function(event) {
            // Aquí puedes agregar cualquier lógica que quieras ejecutar antes de enviar el formulario
            alert("Formulario enviado!");
        });
    }
});
