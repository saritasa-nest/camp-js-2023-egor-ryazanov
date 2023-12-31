import { AnimeParams } from '../../../core/models/anime/anime-params';
import { AnimeParametersDto } from '../../../core/dtos/anime-dto/anime-params.dto';
import { AnimeStatusDto } from '../../../core/dtos/anime-dto/anime.dto';
import { deleteUndefinedProperties } from '../../../core/utils/delete-undefined-properties';
import { AnimeStatus } from '../../../core/models/anime/anime-status';
import { AnimeOrderingField } from '../../../core/models/anime/anime-ordering';
import { AnimeOrderingFieldDto } from '../../../core/dtos/anime-dto/anime-ordering.dto';
import { OrderingMapper } from '../ordering.mapper';
import { DefaultParamsMapper } from '../default-params.mapper';

import { AnimeTypeMapper } from './anime-type.mapper';

/** Anime Parameters Mapper. */
export namespace AnimeParametersMapper {
	const ORDERING_FIELD_TO_DTO = {
		[AnimeOrderingField.TitleEnghlish]: AnimeOrderingFieldDto.TitleEnghlish,
		[AnimeOrderingField.Status]: AnimeOrderingFieldDto.Status,
		[AnimeOrderingField.AiredStart]: AnimeOrderingFieldDto.AiredStart,
	};

	const ANIME_STATUS_TO_DTO: Readonly<Record<AnimeStatus, AnimeStatusDto>> = {
		[AnimeStatus.Finished]: AnimeStatusDto.Finished,
		[AnimeStatus.NotYetAired]: AnimeStatusDto.NotYetAired,
		[AnimeStatus.Airing]: AnimeStatusDto.Airing,
	};

	/**
	 * Converts model to dto.
	 * @param model Anime model.
	 */
	export function toDto(model: AnimeParams): AnimeParametersDto {
		return deleteUndefinedProperties({
			...DefaultParamsMapper.toDto(model),
			ordering: OrderingMapper.toDto(model?.ordering, ORDERING_FIELD_TO_DTO),
			status: model?.status ? ANIME_STATUS_TO_DTO[model.status] : undefined,
			type__in: model?.typeIn ? AnimeTypeMapper.toDto(model.typeIn) : undefined,
		});
	}
}
