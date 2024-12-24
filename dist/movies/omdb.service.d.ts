import { HttpService } from '@nestjs/axios';
export declare class OmdbService {
    private readonly httpService;
    private readonly API_KEY;
    private readonly BASE_URL;
    constructor(httpService: HttpService);
    searchMovies(query: string): Promise<any>;
}
