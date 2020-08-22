import { Envio } from '../models/envio.model'
import { Transaccion } from '../models/transaccion.model';
import { Promocion } from '../models/promocion';
export class Pago {
  envio: Envio;
  transaccion: Transaccion;
  promocion: Promocion;
}
