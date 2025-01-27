import axios from "axios";

const linkAPI = `https://improved-space-disco-wr5v4g75rw5rh96j5-3000.app.github.dev/posts`;

export const timelinePosts = async (filter) => {
  const { columm, order, limit, where, page } = filter;
  const resposta = await axios.get(`${linkAPI}/timeline`, {
    params: {
      column: columm,
      order: order,
      limit: limit,
      where: where,
      page: page,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return resposta.data;
};
