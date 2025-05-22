import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class UserSeeder {
  public async run() {
    await User.create({
      name: 'Kalvin Manson',
      email: 'kalvinmanson@gmail.com',
      password: await hash.make('kalvinista01'),
    })
  }
}
