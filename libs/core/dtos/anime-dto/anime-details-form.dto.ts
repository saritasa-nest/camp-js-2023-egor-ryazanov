import { AiredDto } from '../aired-dto';

import { RatingDto, SeasonDto, SourceDto } from './anime-details.dto';
import { AnimeStatusDto, AnimeTypeDto } from './anime.dto';

/** Anime detail form DTO. */
export interface AnimeDetailFormDto {

	/** English title. */
	readonly title_eng: string;

	/** Japanese title. */
	readonly title_jpn: string;

	/** Image URL. */
	readonly image: string | null;

	/** Aired dates. */
	readonly aired: AiredDto;

	/** Type. */
	readonly type: AnimeTypeDto;

	/** Status. */
	readonly status: AnimeStatusDto;

	/** Rating. */
	readonly rating: RatingDto;

	/** Source. */
	readonly source: SourceDto;

	/** Season. */
	readonly season: SeasonDto;

	/** Youtube trialer's ID. */
	readonly trailer_youtube_id: string | null;

	/** Airing. */
	readonly airing: boolean;

	/** Synopsis. */
	readonly synopsis: string;

	/** Studios IDs. */
	readonly studios: readonly number[];

	/** Genres IDs. */
	readonly genres: readonly number[];
}
