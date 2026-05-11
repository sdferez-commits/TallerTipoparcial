class Contrato extends Empleado {
    constructor(cc, nombresyApellidos, direccion, email, telefono, sueldoBase, tipoEmpleado, tipoBonificacion, tiempo) {
        super(cc, nombresyApellidos, direccion, email, telefono, sueldoBase, tipoEmpleado, tipoBonificacion);
        this.tiempo = tiempo;
    }
}