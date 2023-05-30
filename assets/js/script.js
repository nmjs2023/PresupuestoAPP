console.clear();



/*  Ejemplo estructura del arreglo de presupuesto a ser utilizado
presupuesto = {
    presupuestoInicial: 100_000,
    totalGastos: 0,  (total gastos será una función definida dentro del mismo objeto presupuesto y que será la sumatoria del arreglo detalleGastos)
    detalleGastos: [{descripcion:'Luz',montoGasto:25_000}, {descripcion:'Agua',montoGasto:20_000}]
};
 */

const presupuesto = {
    presupuestoInicial: 0,
    detalleGastos: [],
    totalGastos: function () {
        let suma = 0;
        this.detalleGastos.forEach((gasto) => {
            suma += gasto.montoGasto;
        });
        return suma;
    },
    agregarGastoArreglo: function (descripcionGasto, montoGasto) {
        this.detalleGastos.push({ descripcionGasto, montoGasto });
    }
};


const btnAceptarPresupuesto = document.getElementById("btnAceptarPresupuesto");

btnAceptarPresupuesto.addEventListener("click", function () {
    /* console.log('---> Inicio Evento Click Presupuesto'); */
    if (presupuesto.presupuestoInicial > 0) {
        /* alert(`ya hay un prsupuesto inicial, desea modificarlo??? ---CAMBIAR POR UN MODAL`); */
        console.log("IMPLEMENTAR ALERT")
    } else {
        console.log("IMPLEMENTAR ELSE")
    }
    /* let montoPresupuesto = document.getElementById('montoPresupuesto'); */
    const montoPresupuesto = document.querySelector("#montoPresupuesto");
    /* en base 10 --> notación decimal */
    presupuesto.presupuestoInicial = parseInt(montoPresupuesto.value, 10);
    renderResumenPresupuesto();

    /* console.log('--- Fin Evento Click Presupuesto'); */
});

function eliminaNodos(pTag) {
    /*  Elimina los hijos de un determinado Tag.    */

    console.log("--> eliminando nodos de detalle de tabla de gastos..." + pTag)
    var elemento = document.getElementById(pTag);
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }

};

function renderResumenPresupuesto() {
    console.log("--> Actualizando datos de resumen de presupuesto (presupuesto-total gastos = saldo)...")
    const thMontoPresupuesto = document.getElementById("thMontoPresupuesto");
    const thTotalGastos = document.getElementById("thTotalGastos");
    const thSaldoPresupuesto = document.getElementById("thSaldoPresupuesto");

    thMontoPresupuesto.innerText = presupuesto.presupuestoInicial;
    thTotalGastos.innerText = presupuesto.totalGastos();
    thSaldoPresupuesto.innerText = presupuesto.presupuestoInicial - presupuesto.totalGastos();
};

function renderDetalleGastos() {
    //sólo se renderizan las filas de detalle de gastos (no los encabezados)

    const tBodyDetalleGasto = document.querySelector("#tBodyDetalleGasto");

    //se eliminan filas de detalle de la tabla de gastos (si es que existen)
    eliminaNodos("tBodyDetalleGasto");

    console.log("--> renderizando en pantalla detalle de gastos segun contenido de presupuesto.detalleGastos[]....")
    presupuesto.detalleGastos.forEach(function (gastoAux, idx) {

        const fila = document.createElement("tr");

        //para centrar datos de fila verticalmente
        fila.setAttribute("class", "align-middle");

        const colDescGasto = document.createElement("td");
        const colValorGasto = document.createElement("td");

        //para alinear a la derecha el monto del gasto en el detalle de la tabla de gastos
        colValorGasto.setAttribute("class", "text-end");

        const colEliminaGasto = document.createElement("td");
        const btnEliminarGasto = document.createElement("button");

        btnEliminarGasto.setAttribute("type", "button");
        btnEliminarGasto.setAttribute("id", `gasto${idx}`);

        //se deja botón eliminar gasto con esquinas redondeadas y se agrega icono "trash" de bootstrap icons
        btnEliminarGasto.setAttribute("class", "btn rounded-fill btn-outline-info bi bi-trash text-danger");

        btnEliminarGasto.setAttribute("data-bs-toggle", "modal");

        //se asigna propiedad data-idx-button con el valor de índice del arreglo para 
        //controlar posición del arreglo asociada al botón de eliminar gasto
        btnEliminarGasto.setAttribute("data-bs-target", "#staticBackdrop");
        btnEliminarGasto.setAttribute("data-idxButton", idx);


        btnEliminarGasto.addEventListener("click", function (event) {
            // Se agrega controlador de evento a botón eliminar de la fila de detalle de gasto
            let boton = event.target;
            console.log("botón eliminar seleccionado:");
            console.log(boton);

            btnEliminarGasto.setAttribute("data-bs-toggle", "modal");
            btnEliminarGasto.setAttribute("data-bs-target", "#staticBackdrop");

            let numeroGasto = boton.getAttribute("data-idxButton");
            console.log(`indice (data-idxButton) de botón seleccionado: ${numeroGasto}`);

            let mensajeEliminacion = "<p>¿Está seguro de eliminar el siguiente gasto?</p>";
            mensajeEliminacion += `<p><strong>Descripción:</strong> ${gastoAux.descripcionGasto}</p>`;
            mensajeEliminacion += `<p><strong>Valor:</strong> ${gastoAux.montoGasto}</p>`;
            console.log(mensajeEliminacion);

            despliegaModal("Confirmar Eliminación", mensajeEliminacion, 1, numeroGasto);


        });


        colDescGasto.innerHTML = gastoAux.descripcionGasto;
        colValorGasto.innerHTML = gastoAux.montoGasto;

        colEliminaGasto.appendChild(btnEliminarGasto);

        fila.append(colDescGasto, colValorGasto, colEliminaGasto);
        tBodyDetalleGasto.append(fila);


    });

}

const btnAceptarGasto = document.getElementById("btnAceptarGasto");

btnAceptarGasto.addEventListener("click", function () {
    const descripcionGasto = document.querySelector("#descripcionGasto");
    console.log(`descrip del gasto capturado: ${descripcionGasto.value}`);

    const montoGasto = document.querySelector("#montoGasto");
    console.log(`monto del gasto capturado: ${montoGasto.value}`);

    presupuesto.agregarGastoArreglo(descripcionGasto.value, parseInt(montoGasto.value));


    renderResumenPresupuesto();
    renderDetalleGastos();
});


function eliminarGasto(idx) {

    console.log(`ID de elemento a eliminar: ${idx}`);
    console.log(`objeto presupuesto:`);
    console.log(presupuesto);

    //Se elimina del arreglo "presupuesto" el gasto seleccionado según indice "idx"
    presupuesto.detalleGastos.splice(idx, 1);

    //se actualiza en pantalla el resumen de presupuesto
    renderResumenPresupuesto();

    //se actualizan datos de tabla de detalle de gastos con la información existente en presupuesto.detalleGastos
    renderDetalleGastos();
}



function despliegaModal(pTitulo, pMensaje, pTipoModal, idGasto) {
    //pTitulo: Titulo de ventana modal
    //pMensaje: Mensaje al usuario (mensaje del cuerpo de la ventana modal)
    //pTipoModal: Tipo de ventana modal:
    //              1 ==> de confirmación ==> botones aceptar y cancelar
    //              2 ==> de advertencia ==>  Para mensajes en general ==> sólo botón Aceptar, pero no realizará ninguna acción
    // Para abrir el modal se debería llamar con un botón similar al siguiente (en cuanto a funcionamiento):
    // <!-- Button trigger modal -->
    //    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
    //        Launch static backdrop modal
    //    </button>
    //
    console.log("--> Abriendo ventana modal ....");


    //se eliminan los nodos dependientes de staticBackdrop  para posteriormente volver a generar el modal dinámicamente
    eliminaNodos("staticBackdrop");

    //Se construye dinámicamente el modal
    const staticBackdrop = document.querySelector('#staticBackdrop');

    const divModalDialog = document.createElement("div");
    divModalDialog.setAttribute("class", "modal-dialog");

    const divModalContent = document.createElement("div");
    divModalContent.setAttribute("class", "modal-content");

    const divModalHeader = document.createElement("div");
    divModalHeader.setAttribute("class", "modal-header");

    const h1ModalTitle = document.createElement("h1");
    h1ModalTitle.setAttribute("class", "modal-title fs-5");
    h1ModalTitle.setAttribute("id", "staticBackdropLabel");
    h1ModalTitle.innerHTML = pTipoModal;

    const buttonClose = document.createElement("button");
    buttonClose.setAttribute("type", "button");
    buttonClose.setAttribute("class", "btn-close");
    buttonClose.setAttribute("data-bs-dismiss", "modal");
    buttonClose.setAttribute("aria-label", "Close");

    divModalHeader.append(h1ModalTitle, buttonClose);

    const divModalBody = document.createElement("div");
    divModalBody.setAttribute("class", "modal-body");



    divModalBody.innerHTML = pMensaje;

    console.log("---->  así quedó el divModalBody : ");
    console.log(divModalBody);

    const divModalFooter = document.createElement("div");
    divModalFooter.setAttribute("class", "modal-footer");

    if (pTipoModal == 1) {
        const buttonCancelar = document.createElement("button");
        buttonCancelar.setAttribute("class", "btn btn-secondary");
        buttonCancelar.setAttribute("data-bs-dismiss", "modal");
        buttonCancelar.innerHTML = "Cancelar";

        const buttonAceptar = document.createElement("button");
        buttonAceptar.setAttribute("class", "btn btn-danger");
        buttonAceptar.setAttribute("id", "btnAceptarEliminacion");
        buttonAceptar.innerHTML = "Aceptar";

         // Se agrega evento controlador para "escuchar" el botón "Aceptar" dentro del modal de confirmación de eliminación
         buttonAceptar.addEventListener("click", function () {
             eliminarGasto(idGasto);
             // Cerramos el modal
             var modal = bootstrap.Modal.getInstance(staticBackdrop);
             modal.hide();
         });
        divModalFooter.append(buttonCancelar, buttonAceptar);
    } else {
        const buttonAceptar = document.createElement("button");
        buttonAceptar.setAttribute("class", "btn btn-danger");
        buttonAceptar.setAttribute("data-bs-dismiss", "modal");
        buttonAceptar.innerHTML = "Aceptar";
        divModalFooter.append(buttonAceptar);
    }



    divModalContent.append(divModalHeader, divModalBody, divModalFooter);

    divModalDialog.appendChild(divModalContent);

    staticBackdrop.appendChild(divModalDialog);

    console.log("---->  así quedó el staticBackdrop : ");
    console.log(staticBackdrop);
};

/* const staticBackdrop = document.querySelector('#staticBackdrop');

staticBackdrop.addEventListener("click", function(event) {
  const target = event.target;
  
  if (target.id === "btnAceptarEliminacion") {
    const idx = parseInt(target.getAttribute("data-idxButton"));
    console.log(`=====>>>>>> dentro del botón aceptar del modal con posarreglo ${idx}`);
  
    eliminarGasto(idx);
    // Cerrar el modal
    var modal = bootstrap.Modal.getInstance(staticBackdrop);
    modal.hide();
  }
}); */
