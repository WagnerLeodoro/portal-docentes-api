const multer = require('multer')
const { resolve, extname } = require('path')

const tmpFolder = resolve(__dirname, '..', '..', 'temp')

module.exports = {
  tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (req, file, callback) => {
      const fileHash = String(Date.now())
      const fileName = `${fileHash}-${extname(file.originalname)}`
      return callback(null, fileName)
    },
  }),
}
