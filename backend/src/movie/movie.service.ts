import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { AdminService } from 'src/admin/admin.service';
// import moviesData from './moviesData.json'; //* for bulk imports

@Injectable()
export class MoviesService {
  searchMovies(keyword: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepo: Repository<Movie>,
    private readonly adminService: AdminService,
  ) {}
  // Admin session check
  private checkAdmin(key: string) {
    if (!this.adminService.isAdmin(key)) {
      throw new UnauthorizedException('Not allowed');
    }
  }

  async createMovie(data: any, key: string) {
    this.checkAdmin(key);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.movieRepo.save(data);
  }
  async getAllMovies() {
    return this.movieRepo.find();
  }

  // Get single movie by ID
  async getMovieById(id: number) {
    return await this.movieRepo.findOneBy({ id });
  }

  async updateMovie(id: number, data: any, key: string) {
    this.checkAdmin(key);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await this.movieRepo.update(id, data);
    return this.movieRepo.findOne({ where: { id } });
  }
  async deleteMovie(id: number, key: string) {
    this.checkAdmin(key);
    return this.movieRepo.delete(id);
  }
  //* one time use for bulk import
  // async bulkImport(key: string) {
  //   this.checkAdmin(key);
  //   console.log('MOVIES DATA:', moviesData);
  //   return await this.movieRepo.save(moviesData);
  // }
}
