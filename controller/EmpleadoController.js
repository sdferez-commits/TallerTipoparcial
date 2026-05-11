document.addEventListener("DOMContentLoaded", MostrarEmpleados);

function AgregarEmpleado(){

    let empleado = new Empleado(
        document.getElementById('cc').value,
        document.getElementById('nombresyApellidos').value,
        document.getElementById('direccion').value,
        document.getElementById('email').value,
        document.getElementById('telefono').value,
        document.getElementById('sueldoBase').value,
        document.getElementById('tipoEmpleado').value,
        document.getElementById('tipoBonificacion').value
    );

    let empleados = JSON.parse(localStorage.getItem("empleados")) || [];
    empleados.push(empleado);
    localStorage.setItem("empleados", JSON.stringify(empleados));
    MostrarEmpleados();
    alert("Empleado creado exitosamente...");

}

function BuscarEmpleado(empleadoId){
    let empleados = JSON.parse(localStorage.getItem("empleados")) || [];
    return empleados.find(emp => emp.cc === empleadoId);
}

function EliminarEmpleado(empleadocc){
    let empleados = JSON.parse(localStorage.getItem("empleados")) || [];
    empleados = empleados.filter(emp => emp.cc !== empleadocc);
    localStorage.setItem("empleados", JSON.stringify(empleados));
    MostrarEmpleados();
    alert("Empleado eliminado exitosamente...");
}

function ActualizarEmpleado(cc){
    let empleados = JSON.parse(localStorage.getItem("empleados")) || [];
    let empleadoId = cc;
    let empleadoIndex = empleados.findIndex(emp => emp.cc === empleadoId);
    if (empleadoIndex !== -1) {
        empleados[empleadoIndex] = new Empleado(
            document.getElementById('cc').value,
            document.getElementById('nombresyApellidos').value,
            document.getElementById('direccion').value,
            document.getElementById('email').value,
            document.getElementById('telefono').value,
            document.getElementById('sueldoBase').value,
            document.getElementById('tipoEmpleado').value,
            document.getElementById('tipoBonificacion').value
        );
        localStorage.setItem("empleados", JSON.stringify(empleados));
        MostrarEmpleados();
    } else {
        alert("Empleado no encontrado");
    }
}

function CargarEmpleadoEnFormulario(cc) {
    let empleado = BuscarEmpleado(cc);
    if (empleado) {
        document.getElementById('cc').value = empleado.cc;
        document.getElementById('cc').readOnly = true; 
        document.getElementById('nombresyApellidos').value = empleado.nombresyApellidos;
        document.getElementById('direccion').value = empleado.direccion;
        document.getElementById('email').value = empleado.email;    
        document.getElementById('telefono').value = empleado.telefono;
        document.getElementById('sueldoBase').value = empleado.sueldoBase;
        document.getElementById('tipoEmpleado').value = empleado.tipoEmpleado;
        document.getElementById('tipoBonificacion').value = empleado.tipoBonificacion;

        document.getElementById("TituloAgregar").textContent = "Actualizar Empleado";
        document.getElementById("botonAgregar").textContent = "Actualizar";
        document.getElementById("botonAgregar").onclick = function() {
            ActualizarEmpleado(cc);
            OcultarFormulario();
        };
    } else {
        alert("Empleado no encontrado");
    }
}

function MostrarEmpleados() {
    let empleados = JSON.parse(localStorage.getItem("empleados")) || [];
    let tbody = document.querySelector("#tablaEmpleados tbody");
    tbody.innerHTML = "";

    empleados.forEach((emp, index) => {
        let fila = `<tr>
            <td>${index + 1}</td>
            <td>${emp.cc}</td>
            <td>${emp.nombresyApellidos}</td>
            <td>${emp.direccion}</td>
            <td>${emp.email}</td>
            <td>${emp.telefono}</td>
            <td>${emp.sueldoBase}</td>
            <td>${emp.tipoEmpleado}</td>
            <td>${emp.tipoBonificacion}</td>
            <td>${SueldoTotal(emp.cc)}</td>
            <td>
                <button class="btn btn-warning btn-sm" 
                    onclick="CargarEmpleadoEnFormulario('${emp.cc}'); MostrarFormulario();">
                    Actualizar
                </button>
            </td>
            <td>
                <button class="btn btn-danger btn-sm" 
                    onclick="EliminarEmpleado('${emp.cc}')">
                    Eliminar
                </button>
            </td>
        </tr>`;
        tbody.innerHTML += fila;
    });

    CalcularNominaTotal();
}

function SueldoTotal(empleadoId) {
    let empleado = BuscarEmpleado(empleadoId);
    if (empleado) {
        let sueldoBase = parseFloat(empleado.sueldoBase);
        let bonificacion = 0;
        switch (empleado.tipoBonificacion) {
            case "A":
                bonificacion = 200000;
                break;
            case "B":
                bonificacion = 150000;
                break;
            case "C":
                bonificacion = 100000;
                break;
            case "D":
            bonificacion = 50000;
            break;
        }
        return sueldoBase + bonificacion;
    }
}

function CalcularNominaTotal() {
    let empleados = JSON.parse(localStorage.getItem("empleados")) || [];
    let nominaTotal = empleados.reduce((total, emp) => total + SueldoTotal(emp.cc), 0);
    document.getElementById("nominaTotal").textContent = nominaTotal;
}

function BuscarEmpleadoModal() {
    let cc = document.getElementById("buscarCC").value;
    let empleado = BuscarEmpleado(cc);
    let resultado = document.getElementById("resultadoBusqueda");

    if (empleado) {
        resultado.innerHTML = `
            <div class="alert alert-success">
                <p><strong>CC:</strong> ${empleado.cc}</p>
                <p><strong>Nombre:</strong> ${empleado.nombresyApellidos}</p>
                <p><strong>Dirección:</strong> ${empleado.direccion}</p>
                <p><strong>Email:</strong> ${empleado.email}</p>
                <p><strong>Teléfono:</strong> ${empleado.telefono}</p>
                <p><strong>Sueldo Base:</strong> ${empleado.sueldoBase}</p>
                <p><strong>Tipo Empleado:</strong> ${empleado.tipoEmpleado}</p>
                <p><strong>Tipo Bonificación:</strong> ${empleado.tipoBonificacion}</p>
                <p><strong>Sueldo Total:</strong> ${SueldoTotal(empleado.cc)}</p>
            </div>`;
    } else {
        resultado.innerHTML = `
            <div class="alert alert-danger">
                Empleado con CC ${cc} no encontrado.
            </div>`;
    }
}
