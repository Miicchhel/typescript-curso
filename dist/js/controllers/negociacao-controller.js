import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";
export class NegociacaoController {
    constructor() {
        this._negociacoes = new Negociacoes();
        this._negociacoesView = new NegociacoesView('#negociacoesView');
        this._mensagemView = new MensagemView('#mensagemView');
        this.SABADO = 6;
        this.DOMINGO = 0;
        this._inputData = document.querySelector('#data');
        this._inputQuantidade = document.querySelector('#quantidade');
        this._inputValor = document.querySelector('#valor');
        this._negociacoesView.update(this._negociacoes);
    }
    adiciona() {
        const negociacao = this.criaNegociacao();
        //só acrescentar nos dias úteis
        if (!this.ehDiaUtil(negociacao.data)) {
            this._mensagemView.update('Apenas negociações em dias úteis são aceitas.');
            return;
        }
        this._negociacoes.adiciona(negociacao);
        this.atualizaView();
        this.lipaFormulario();
    }
    ehDiaUtil(data) {
        return data.getDay() > this.DOMINGO && data.getDay() < this.SABADO;
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
    atualizaView() {
        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociação adicionada com sucesso');
    }
}
