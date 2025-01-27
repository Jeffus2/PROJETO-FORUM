import axio from "axios";

const linkAPI = `https://improved-space-disco-wr5v4g75rw5rh96j5-3000.app.github.dev/`;

export const registrarUsuario = async (dados) => {
  try {
    const resposta = await axio.post(`${linkAPI}/usuarios/cadastrar`, dados);
    return resposta.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const loginUsuario = async (dados) => {
  try {
    const resposta = await axio.post(`${linkAPI}/usuarios/login`, dados);
    return resposta.data;
  } catch (error) {
    return { error: error.message };
  }
};
