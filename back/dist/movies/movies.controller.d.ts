import { MoviesService } from './movies.service';
export declare class MoviesController {
    private readonly moviesService;
    constructor(moviesService: MoviesService);
    getFavorites(): Promise<{
        id: number;
        title: string;
        year: string;
        poster: string;
        imdbID: string;
        director: string;
    }[]>;
    addFavorite(data: any): Promise<{
        id: number;
        title: string;
        year: string;
        poster: string;
        imdbID: string;
        director: string;
    }>;
    updateFavorite(id: number, data: any): Promise<{
        id: number;
        title: string;
        year: string;
        poster: string;
        imdbID: string;
        director: string;
    }>;
    deleteFavorite(id: number): Promise<{
        id: number;
        title: string;
        year: string;
        poster: string;
        imdbID: string;
        director: string;
    }>;
}
