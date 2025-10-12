export function validarCamposObrigatorios(
  camposObrigatorios: Record<string, any>,
) {
  const camposInvalidos = [];

  for (const [nome, valor] of Object.entries(camposObrigatorios)) {
    if (
      valor == undefined ||
      valor == null ||
      (typeof valor === 'string' && valor.trim() == '')
    ) {
      camposInvalidos.push(nome);
    }
  }

  if (camposInvalidos.length > 0) {
    const formatado = camposInvalidos.join(', ');
    throw new Error(`Os seguintes campos estão vazios: ${formatado}`);
  }
}

export function validarCamposOpcionais(camposOpcionais: Record<string, any>) {
  const camposInvalidos = [];

  for (const [nome, valor] of Object.entries(camposOpcionais)) {
    if (
      valor == undefined ||
      valor == null ||
      (typeof valor === 'string' && valor.trim() == '')
    ) {
      camposInvalidos.push(nome);
    }
  }

  if (camposInvalidos.length > 0) {
    const formatado = camposInvalidos.join(', ');
    throw new Error(`Os seguintes campos estão vazios: ${formatado}`);
  }
}

type ValorComLimiteMinimo = {
  valor: string;
  minimoDeCaracteres: number;
};

type CampoInvalidoModel = {
  nome: string;
  valor: string;
  minimoDeCaracteres: number;
  totalCaracteres: number;
};
export function validarLimiteDeCaracteres(
  camposObrigatorios: Record<string, ValorComLimiteMinimo>,
) {
  const camposInvalidos: CampoInvalidoModel[] = [];

  for (const [nome, valor] of Object.entries(camposObrigatorios)) {
    const {valor: v, minimoDeCaracteres} = valor;

    const totalCaracteres = v.trim().length;
    if (totalCaracteres < minimoDeCaracteres) {
      camposInvalidos.push({
        nome: nome,
        minimoDeCaracteres: minimoDeCaracteres,
        totalCaracteres: totalCaracteres,
        valor: v,
      });
    }
  }

  if (camposInvalidos.length > 0) {
    //email: caracteres < 5
    //senha: caracteres < 8
    //final: Os seguintes campos não respeitaram o limite minimo de caracteres -> email: caracteres < 5, senha: caracteres < 8
    const list = camposInvalidos.map(
      it => `${it.nome}: caracteres < ${it.minimoDeCaracteres}`,
    );

    const formatado = list.join(', ');
    throw new Error(
      `Os seguintes campos não respeitaram o limite minimo de caracteres -> ${formatado}`,
    );
  }
}
