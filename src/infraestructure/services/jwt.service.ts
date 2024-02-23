import { IJWT } from "../../domain/services/IJWT";
import jwt from 'jsonwebtoken'

export class JWTService implements IJWT {

  async sign(payload: any): Promise<string> {
    return jwt.sign({
      data: payload
    }, `${process.env.JWT_SECRET || 'SECRET'}`, { expiresIn: "1h" });

  }
  async verify(token: string): Promise<any> {
    try {
      return jwt.verify(token, process.env.JWT_SECRET || 'SECRET')

    } catch (error) {
      throw new Error('Unauthorized Request, JWT Malformed')
    }
  }
}
