import { NegociacoesDoDia } from "../interfaces/negociacao-do-dia.js";
import { Negociacao } from "../models/negociacao.js";

export class NegociacoesService {
  public async obterNegociacoesDoDia(): Promise<Negociacao[]> {
    const response = await fetch('http://localhost:8080/dados');
    const data: NegociacoesDoDia[] = await response.json();
    return data.map((dadosDeHoje) => new Negociacao(new Date(), dadosDeHoje.vezes, dadosDeHoje.montante));
  }
}
