import axios from "axios";

const linkAPI = `https://3333-codeanywhere-templates-e-53an7exilj.app.codeanywhere.com/comentarios`;

export const timelineComentarios = async (post_id) => {
  try {
    const response = await axios.get(`${linkAPI}/${post_id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los comentarios:", error);
    throw error;
  }
};

export const curtirComentario = async (id, usuario_id) => {
  try {
    const response = await axios.put(`${linkAPI}/${id}/curtir`, {
      params: { usuario_id:usuario_id },
    });
    return response.data;
  } catch (error) {
    console.error("Error al curtir el comentario:", error);
    throw error;
  }
};

export const criarComentario = async (conteudo,usuario_id,post_id) => {

  try {
    const response = await axios.post(`${linkAPI}`, {
      conteudo: conteudo,
      usuario_id: usuario_id,
      post_id: post_id,
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear el comentario:", error);
    throw error;
  }
};

export const deletarComentario = async (id) => {
  try {
    const response = await axios.delete(`${linkAPI}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el comentario:", error);
    throw error;
  }
};