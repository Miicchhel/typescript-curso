export class NegociacoesView {

  private _elemento: HTMLElement;

  constructor(seletor:string){
    this._elemento = document.querySelector(seletor)
  }

  template(): string {
    return `
    <table class="table table-hover table-bordered">
      <thead>
        <tr>
          <th>DATA</th>
          <th>QUANTIDADE</th>
          <th>VALOR</th>
        </tr>
      <thead>
      <tbody>
      </tbody>
    </table>
    `
  }

  update(): void {
    this._elemento.innerHTML = this.template();
  }
}