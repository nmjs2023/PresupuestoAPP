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
    //totalGastos: 0,
    detalleGastos: [],
    totalGastos: function () {
        let suma = 0;
        presupuesto.detalleGastos.forEach(gasto => {
            suma += gasto.montoGasto;
            //suma += gasto[1];
        });
        return suma;
    }
};



console.log(presupuesto);


btnAceptarPresupuesto = document.getElementById('btnAceptarPresupuesto');

btnAceptarPresupuesto.addEventListener('click', function () {
    /* console.log('---> Inicio Evento Click Presupuesto'); */
    if (presupuesto.presupuestoInicial > 0) {
        /* alert(`ya hay un prsupuesto inicial, desea modificarlo??? ---CAMBIAR POR UN MODAL`); */
        console.log("IMPLEMENTAR ALERT")
    } else {
        console.log("IMPLEMENTAR ELSE")
    }
    /* let montoPresupuesto = document.getElementById('montoPresupuesto'); */
    const montoPresupuesto = document.querySelector('#montoPresupuesto');
    /* en base 10 --> notación decimal */
    presupuesto.presupuestoInicial = parseInt(montoPresupuesto.value,10);  
    renderResumenPresupuesto();
    
    /* console.log('--- Fin Evento Click Presupuesto'); */
});

function eliminaNodos(pTag) {
    /*  Elimina los hijos de un determinado Tag.    */
    
    console.log("dentro de eliminaNodos -->" + pTag)
    var elemento = document.getElementById(pTag);
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }

};

function renderResumenPresupuesto ()  {
    thMontoPresupuesto.innerText = presupuesto.presupuestoInicial;
    thTotalGastos.innerText = presupuesto.totalGastos();
    thSaldoPresupuesto.innerText = presupuesto.presupuestoInicial - presupuesto.totalGastos();
};

function renderDetalleGastos() {
    //sólo se renderizan las filas de detalle de gastos (no los encabezados)

    //primero se eliminan filas de detalle de la tabla de gastos (si es que existen)
    eliminaNodos('tBodyDetalleGasto');
    const tBodyDetalleGasto = document.querySelector('#tBodyDetalleGasto');

    let cuenta =0;
    presupuesto.detalleGastos.forEach(function (gastoAux) {
        const fila = document.createElement('tr');
        const colDescGasto = document.createElement('td');
        const colValorGasto = document.createElement('td');
        const colEliminaGasto = document.createElement('td');
        const btnEliminarGasto = document.createElement('button');
        
        
        btnEliminarGasto.setAttribute('id', `btnEliminar${cuenta}`);
        btnEliminarGasto.setAttribute('class', 'btn rounded-fill');

        

        const iconoEliminar = document.createElement('i');
        iconoEliminar.setAttribute('class', 'bi bi-trash')



        colDescGasto.innerHTML = gastoAux.descripcionGasto;
        colValorGasto.innerHTML = gastoAux.montoGasto;

        btnEliminarGasto.appendChild(iconoEliminar);
        colEliminaGasto.appendChild(btnEliminarGasto);

        fila.append(colDescGasto, colValorGasto, colEliminaGasto);
        tBodyDetalleGasto.append(fila);
    })    
    
}

btnAceptarGasto = document.getElementById('btnAceptarGasto');

btnAceptarGasto.addEventListener('click', function () {
    const descripcionGasto = document.querySelector('#descripcionGasto');
    console.log(`descrip del gasto capturado: ${descripcionGasto.value}`);

    const montoGasto = document.querySelector('#montoGasto');
    console.log(`monto del gasto capturado: ${montoGasto.value}`);

   
    agregarGastoArreglo(descripcionGasto.value, parseInt(montoGasto.value));


    renderResumenPresupuesto();
    renderDetalleGastos();
});


function agregarGastoArreglo(descripcionGasto, montoGasto) {
    presupuesto.detalleGastos.push({descripcionGasto, montoGasto});
    
    
    //Se actualiza el valor total de gastos (sumatoria de detalle de gastos ingresados)
    //presupuesto.totalGastos = sumarDetalleGatos();
    //console.log(presupuesto);
};

