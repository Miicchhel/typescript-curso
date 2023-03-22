import { domInjector } from "../decorators/dom-injector.js";
import { inspect } from "../decorators/inspect.js";
import { logarTempoDeExecucao } from "../decorators/logar-tempo-de-execucao.js";
import { DiasDaSemana } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";

export class NegociacaoController {
  @domInjector('#data')
  private _inputData: HTMLInputElement;
  
  @domInjector('#quantidade')
  private _inputQuantidade: HTMLInputElement;
  
  @domInjector('#valor')
  private _inputValor: HTMLInputElement;
  private _negociacoes = new Negociacoes();
  private _negociacoesView = new NegociacoesView('#negociacoesView');
  private _mensagemView = new MensagemView('#mensagemView');

  constructor() {
    // this._inputData = document.querySelector('#data') as HTMLInputElement;
    // this._inputQuantidade = document.querySelector('#quantidade') as HTMLInputElement;
    // this._inputValor = document.querySelector('#valor') as HTMLInputElement;
    // this._negociacoesView.update(this._negociacoes);
  }

  @inspect
  @logarTempoDeExecucao(true)
  public adiciona(): void {
    const negociacao = Negociacao.criaDe(
      this._inputData.value,
      this._inputQuantidade.value,
      this._inputValor.value,
    );
    //só acrescentar nos dias úteis
    if (!this.ehDiaUtil(negociacao.data)) {
      this._mensagemView.update('Apenas negociações em dias úteis são aceitas.')
      return;
    }
    this._negociacoes.adiciona(negociacao);
    this.atualizaView();
    this.lipaFormulario();
  }

  public importaDados(): void {
    fetch('http://localhost:8080/dados')
      .then((res) => res.json())
      .then((dados: any[]) => {
        return dados.map((dadosDeHoje) => {
          console.log('dadosDeHoje: ', dadosDeHoje);
          return new Negociacao(new Date(), dadosDeHoje.vezes, dadosDeHoje.montante);
        });
      })
      .then((negociacoesDeHoje) => {
        negociacoesDeHoje.forEach((item) => this._negociacoes.adiciona(item));
        this._negociacoesView.update(this._negociacoes);
      })
  }

  private ehDiaUtil(data: Date) {
    return data.getDay() > DiasDaSemana.DOMINGO && data.getDay() < DiasDaSemana.SABADO
  }

  private lipaFormulario(): void {
    this._inputData.value = '';
    this._inputQuantidade.value = '';
    this._inputValor.value = '';
    this._inputData.focus();
  }

  private atualizaView(): void {
    this._negociacoesView.update(this._negociacoes);
    this._mensagemView.update('Negociação adicionada com sucesso');
  }
}