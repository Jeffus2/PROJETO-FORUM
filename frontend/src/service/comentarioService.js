import axios from "axios";

const linkAPI = `https://miniature-carnival-x597p4v57q47c69x5-3333.app.github.dev/comentarios`;

//`https://3333-codeanywhere-templates-e-53an7exilj.app.codeanywhere.com/comentarios`;

const token = JSON.parse(localStorage.getItem("token"));

export const timelineComentarios = async (post_id) => {
  try {
    const response = await axios.get(`${linkAPI}/${post_id}`, {
      params: { page: 1 },

      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener los comentarios:", error);
    throw error;
  }
};

export const curtirComentario = async (id, usuario_id) => {
  try {
    const response = await axios.post(
      `${linkAPI}/${id}/curtir`,
      {},
      {
        params: { usuario_id: usuario_id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al curtir el comentario:", error);
    throw error;
  }
};

export const criarComentario = async (conteudo, usuario_id, post_id) => {
  const comentario = { conteudo, usuario_id, post_id };
  try {
    const response = await axios.post(`${linkAPI}`, comentario, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear el comentario:", error);
    throw error;
  }
};

export const deletarComentario = async (id) => {
  try {
    const response = await axios.delete(`${linkAPI}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el comentario:", error);
    throw error;
  }
};
