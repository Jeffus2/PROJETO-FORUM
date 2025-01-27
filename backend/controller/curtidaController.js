const curtidaService = require("../service/curtidaService");

const curtidaController = {
  obterCurtida: async (req, res) => {
    try {
      const { referencia_id } = req.params;
      const { tipo, usuario_id } = req.query;
      const curtida = await curtidaService.obterCurtida(
        tipo,
        referencia_id,
        usuario_id
      );
      if (curtida.error) {
        return res
          .status(500)
          .json({ status: "ERROR", message: curtida.error });
      }
      res.status(200).json(curtida);
    } catch (error) {
      res.status(400).json({ mensagem: error.message });
    }
  },
};

module.exports = curtidaController;
