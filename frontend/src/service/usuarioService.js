import axio from "axios";

const linkAPI = `https://super-doodle-g45jrp74jw672w67j-3333.app.github.dev/`;

export const registrarUsuario = async (dados) => {
  try {
    const resposta = await axio.post(`${linkAPI}usuarios/cadastrar`, dados);
    return resposta.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const loginUsuario = async (dados) => {
  try {
    const resposta = await axio.post(`${linkAPI}usuarios/login`, dados);
    return resposta.data;
  } catch (error) {
    return { error: error.message };
  }
};
