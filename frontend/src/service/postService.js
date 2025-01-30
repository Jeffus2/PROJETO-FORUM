import axios from "axios";

const linkAPI = `https://super-doodle-g45jrp74jw672w67j-3333.app.github.dev/posts`;

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
