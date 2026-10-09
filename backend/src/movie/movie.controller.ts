import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Headers,
  NotFoundException,
} from '@nestjs/common';
import { MoviesService } from './movie.service';
import { Query } from '@nestjs/common';

@Controller('movies') // <-- ROUTE = /movies
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Post('create')
  createMovie(@Body() body: any, @Headers('admin-key') key: string) {
    return this.movieService.createMovie(body, key);
  }

  @Get('list')
  getAllMovies() {
    return this.movieService.getAllMovies();
  }

  @Get(':id')
  async getMovieById(@Param('id') id: string) {
    const movieId = Number(id);

    if (isNaN(movieId)) {
      throw new NotFoundException('Invalid movie id');
    }

    const movie = await this.movieService.getMovieById(movieId);

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    return movie;
  }

  @Put('update/:id')
  updateMovie(
    @Param('id') id: number,
    @Body() body: any,
    @Headers('admin-key') key: string,
  ) {
    return this.movieService.updateMovie(+id, body, key);
  }

  @Delete('delete/:id')
  deleteMovie(@Param('id') id: number, @Headers('admin-key') key: string) {
    return this.movieService.deleteMovie(+id, key);
  }
  //** for bulk imports */
  // @Post('bulk-import')
  // bulkImport(@Headers('admin-key') key: string) {
  //   return this.movieService.bulkImport(key);
  // }
  @Get('search')
  searchMovies(@Query('keyword') keyword: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return this.movieService.searchMovies(keyword);
  }
}
