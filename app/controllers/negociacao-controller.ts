import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";

export class NegociacaoController {
  private _inputData: HTMLInputElement;
  private _inputQuantidade: HTMLInputElement;
  private _inputValor: HTMLInputElement;
  private _negociacoes = new Negociacoes();
  private _negociacoesView = new NegociacoesView('#negociacoesView');
  private _mensagemView = new MensagemView('#mensagemView');

  constructor() {
    this._inputData = document.querySelector('#data');
    this._inputQuantidade = document.querySelector('#quantidade');
    this._inputValor = document.querySelector('#valor');
    this._negociacoesView.update(this._negociacoes);
  }

  adiciona(): void {
    const negociacao = this.criaNegociacao();
    this._negociacoes.adiciona(negociacao);
    this._negociacoesView.update(this._negociacoes);
    this._mensagemView.update('Negociação adicionada com sucesso');
    this.lipaFormulario();
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