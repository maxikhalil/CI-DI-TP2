filtro.addEventListener("change", function () {
    let prod_elegido = document.querySelector("option:checked");
    let pedidos = document.querySelectorAll("#contenido .card");
    pedidos.forEach(card => {
        card.classList.add("oculto");
    });
    if (prod_elegido.value == "todas") {
        pedidos.forEach(card => {
            card.classList.remove("oculto");
        });
    } else if (prod_elegido.value == "cd") {
        document.querySelectorAll("#contenido .cd").forEach(card => {
            card.classList.remove("oculto");
        });
    } else if (prod_elegido.value == "vinilo") {
        document.querySelectorAll("#contenido .vinilo").forEach(card => {
            card.classList.remove("oculto");
        });
    } else if (prod_elegido.value == "merch") {
        document.querySelectorAll("#contenido .merch").forEach(card => {
            card.classList.remove("oculto");
        });
    }
});

document.querySelector("#ingresar form").addEventListener("submit", function name(e) {
    e.preventDefault();
    let nombre_ingresado = producto.value;
    let artista_ingresado = artista.value;
    let filtro_ingresado = document.querySelector('#productos option:checked').value;
    const nuevo_div = document.createElement("div");
    nuevo_div.classList.add("card", "m-2", "text-start", "d-inline-block", filtro_ingresado);
    nuevo_div.innerHTML = `
        <div class="card-header text-end">
            <img src="imagenes/pencil-fill.svg" alt="modificar" class="me-3 text-light" data-accion="modificar" data-bs-toggle="modal" data-bs-target="#modificar">
            <img src="imagenes/trash3.svg" alt="eliminar" data-accion="eliminar">
        </div>
        <img class="card-img-top" src="./imagenes/${filtro_ingresado}.jpg" alt="Card image cap">
        <div class="card-body">
        
        <h3 class="card-title text-uppercase"> <span class="">${filtro_ingresado}</span></h3> 
            <p class="card-text"><strong>Producto:</strong><span>${nombre_ingresado}</span></p>
            

            <p class="card-text"><strong>Banda/Artista:</strong> <span>${artista_ingresado}</span></p> 
        </div>
    `;
    document.getElementById("contenido").prepend(nuevo_div);
    document.querySelector("#ingresar form").reset();

    let cards_actuales = document.getElementById('contenido').innerHTML;
    localStorage.setItem("pedidos", cards_actuales);

});


document.getElementById("contenido").addEventListener("click", function (e) {
    if (e.target.dataset.accion == "eliminar") {
        let rta = confirm("¿Estás seguro que querés eliminar este pedido?");
        if (rta) {
            e.target.parentElement.parentElement.remove();

            let cards_actuales = document.getElementById('contenido').innerHTML;
            localStorage.setItem("pedidos", cards_actuales);
        }
    }
});


document.getElementById("eliminar_todo").addEventListener("click", function () {
    let rta = confirm("¿Estás seguro que querés eliminar todos los pedidos?");
    if (rta) {
        document.getElementById('contenido').innerHTML = "";

        localStorage.clear();
    }
});


document.getElementById("contenido").addEventListener("click", function (e) {
    if (e.target.dataset.accion == "modificar") {
        let card = e.target.parentElement.parentElement;
        let prod_actual;
        if (card.classList.contains("cd")) {
            prod_actual = "cd";
        } else if (card.classList.contains("vinilo")) {
            prod_actual = "vinilo";
        } else if (card.classList.contains("merch")) {
            prod_actual = "merchandising";
        }
        card.dataset.modvariable = prod_actual;
        let nombre_actual = document.querySelector('[data-modvariable] p:first-of-type span').textContent;
        let artista_actual = document.querySelector('[data-modvariable] p:nth-of-type(2) span ').textContent;
        nombre_mod.value = nombre_actual;
        artista_mod.value = artista_actual;
        document.querySelectorAll('#productos_mod option').forEach(option => {
            option.removeAttribute("selected");
        });
        document.querySelector(`#productos_mod option[value="${prod_actual}"]`).setAttribute("selected", "selected");
    }
});


document.getElementById("cancelar_mod").addEventListener("click", function () {
    let modificando = document.querySelector('[data-modvariable]');
    modificando.removeAttribute('data-modvariable');
});


document.querySelector("#modificar form").addEventListener("submit", function name(e) {
    e.preventDefault();
    let modificando = document.querySelector('[data-modvariable]');
    let nombre_modificado = nombre_mod.value;
    let artista_modificado = artista_mod.value;

    let p_nombre = document.querySelector('[data-modvariable] p:first-of-type span');
    let p_artista = document.querySelector('[data-modvariable] p:nth-of-type(2) span');
    p_nombre.textContent = nombre_modificado;
    p_artista.textContent = artista_modificado;

    modificando.removeAttribute('data-modvariable');

    console.log("Clases después de modificar:", modificando.classList);

    let cards_actuales = document.getElementById('contenido').innerHTML;
    localStorage.setItem("pedidos", cards_actuales);
});



document.getElementById("info_footer").addEventListener("hide.bs.collapse", function () {

    document.getElementById("Expandir").textContent = "Expandir";
});

document.getElementById("info_footer").addEventListener("show.bs.collapse", function () {

    document.getElementById("Expandir").textContent = "Ocultar";
});


document.addEventListener("DOMContentLoaded", function () {

    let guardados = localStorage.getItem("pedidos");

    if (guardados != null) {
        document.getElementById('contenido').innerHTML = guardados;
    }
});