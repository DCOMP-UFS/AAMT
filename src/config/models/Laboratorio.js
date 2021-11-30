import { Model } from "./Model.js";

/**
 * Modelo de dados Laboratorio
 */
export default class Laboratorio extends Model {
  /**
   * Dados padrão e seus valores inicias do modelo
   */
  get defaults() {
    return {
      cnpj            : null,
      nome            : "",
      endereco        : "",
      tipoLaboratorio : "",
      municipio_id    : null,
    };
  }
}