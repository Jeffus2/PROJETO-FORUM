import axios from "axios";

const linkAPI = `https://3333-codeanywhere-templates-e-53an7exilj.app.codeanywhere.com/posts`;

export const timelinePosts = async (filter) => {
  try {
    const { columm, order, limit, where, page } = filter;
    const resposta = await axios.get(`${linkAPI}/timeline`, {
      params: {
        column: columm,
        order: order,
        limit: limit,
        where: where,
        page: page,
      },
      // headers: {
      //   Authorization: `Bearer ${localStorage.getItem("token")}`,
      // },
    });
    return resposta.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const timelinePostsMaisCurtidos = async (filter) => {
  try {
    const { order, limit, where, page } = filter;
    const resposta = await axios.get(`${linkAPI}/timeline`, {
      params: {
        column: "qtd_curtidas",
        order: order,
        limit: limit,
        where: where,
        page: page,
      },
      // headers: {
      //   Authorization: `Bearer ${localStorage.getItem("token")}`,
      // },
    });
    return resposta.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const getPost = async (id) => {
  try {
    const resposta = await axios.get(`${linkAPI}/${id}`);
    return resposta.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const createPost = async (post) => {
  try {
    const resposta = await axios.post(`${linkAPI}/`, post, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    return resposta.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const updatePost = async (post) => {
  try {
    const resposta = await axios.put(`${linkAPI}/${post.id}`, post, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
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
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    return resposta.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const curtirPost = async (id, usuario_id) => {
  try {
    const resposta = await axios.put(`${linkAPI}/${id}/curtir/`,{
      params:{
        usuario_id: usuario_id
      }
    });
    return resposta.data;
  } catch (error) {
    return { error: error.message };
  }
};