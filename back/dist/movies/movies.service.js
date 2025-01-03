"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MoviesService = class MoviesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getFavorites() {
        const favorites = await this.prisma.favoriteMovie.findMany();
        return favorites.map((movie) => ({
            ...movie,
            _id: movie.id,
        }));
    }
    async addFavorite(data) {
        const movieData = {
            title: data.title,
            year: data.year,
            imdbID: data.imdbID,
            poster: data.poster || "https://via.placeholder.com/200x300?text=No+Poster",
            director: data.director || "Unknown",
            image1: data.image1 || "https://via.placeholder.com/200x300?text=No+Image",
        };
        return this.prisma.favoriteMovie.create({
            data: movieData,
        });
    }
    async updateFavorite(id, data) {
        return this.prisma.favoriteMovie.update({
            where: { id: Number(id) },
            data,
        });
    }
    async deleteFavorite(id) {
        return this.prisma.favoriteMovie.delete({ where: { id: Number(id) } });
    }
};
exports.MoviesService = MoviesService;
exports.MoviesService = MoviesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MoviesService);
//# sourceMappingURL=movies.service.js.map