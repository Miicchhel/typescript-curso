import { Negociacao } from "./negociacao.js";

export class Negociacaoes {
  private _negociacoes: Array<Negociacao> = [];

  adiciona(negociacao: Negociacao): void {
    this._negociacoes.push(negociacao);
  }

  lista(): ReadonlyArray<Negociacao> {
    return this._negociacoes;
  }
}