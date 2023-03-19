import { Negociacao } from "../models/negociacao.js";
export class NegociacaoController {
    constructor() {
        this._inputData = document.querySelector('#data');
        this._inputQuantidade = document.querySelector('#quantidade');
        this._inputValor = document.querySelector('#valor');
    }
    // adiciona() {
    //   console.log(this.inputData.value);
    //   console.log(this.inputQuantidade.value);
    //   console.log(this.inputValor.value);
    // }
    adiciona() {
        const negociacao = new Negociacao(this._inputData.value, this._inputQuantidade.value, this._inputValor.value);
        console.log(negociacao);
    }
}
