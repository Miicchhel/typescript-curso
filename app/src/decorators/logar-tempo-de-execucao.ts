export function logarTempoDeExecucao() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
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