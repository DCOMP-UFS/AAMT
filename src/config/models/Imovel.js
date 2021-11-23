import { Model } from "./Model.js";

/**
 * Modelo de dados Imovel
 */
export default class Imovel extends Model {
  /**
   * Dados padrão e seus valores inicias do modelo
   */
  get defaults() {
    return {
      id          : null,
      lado_id     : null,
      numero      : null,
      logradouro  : "",
      numero      : null,
      sequencia   : null,
      responsavel : "",
      complemento : "",
      tipoImovel  : null,
      lat         : null,
      lng         : null,
    };
  }
}