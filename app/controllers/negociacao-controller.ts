import { Negociacao } from "../models/negociacao.js";
import { Negociacaoes } from "../models/negociacoes.js";

export class NegociacaoController {
  private _inputData: HTMLInputElement;
  private _inputQuantidade: HTMLInputElement;
  private _inputValor: HTMLInputElement;
  private _negociacoes = new Negociacaoes();

  constructor() {
    this._inputData = document.querySelector('#data');
    this._inputQuantidade = document.querySelector('#quantidade');
    this._inputValor = document.querySelector('#valor');
  }

  adiciona(): void {
    const negociacao = this.criaNegociacao();
    this._negociacoes.adiciona(negociacao);
    this._negociacoes.lista().pop(); //! temos que tirar esse erro. A ideia é só ser possível add.
    this.lipaFormulario();
    console.log(this._negociacoes.lista());
  }

  criaNegociacao(): Negociacao {
    const exp = /-/g;
    const date = new Date(this._inputData.value.replace(exp, ','));
    const quantidade = parseInt(this._inputQuantidade.value);
    const valor = parseFloat(this._inputValor.value);
    return new Negociacao(date, quantidade, valor);
  }

  lipaFormulario(): void {
    this._inputData.value = '';
    this._inputQuantidade.value = '';
    this._inputValor.value = '';
    this._inputData.focus();
  }
}