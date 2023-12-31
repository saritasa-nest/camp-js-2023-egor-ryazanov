import { StudioDto } from '../studios-dto/studio.dto';
import { GenreDto } from '../genre-dto/genre.dto';

import { AnimeDto } from './anime.dto';

/** Anime Detail DTO. */
export interface AnimeDetailDto extends AnimeDto {

	/**
	 * Created date.
	 * @example 2023-07-13T08:25:29.562269Z.
	 */
	readonly created: string;

	/**
	 * Modified date.
	 * @example 2023-07-13T08:25:29.562276Z.
	 */
	readonly modified: string;

	/** Rating. */
	readonly rating: RatingDto;

	/** Source. */
	readonly source: SourceDto;

	/** Season. */
	readonly season: SeasonDto;

	/** Youtube trialer's ID. */
	readonly trailer_youtube_id: string;

	/** Airing. */
	readonly airing: boolean;

	/** Synopsis. */
	readonly synopsis: string;

	/** Studios. */
	readonly studios_data: readonly StudioDto[];

	/** Genres. */
	readonly genres_data: readonly GenreDto[];
}

/** Seasons DTO. */
export enum SeasonDto {
	Summer = 'SUMMER',
	Winter = 'WINTER',
	Spring = 'SPRING',
	Fall = 'FALL',
	NonSeasonal = 'NON_SEASONAL',
}

/** Source DTO. */
export enum SourceDto {
	FourKomaManga = 'FOUR_KOMA_MANGA',
	Book = 'BOOK',
	CardGame = 'CARD_GAME',
	Game = 'GAME',
	LightNovel = 'LIGHT_NOVEL',
	Manga = 'MANGA',
	MixedMedia = 'MIXED_MEDIA',
	Music = 'MUSIC',
	Novel = 'NOVEL',
	Original = 'ORIGINAL',
	PictureBook = 'PICTURE_BOOK',
	Radio = 'RADIO',
	VisialNovel = 'VISUAL_NOVEL',
	WebManga = 'WEB_MANGA',
	WebNovel = 'WEB_NOVEL',
	Other = 'OTHER',
	Unknown = 'UNKNOWN',
}

/** Rating DTO. */
export enum RatingDto {
	G = 'G',
	PG = 'PG',
	PG_13 = 'PG_13',
	R_17 = 'R_17',
	R_PLUS = 'R_PLUS',
	R_X = 'R_X',
	Unknown = 'UNKNOWN',
}
