import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AnimeDto, AnimePaginationDto } from '@js-camp/core/dtos/anime-dto/anime.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime/anime.mapper';
import { Anime, AnimePagination } from '@js-camp/core/models/anime/anime';
import { Observable, first, map, of, switchMap } from 'rxjs';
import { AnimeParametersMapper } from '@js-camp/core/mappers/anime/anime-params.mapper';
import { AnimeParameters } from '@js-camp/core/models/anime/anime-params';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeDetailDto } from '@js-camp/core/dtos/anime-dto/anime-details.dto';
import { AnimeDetailMapper } from '@js-camp/core/mappers/anime/anime-details.mapper';
import { AnimeDetail } from '@js-camp/core/models/anime/anime-detail';
import { AnimeDetailForm } from '@js-camp/core/models/anime/anime-details-form';
import { AnimeDetailFormMapper } from '@js-camp/core/mappers/anime/anime-details-form.mapper';
import { AppErrorMapper } from '../utils/app-error.mapper';
import { UrlService } from './url.service';
import { ImageService } from './image.service';
import { Dest, ImageBucket } from '@js-camp/core/models/image-bucket';
import { catchImageError } from '../utils/catch-image-error';

/** Anime service. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	private readonly httpService = inject(HttpClient);

	private readonly urlService = inject(UrlService);

	private readonly appErrorMapper = inject(AppErrorMapper);

	private readonly animeDetailFormMapper = inject(AnimeDetailFormMapper);

	private readonly imageService = inject(ImageService);

	/**
	 * Get anime from server.
	 * @param parameters Parameters of current request.
	 */
	public getAnimes(parameters: AnimeParameters): Observable<AnimePagination> {
		return this.httpService
			.get<AnimePaginationDto>(this.urlService.animeUrls.animes, {
				params: new HttpParams({ fromObject: { ...AnimeParametersMapper.toDto(parameters) } }),
			})
			.pipe(
				map((animePaginationDto) => PaginationMapper.fromDto<AnimeDto, Anime>(animePaginationDto, AnimeMapper.fromDto)),
				this.appErrorMapper.catchHttpErrorToAppError()
			);
	}

	/**
	 * Gets anime by ID.
	 * @param id ID of anime.
	 */
	public getAnime(id: string): Observable<AnimeDetail> {
		return this.httpService.get<AnimeDetailDto>(this.urlService.animeUrls.animesDetail(id)).pipe(
			map((dto) => AnimeDetailMapper.fromDto(dto)),
			this.appErrorMapper.catchHttpErrorToAppError()
		);
	}

	/**
	 * Gets anime by ID.
	 * @param id ID of anime.
	 */
	public deleteAnime(id: string): Observable<void> {
		return this.httpService.delete<void>(this.urlService.animeUrls.animesDetail(id));
	}

	/**
	 * Changes anime.
	 * @param id ID.
	 * @param body Anime details form.
	 */
	public changeAnime(id: string, body: AnimeDetailForm): Observable<AnimeDetail> {
		return this.uploadImage(body.image.file).pipe(
			switchMap((imageUrl) =>
				this.httpService.put<AnimeDetailDto>(
					this.urlService.animeUrls.animesDetail(id),
					this.animeDetailFormMapper.toDto({ ...body, image: { file: null, url: imageUrl } })
				)
			),
			map((dto) => AnimeDetailMapper.fromDto(dto)),
			this.appErrorMapper.catchHttpErrorToAppErrorWithValidationSupport(this.animeDetailFormMapper)
		);
	}

	/**
	 * Creates anime.
	 * @param body Anime details.
	 */
	public createAnime(body: AnimeDetailForm): Observable<AnimeDetail> {
		return this.uploadImage(body.image.file).pipe(
			switchMap((imageUrl) =>
				this.httpService.post<AnimeDetailDto>(
					this.urlService.animeUrls.animes,
					this.animeDetailFormMapper.toDto({ ...body, image: { file: null, url: imageUrl } })
				)
			),
			map((dto) => AnimeDetailMapper.fromDto(dto)),
			this.appErrorMapper.catchHttpErrorToAppErrorWithValidationSupport(this.animeDetailFormMapper)
		);
	}

	public uploadImage(file: File | null): Observable<string | null> {
		if (file == null) {
			return of(null);
		}
		const params = {
			dest: Dest.AnimeImages,
			filename: file.name,
		};
		return this.imageService.create(params, file).pipe(first(), catchImageError());
	}
}
