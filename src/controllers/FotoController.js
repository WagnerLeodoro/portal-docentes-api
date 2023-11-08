const multer = require('multer')
const multerConfig = require('../config/multerConfig')
const Foto = require('../model/Foto')
const AppError = require('../utils/AppError')

const upload = multer(multerConfig).single('foto')

class FotoController {
  store(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        return new AppError(error.message, 400)
      }

      const { originalname, filename } = req.file
      const { docente_id } = req.body
      const foto = await Foto.create({ originalname, filename, docente_id })
      return res.json(foto)
    })
  }
}

module.exports = { FotoController }
