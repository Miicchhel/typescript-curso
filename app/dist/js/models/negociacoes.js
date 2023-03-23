export class Negociacoes {
    constructor() {
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
