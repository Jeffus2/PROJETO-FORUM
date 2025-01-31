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

export const qtd_posts = async (usuario_id) => {
  try {
    const resposta = await axios.get(`${linkAPI}/${usuario_id}/accPosts`);
    return resposta.data;
  } catch (error) {
    return { error: error.message };
  }
};
