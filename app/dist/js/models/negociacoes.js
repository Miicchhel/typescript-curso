import { Imprimivel } from "../utils/imprimivel.js";
export class Negociacoes extends Imprimivel {
    constructor() {
        super(...arguments);
        this._negociacoes = [];
    }
    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
    }
    lista() {
        return this._negociacoes;
    }
    paraTexto() {
        return JSON.stringify(this._negociacoes, null, 2);
    }
}
