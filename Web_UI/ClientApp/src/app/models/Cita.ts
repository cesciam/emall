export class Cita{
    id: number;
    id_item: number;
    id_cliente: number;
    id_empleado: number;
    fecha: Date;
    hora_inicio: Date;
    hora_fin: Date;
    id_sucursal: number;
    items: number[];
    codigo: string;
    hora_inicio_string: string;
    hora_fin_string: string;
}