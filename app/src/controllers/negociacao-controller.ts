import { domInjector } from "../decorators/dom-injector.js";
import { inspect } from "../decorators/inspect.js";
import { logarTempoDeExecucao } from "../decorators/logar-tempo-de-execucao.js";
import { DiasDaSemana } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { NegociacoesService } from "../services/negociacoes-service.js";
import { imprimir } from "../utils/imprimir.js";
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
  private _negociacoesService = new NegociacoesService();

  constructor() {}

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
    
    imprimir(negociacao, this._negociacoes);

    this.lipaFormulario();
    this.atualizaView();
  }

  public importaDados(): void {
    this._negociacoesService
      .obterNegociacoesDoDia()
      .then((negociacoesDeHoje) => {
        negociacoesDeHoje.forEach((item) => this._negociacoes.adiciona(item));
        this._negociacoesView.update(this._negociacoes);
      });
  }

  private ehDiaUtil(data: Date): boolean {
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