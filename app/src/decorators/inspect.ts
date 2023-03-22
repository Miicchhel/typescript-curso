export function inspect(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const metodoOriginal = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`--- Método ${propertyKey}`);
    console.log(`--- Parâmetros ${JSON.stringify(args)}`);
    const retorno = metodoOriginal.apply(this, args);
    console.log(`--- retorno ${JSON.stringify(retorno)}`);
    console.log("");
    return retorno;
  };
  return descriptor;
}

// não há necessidade da 'função de fora' (wrapper) caso o decorator não vá receber parâmetros.