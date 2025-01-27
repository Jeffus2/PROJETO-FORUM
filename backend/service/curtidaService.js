const Curtidas = require("../model/Curtidas");

const curtidaService = {
  obterCurtida: async (tipo, referencia_id, usuario_id) => {
    console.log(tipo, referencia_id, usuario_id);
    if (!tipo || !referencia_id || !usuario_id) {
      return { error: "Dados insuficientes" };
    }
    try {
      const curtida = await Curtidas.findOne({
        where: {
          tipo: tipo,
          referencia_id: referencia_id,
          usuario_id: usuario_id,
        },
      });
      return curtida;
    } catch (error) {
      return { error: error };
    }
  },
};

module.exports = curtidaService;
