import axios from "axios";

const linkAPI = `https://miniature-carnival-x597p4v57q47c69x5-3333.app.github.dev/posts`;
//`https://3333-codeanywhere-templates-e-53an7exilj.app.codeanywhere.com/posts`;

const token = JSON.parse(localStorage.getItem("token"));

export const timelinePosts = async (usuario_id, filter) => {
  try {
    const { columm, order, limit, where, page } = filter;
    const resposta = await axios.get(`${linkAPI}/${usuario_id}/timeline`, {
      params: {
        column: columm,
        order: order,
        limit: limit,
        where: where,
        page: page,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resposta.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const timelinePostsMaisCurtidos = async (usuario_id, filter) => {
  try {
    const { order, limit, where, page } = filter;
    const resposta = await axios.get(`${linkAPI}/${usuario_id}/timeline`, {
      params: {
        column: "qtd_curtidas",
        order: order,
        limit: 5,
        where: where,
        page: page,
      },
      headers: { Authorization: `Bearer ${token}` },
    });
    return resposta.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const getPost = async (id, usuario_id) => {
  try {
    const resposta = await axios.get(`${linkAPI}/${id}`, {
      params: {
        usuario_id: usuario_id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resposta.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const createPost = async (titulo, conteudo, usuario_id) => {
  const post = { titulo, conteudo, usuario_id };
  try {
    const resposta = await axios.post(`${linkAPI}/`, post, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resposta.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const updatePost = async (post_id, novoPost) => {
  try {
    const resposta = await axios.put(`${linkAPI}/${post_id}`, novoPost, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resposta.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const deletePost = async (id) => {
  try {
    const resposta = await axios.delete(`${linkAPI}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resposta.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const curtirPost = async (id, usuario_id) => {
  try {
    const resposta = await axios.post(
      `${linkAPI}/${id}/curtir/${usuario_id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return resposta.data;
  } catch (error) {
    return { error: error.message };
  }
};
