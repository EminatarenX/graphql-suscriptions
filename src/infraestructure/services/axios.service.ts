import axios from 'axios'
import { IAxios } from '../../domain/services/IAxios'
export class AxiosService implements IAxios {
  async get(url: string, headers: any) {
    if (headers) {
      return await axios.get(url, { headers })
    } else {
      return await axios.get(url)
    }
  }
  async post(url: string, data: any, headers: any) {
    if (headers) {
      return await axios.post(url, data, { headers });
    } else {
      return await axios.post(url, data, { timeout: 1500 });
    }
  }
}
