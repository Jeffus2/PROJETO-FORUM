import axio from "axios";

const linkAPI = `https://3333-codeanywhere-templates-e-53an7exilj.app.codeanywhere.com/`;

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

export const updateDadosUsuario = async (id, dados) => {
  try {
    const resposta = await axio.put(`${linkAPI}usuarios/${id}`, dados, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    return resposta.data;
  } catch (error) {
    return { error: error.message };
  }
};
