function MostrarFormulario() {
    let div = document.getElementById("divAgregarEmpleado");
    div.style.display = 'block';
}

function OcultarFormulario() {
    let div = document.getElementById("divAgregarEmpleado");
    div.style.display = 'none';
    NormalizarFormulario();
    LimpiarFormulario();
}

function LimpiarFormulario() {
    document.getElementById("formEmpleado").reset();
}

function NormalizarFormulario() {
    document.getElementById("TituloAgregar").textContent = "Agregar Empleado";
    document.getElementById("botonAgregar").textContent = "Guardar Empleado";
    document.getElementById("botonAgregar").onclick = function() {
        AgregarEmpleado();
        OcultarFormulario();
    }
    document.getElementById('cc').readOnly = false;
}