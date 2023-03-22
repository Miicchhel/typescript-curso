var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { domInjector } from "../decorators/dom-injector.js";
import { inspect } from "../decorators/inspect.js";
import { logarTempoDeExecucao } from "../decorators/logar-tempo-de-execucao.js";
import { DiasDaSemana } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";
export class NegociacaoController {
    constructor() {
        this._negociacoes = new Negociacoes();
        this._negociacoesView = new NegociacoesView('#negociacoesView');
        this._mensagemView = new MensagemView('#mensagemView');
    }
    adiciona() {
        const negociacao = Negociacao.criaDe(this._inputData.value, this._inputQuantidade.value, this._inputValor.value);
        if (!this.ehDiaUtil(negociacao.data)) {
            this._mensagemView.update('Apenas negociações em dias úteis são aceitas.');
            return;
        }
        this._negociacoes.adiciona(negociacao);
        this.atualizaView();
        this.lipaFormulario();
    }
    importaDados() {
        fetch('http://localhost:8080/dados')
            .then((res) => res.json())
            .then((dados) => {
            return dados.map((dadosDeHoje) => {
                console.log('dadosDeHoje: ', dadosDeHoje);
                return new Negociacao(new Date(), dadosDeHoje.vezes, dadosDeHoje.montante);
            });
        })
            .then((negociacoesDeHoje) => {
            negociacoesDeHoje.forEach((item) => this._negociacoes.adiciona(item));
            this._negociacoesView.update(this._negociacoes);
        });
    }
    ehDiaUtil(data) {
        return data.getDay() > DiasDaSemana.DOMINGO && data.getDay() < DiasDaSemana.SABADO;
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
__decorate([
    domInjector('#data')
], NegociacaoController.prototype, "_inputData", void 0);
__decorate([
    domInjector('#quantidade')
], NegociacaoController.prototype, "_inputQuantidade", void 0);
__decorate([
    domInjector('#valor')
], NegociacaoController.prototype, "_inputValor", void 0);
__decorate([
    inspect,
    logarTempoDeExecucao(true)
], NegociacaoController.prototype, "adiciona", null);
