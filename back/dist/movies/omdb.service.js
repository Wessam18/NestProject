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
exports.OmdbService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
let OmdbService = class OmdbService {
    constructor(httpService) {
        this.httpService = httpService;
        this.API_KEY = '800bdf56';
        this.BASE_URL = 'https://www.omdbapi.com';
    }
    async searchMovies(query) {
        const response = await this.httpService
            .get(`${this.BASE_URL}/?s=${query}&apikey=${this.API_KEY}`)
            .toPromise();
        return response.data.Search || [];
    }
};
exports.OmdbService = OmdbService;
exports.OmdbService = OmdbService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], OmdbService);
//# sourceMappingURL=omdb.service.js.map