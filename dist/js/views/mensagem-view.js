export class MensagemView {
    constructor(seletor) {
        this._element = document.querySelector(seletor);
    }
    template(model) {
        return `
    <p class="alert alert-info">${model}</p>
    `;
    }
    update(model) {
        this._element.innerHTML = this.template(model);
    }
}
