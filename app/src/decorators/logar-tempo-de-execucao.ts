export function logarTempoDeExecucao(emSegundos: boolean = false) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const metodoOriginal = descriptor.value;
    descriptor.value = function(...args: any[]) {
      let [divisor, unidade] = [1, 'milisegundos'];
      if(emSegundos) [divisor, unidade] = [1000, 'segundos'];
      const t1 = performance.now();
      const retorno = metodoOriginal.apply(this, args);
      const t2 = performance.now();
      console.log(`o metodo ${propertyKey} levou ${(t2-t1)/divisor} ${unidade} para ser executado.`);
      retorno;
    }
    return descriptor;
  }
}

/* 
  target: any
    Este é o objeto que contém o método decorado. Em outras palavras, é a classe à qual o método pertence.

  propertyKey: string
    Este é o nome do método decorado.

  descriptor: PropertyDescriptor
    Este é um objeto que contém a descrição do método decorado, incluindo informações como se o método é uma propriedade, se é um método estático ou de instância, e assim por diante.
*/