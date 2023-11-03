const multer = require('multer')
const multerConfig = require('../config/multerConfig')
const Foto = require('../model/Foto')

const upload = multer(multerConfig).single('foto')

class FotoController {
  store(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          errors: [error.code],
        })
      }

      try {
        const { originalname, filename } = req.file
        const { docente_id } = req.body
        const foto = await Foto.create({ originalname, filename, docente_id })

        return res.json(foto)
      } catch (e) {
        throw new AppError('Docente não existe', 400)
      }
    })
  }
}

module.exports = { FotoController }
