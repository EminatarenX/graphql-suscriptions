import bcrypt from 'bcrypt'
import { IBcrypt } from '../../domain/services/IBcrypt'

export class BcryptService implements IBcrypt {
  async hash(password: string): Promise<string> {
    const salt = 10
    return await bcrypt.hash(password, salt)
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword)
  }
}
