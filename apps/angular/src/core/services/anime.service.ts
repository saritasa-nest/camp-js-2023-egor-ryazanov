import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AnimeDto, AnimePaginationDto } from '@js-camp/core/dtos/anime-dto/anime.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime/anime.mapper';
import { Anime, AnimePagination } from '@js-camp/core/models/anime/anime';
import { Observable, map } from 'rxjs';
import { AnimeParametersMapper } from '@js-camp/core/mappers/anime/anime-params.mapper';
import { AnimeParameters } from '@js-camp/core/models/anime/anime-params';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';

import { UrlService } from './url.service';

/** Anime service. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	/** HTTP service. */
	private readonly http = inject(HttpClient);

	/** Url service. */
	private readonly urlService = inject(UrlService);

	/**
	 * Get anime from server.
	 * @param parameters Parameters of current request.
	 */
	public getAnimes(parameters: AnimeParameters): Observable<AnimePagination> {
		return this.http
			.get<AnimePaginationDto>(this.urlService.animeUrls.animes, {
			params: new HttpParams({ fromObject: { ...AnimeParametersMapper.toDto(parameters) } }),
		})
			.pipe(
				map(animePaginationDto => PaginationMapper.fromDto<AnimeDto, Anime>(animePaginationDto, AnimeMapper.fromDto)),
			);
	}
}
