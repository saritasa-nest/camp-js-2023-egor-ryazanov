import { Pipe, PipeTransform } from '@angular/core';
import { AnimeType, AnimeTypes } from '@js-camp/core/models/anime-type';

/** Anime type pipe. */
@Pipe({
	name: 'readableAnimeType',
})
export class ReadableAnimeType implements PipeTransform {
	/**
	 * Makes anime type readable.
	 * @param value Anime type.
	 */
	public transform(value: AnimeType): string {
		return AnimeTypes.toReadable(value);
	}
}
