import { StudioDto } from '../../../core/dtos/studios-dto/studio.dto';
import { Studio } from '../../../core/models/studio/studio';

/** Studio Mapper. */
export namespace StudioMapper {

	/**
	 * Makes studios readable.
	 * @param studios Array of studio.
	 */
	export function toReadable(studios: readonly Studio[]): string {
		return studios.map(studio => studio.name).join(', ');
	}

	/**
	 * Converts studio from DTO to model.
	 * @param dto Studio DTO.
	 */
	export function fromDto(dto: StudioDto): Studio {
		return {
			id: dto.id,
			created: new Date(dto.created),
			modified: new Date(dto.modified),
			name: dto.name,
		};
	}
}