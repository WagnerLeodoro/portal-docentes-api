const Docente = require('../model/Docente')
const Foto = require('../model/Foto')
const AppError = require('../utils/AppError')

class DocenteController {
  async createDocente(req, res) {
    const { nome, formacao, formacao_adicional, projetos, area_atuacao_senac } =
      req.body
    const newDocente = await Docente.create({
      nome,
      formacao,
      formacao_adicional,
      projetos,
      area_atuacao_senac,
    })
    res.status(201).json([newDocente])
  }

  async listAllDocentes(req, res) {
    const allDocentes = await Docente.findAll({
      attributes: [
        'id',
        'nome',
        'formacao',
        'formacao_adicional',
        'projetos',
        'area_atuacao_senac',
      ],
      order: [
        ['nome', 'ASC'],
        [Foto, 'id', 'DESC'],
      ],
      include: { model: Foto, attributes: ['url', 'filename'] },
    })
    res.status(200).json(allDocentes)
  }

  async listDocenteById(req, res) {
    const { id } = req.params

    const docente = await Docente.findByPk(id, {
      order: [
        ['nome', 'ASC'],
        [Foto, 'id', 'DESC'],
      ],
      include: { model: Foto, attributes: ['url', 'filename'] },
    })

    if (!docente) {
      throw new AppError('Docente não existe', 404)
    }
    return res.json(docente)
  }

  async updateDocente(req, res) {
    const { id } = req.params
    const { nome, formacao, formacao_adicional, projetos, area_atuacao_senac } =
      req.body
    const updatedDocente = await Docente.update(
      {
        nome,
        formacao,
        formacao_adicional,
        projetos,
        area_atuacao_senac,
      },
      {
        where: { id: id },
      },
    )
    if (!updatedDocente) {
      throw new AppError('Docente não encontrado', 400)
    }
    res.status(200).json('Docente atualizado com sucesso')
  }

  async deleteDocente(req, res) {
    const { id } = req.params
    const docente = await Docente.destroy({
      where: { id: id },
    })
    if (!docente) {
      res.status(400).json('Registro não encontrado')
    } else {
      res.status(200).json('Registro deletado com sucesso')
    }
  }
}

module.exports = { DocenteController }
