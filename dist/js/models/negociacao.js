export class Negociacao {
    constructor(_data, quantidade, valor) {
        this._data = _data;
        this.quantidade = quantidade;
        this.valor = valor;
    }
    get data() {
        const data = new Date(this._data.getTime()); // data idêntica, mas em outra referência.
        return data;
    }
    get volume() {
        return this.quantidade * this.valor;
    }
}
