// decorator de uma propriedade
export function domInjector(seletor:string) {
  return function (
    target: any,
    propertyKey: string,
  ){
    // console.log(propertyKey);
    const getter = function () {
      const elemento = document.querySelector(seletor);
      return elemento;
    }
    
  }
}