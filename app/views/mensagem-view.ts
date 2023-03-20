export class MensagemView {
  
  private _element: HTMLElement;
  
  constructor(seletor: string) {
    this._element = document.querySelector(seletor);
  }

  template(model:string): string {
    return`
    <p class="alert alert-info">${model}</p>
    `
  }

  update(model:string):void {
    this._element.innerHTML = this.template(model);
  }
}