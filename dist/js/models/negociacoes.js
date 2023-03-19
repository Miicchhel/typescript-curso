import { Negociacao } from "./negociacao.js";
export class Negociacaoes {
    constructor() {
        this._negociacoes = [];
    }
    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
    }
    lista() {
        return this._negociacoes;
    }
}
const negociacoes = new Negociacaoes();
negociacoes.adiciona(new Negociacao(new Date(), 3, 3));
negociacoes.lista().forEach(element => { });
