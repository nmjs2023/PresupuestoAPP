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

        //se deja botón eliminar gasto con esquinas redondeadas y se agrega icono "trash" de bootstrap icons
        btnEliminarGasto.setAttribute("class", "btn rounded-fill bi bi-trash text-danger");

        //se asigna propiedad data-idx-button con el valor de índice del arreglo para 
        //controlar posición del arreglo asociada al botón de eliminar gasto
        btnEliminarGasto.setAttribute("data-idxButton", idx);

        btnEliminarGasto.addEventListener("click", function (event) {
            // Se agrega controlador de evento a botón eliminar de la fila de detalle de gasto
            let boton = event.target;
            console.log("botón eliminar seleccionado:");
            console.log(boton);

            let numeroGasto = boton.getAttribute("data-idxButton");
            console.log(`indice (data-idxButton) de botón seleccionado: ${numeroGasto}`);

            //al hacer click en el botón eliminar de una 
            //determinada fila de gasto se envia el indice del arreglo que será eliminado
            eliminarGasto(numeroGasto);
        });


        colDescGasto.innerHTML = gastoAux.descripcionGasto;
        colValorGasto.innerHTML = gastoAux.montoGasto;

        /* btnEliminarGasto.appendChild(iconoEliminar); */
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

