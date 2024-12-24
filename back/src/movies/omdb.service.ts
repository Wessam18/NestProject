import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'; // Correct import

@Injectable()
export class OmdbService {
  private readonly API_KEY = '800bdf56'; // Use your actual OMDb API key
  private readonly BASE_URL = 'https://www.omdbapi.com';

  constructor(private readonly httpService: HttpService) {} // Inject HttpService

  async searchMovies(query: string) {
    // Make the GET request to OMDb API
    const response = await this.httpService
      .get(`${this.BASE_URL}/?s=${query}&apikey=${this.API_KEY}`)
      .toPromise();
    return response.data.Search || [];
  }
}
