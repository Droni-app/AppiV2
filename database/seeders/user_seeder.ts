import User from '#models/user'

export default class UserSeeder {
  public async run() {
    await User.create({
      name: 'Kalvin Manson',
      email: 'kalvinmanson@gmail.com',
      password: 'kalvinista01',
    })
  }
}
