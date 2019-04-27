const { User } = require('../models')

class UserController {
  create (req, res) {
    return res.render('auth/signup')
  }

  async store (req, res) {
    let erro = 0
    if (!req.file) {
      req.flash('error', 'Foto deve ser informada')
      erro = 1
    }

    const { name, email, password } = req.body

    if (!name) {
      req.flash('error', 'Nome do usuário deve ser informado')
      erro = 1
    }

    if (!email) {
      req.flash('error', 'Email do usuário deve ser informado')
      erro = 1
    }

    if (!password) {
      req.flash('error', 'Senha do usuário deve ser informada')
      erro = 1
    }

    if (erro !== 0) {
      return res.redirect('/signup')
    }

    const { filename: avatar } = req.file

    await User.create({ ...req.body, avatar })

    return res.redirect('/')
  }
}

module.exports = new UserController()
