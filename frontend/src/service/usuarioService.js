import axio from "axios";
import { parse } from "date-fns";

const linkAPI = `https://miniature-carnival-x597p4v57q47c69x5-3333.app.github.dev/`;
//`https://3333-codeanywhere-templates-e-53an7exilj.app.codeanywhere.com/`;

const token = JSON.parse(localStorage.getItem("token"));

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
        Authorization: `Bearer ${token}`,
      },
    });
    return resposta.data;
  } catch (error) {
    return { error: error.message };
  }
};
