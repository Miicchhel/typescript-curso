import { Negociacao } from "../models/negociacao.js";
import { Negociacaoes } from "../models/negociacoes.js";
export class NegociacaoController {
    constructor() {
        this._negociacoes = new Negociacaoes();
        this._inputData = document.querySelector('#data');
        this._inputQuantidade = document.querySelector('#quantidade');
        this._inputValor = document.querySelector('#valor');
    }
    adiciona() {
        const negociacao = this.criaNegociacao();
        //*! observe esse problema.
        // negociacao.data = new Date(); não deixa fazer uma nova atribuição OK
        negociacao.data.setDate(2); //* isso é possível por ser um objeto. 
        this._negociacoes.adiciona(negociacao);
        this.lipaFormulario();
        console.log(this._negociacoes.lista());
    }
    criaNegociacao() {
        const exp = /-/g;
        const date = new Date(this._inputData.value.replace(exp, ','));
        const quantidade = parseInt(this._inputQuantidade.value);
        const valor = parseFloat(this._inputValor.value);
        return new Negociacao(date, quantidade, valor);
    }
    lipaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = '';
        this._inputValor.value = '';
        this._inputData.focus();
    }
}
