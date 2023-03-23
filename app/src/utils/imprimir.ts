import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";

export function imprimir(...params: any[]) {
  params.forEach((item) => {
    console.log(item.paraTexto());
  });
}