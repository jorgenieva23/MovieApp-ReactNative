import axios, { AxiosInstance } from 'axios';
import { HttpAdapter } from './http.adapter';

interface Options {
  baseURL: string;
  params?: Record<string, string>;
}

export class AxiosAdapter implements HttpAdapter {
  private axiosInstant: AxiosInstance;

  constructor(options: Options) {
    this.axiosInstant = axios.create({
      baseURL: options.baseURL,
      params: options.params,
    });
  }

  async get<T>(url: string, options?: Record<string, unknown>): Promise<T> {
    try {
      const { data } = await this.axiosInstant.get<T>(url, options);
      return data;
    } catch (error) {
      throw new Error(`Error fetching get ${url} `);
    }
  }
}
