import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';

import { ImageBucket } from '@js-camp/core/models/image-bucket';
import { ImageBucketMapper } from '@js-camp/core/mappers/image-bucket.mapper';
import { S3InstructionsDto } from '@js-camp/core/dtos/s3-instuctions';

import { XmlImageMapper } from '@js-camp/core/mappers/xml-image.mapper';

import { UrlService } from './url.service';

/** Image service. */
@Injectable({
	providedIn: 'root',
})
export class ImageService {
	private readonly httpService = inject(HttpClient);

	private readonly urlService = inject(UrlService);

	/**
	 * Create image URL.
	 * @param parameters Image bucket parametes.
	 * @param file Image.
	 */
	public create(parameters: ImageBucket, file: File): Observable<string | null> {
		return this.httpService
			.post<S3InstructionsDto>(this.urlService.imageUrls.getParams, ImageBucketMapper.toDto(parameters))
			.pipe(
				map(instructions => this.getImageFormData(instructions, file)),
				switchMap(({ url, formData }) => this.httpService.post(url, formData, { responseType: 'text' })),
				map((xml: string) => XmlImageMapper.fromDto(xml)),
			);
	}

	/**
	 * Puts intructions in form data.
	 * @param instructions Image intructions.
	 * @param file Image.
	 */
	private getImageFormData(instructions: S3InstructionsDto, file: File): Readonly<{ url: string; formData: FormData; }> {
		const formData = new FormData();
		Object.keys(instructions).forEach(instructionsKey => {
			if (instructionsKey !== 'form_action') {
				formData.append(instructionsKey, instructions[instructionsKey as keyof S3InstructionsDto]);
			}
		});
		formData.append('file', file);
		return { url: instructions.form_action, formData };
	}
}
