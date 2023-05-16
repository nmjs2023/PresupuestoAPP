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
    presupuesto.presupuestoInicial = parseInt(montoPresupuesto.value,10);  //en base 10 --> notación decimal
    renderResumenPresupuesto();
    
    /* console.log('--- Fin Evento Click Presupuesto'); */
});


function renderResumenPresupuesto ()  {
    thMontoPresupuesto.innerText = presupuesto.presupuestoInicial;
    thTotalGastos.innerText = presupuesto.totalGastos();
    thSaldoPresupuesto.innerText = presupuesto.presupuestoInicial - presupuesto.totalGastos();
}

btnAceptarGasto = document.getElementById('btnAceptarGasto');
btnAceptarGasto.addEventListener('click', function () {
    const descripcionGasto = document.querySelector('#descripcionGasto');
    console.log(`descrip del gasto capturado: ${descripcionGasto.value}`);

    const montoGasto = document.querySelector('#montoGasto');
    console.log(`monto del gasto capturado: ${montoGasto.value}`);

    agregarGastoArreglo(descripcionGasto.value, parseInt(montoGasto.value));
    renderResumenPresupuesto();
});


function agregarGastoArreglo(descripcionGasto, montoGasto) {
    presupuesto.detalleGastos.push({descripcionGasto, montoGasto});
    
    
    //Se actualiza el valor total de gastos (sumatoria de detalle de gastos ingresados)
    //presupuesto.totalGastos = sumarDetalleGatos();
    //console.log(presupuesto);
};

