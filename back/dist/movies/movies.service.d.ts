import { PrismaService } from '../prisma/prisma.service';
export declare class MoviesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getFavorites(): Promise<{
        _id: number;
        id: number;
        title: string;
        year: string;
        poster: string;
        imdbID: string;
        director: string;
        image1: string;
    }[]>;
    addFavorite(data: any): Promise<{
        id: number;
        title: string;
        year: string;
        poster: string;
        imdbID: string;
        director: string;
        image1: string;
    }>;
    updateFavorite(id: number, data: any): Promise<{
        id: number;
        title: string;
        year: string;
        poster: string;
        imdbID: string;
        director: string;
        image1: string;
    }>;
    deleteFavorite(id: number): Promise<{
        id: number;
        title: string;
        year: string;
        poster: string;
        imdbID: string;
        director: string;
        image1: string;
    }>;
}
