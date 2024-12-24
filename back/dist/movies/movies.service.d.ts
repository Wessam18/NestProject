import { PrismaService } from '../prisma/prisma.service';
export declare class MoviesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
