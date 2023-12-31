import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Anime, AnimePagination } from '@js-camp/core/models/anime/anime';
import { BehaviorSubject, Observable, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { DEBOUNCE_TIME } from '@js-camp/angular/core/utils/constants';
import { Sort } from '@angular/material/sort';
import { NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
	AnimeRoutingQueryParams,
	IncomeValuesStatus,
	RoutingAnimeParamsMapper,
} from '@js-camp/angular/core/utils/anime-routing-params.mapper';
import { AnimeOrderingField } from '@js-camp/core/models/anime/anime-ordering';

import { AnimeType } from '@js-camp/core/models/anime/anime-type';
import { OrderingDirection } from '@js-camp/core/models/ordering-direction';
import { AnimeStatus } from '@js-camp/core/models/anime/anime-status';
import { stopLoadingStatus } from '@js-camp/angular/core/utils/loader-stopper';
import { startLoadingStatus } from '@js-camp/angular/core/utils/loader-starter';

import { AnimeService } from '../../../../core/services/anime.service';

type StatusedRoutingParams = IncomeValuesStatus & { params: AnimeRoutingQueryParams; };

/** Anime Component. */
@Component({
	selector: 'camp-anime-page',
	templateUrl: './animes-page.component.html',
	styleUrls: ['./animes-page.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimesPageComponent {
	/** Anime page. */
	protected readonly animePage$: Observable<AnimePagination>;

	/** Page sizes. */
	protected readonly pageSizes = RoutingAnimeParamsMapper.pageSizes;

	/** Status of anime loading. */
	protected readonly isLoading$ = new BehaviorSubject(false);

	/** Anime status. */
	protected readonly animeStatus = AnimeStatus;

	/** Anime type. */
	protected readonly animeType = AnimeType;

	private readonly router = inject(Router);

	private readonly animeService = inject(AnimeService);

	private readonly formBuilder = inject(NonNullableFormBuilder);

	private readonly activeRoute = inject(ActivatedRoute);

	/** Form values. */
	protected readonly form = this.formBuilder.group({
		search: [RoutingAnimeParamsMapper.defaultQueryParams.search],
		filters: [RoutingAnimeParamsMapper.defaultQueryParams.type],
	});

	/** Columns of table. */
	protected readonly displayedColumns: readonly string[] = [
		'image',
		'titleJapanese',
		'titleEnglish',
		'start aired',
		'type',
		'status',
	];

	/** Filters. */
	protected readonly filters: readonly AnimeType[] = [
		AnimeType.Tv,
		AnimeType.Ova,
		AnimeType.Movie,
		AnimeType.Special,
		AnimeType.Ona,
		AnimeType.Music,
		AnimeType.Unknown,
	];

	public constructor() {
		this.animePage$ = this.createAnimesStream();
	}

	/**
	 * Tracks anime.
	 * @param _index Index.
	 * @param anime Anime.
	 */
	protected trackByAnime(_index: number, anime: Anime): Anime['id'] {
		return anime.id;
	}

	/**
	 * Changes sort parameter.
	 * @param event Event of sort fields.
	 */
	protected changeSortParameter(event: Sort): void {
		const fieldState = RoutingAnimeParamsMapper.fieldToModel(event.active);
		const directionState = RoutingAnimeParamsMapper.directionToModel(event.direction);
		this.setQueryParams({
			direction: directionState.direction,
			field: directionState.direction === OrderingDirection.None ? AnimeOrderingField.None : fieldState.field,
		});
	}

	/**
	 * Sets next page and size.
	 * @param pageEvent Page event.
	 */
	protected setPageParameter(pageEvent: PageEvent): void {
		const currentParams = this.queryParams;
		this.setQueryParams({
			pageNumber: pageEvent.pageIndex ?? currentParams.pageNumber,
			pageSize: pageEvent.pageSize ?? currentParams.pageSize,
		});
	}

	/** Submit form action. Sets page and size parameters. */
	protected setPaginationParameters(): void {
		this.setQueryParams({
			search: this.form.value.search,
			type: this.form.value.filters,
			pageNumber: RoutingAnimeParamsMapper.defaultQueryParams.pageNumber,
		});
	}

	/**
	 * Navigates to details by anime id.
	 * @param anime Anime.
	 */
	protected navigateToDetails(anime: Anime): void {
		this.router.navigate(['animes/', anime.id]);
	}

	/** Current query params. */
	protected get queryParams(): AnimeRoutingQueryParams {
		const query = this.activeRoute.snapshot.queryParams;
		return {
			search: query['search'],
			type: query['type'],
			pageNumber: query['pageNumber'],
			pageSize: query['pageSize'],
			field: query['field'],
			direction: query['direction'],
		};
	}

	/**
	 * Sets query params.
	 * @param params Changed params.
	 */
	private setQueryParams(params: Partial<AnimeRoutingQueryParams>): void {
		const urlWithoutParams = this.router.url.split('?').at(0);
		this.router.navigate([urlWithoutParams], { queryParams: { ...this.queryParams, ...params } });
	}

	/** Stream of animes. */
	private createAnimesStream(): Observable<AnimePagination> {
		return this.activeRoute.queryParams.pipe(
			distinctUntilChanged(),
			map(query => this.mapQueryParamsToModel(query)),
			tap(({ isValid, params }) => {
				if (!isValid) {
					this.setQueryParams(params);
				}
				this.setFormValues(params);
			}),
			startLoadingStatus(this.isLoading$),
			debounceTime(DEBOUNCE_TIME),
			switchMap(({ params }) => this.getAnimePage(params)),
			stopLoadingStatus(this.isLoading$),
			tap(() => {
				window.scroll({ top: 0, behavior: 'smooth' });
			}),
		);
	}

	/**
	 * Converts queries to anime routing query parameters.
	 * @param query Qyery parameters.
	 */
	private mapQueryParamsToModel(query: Params): StatusedRoutingParams {
		const changedQueryParams = RoutingAnimeParamsMapper.toModel({
			search: query['search'],
			type: query['type'],
			pageNumber: query['pageNumber'],
			pageSize: query['pageSize'],
			field: query['field'],
			direction: query['direction'],
		});
		const { isValid: _, ...params } = changedQueryParams;
		return {
			params,
			isValid: changedQueryParams.isValid,
		};
	}

	/**
	 * Get anime page.
	 * @param params Anime routing query params.
	 */
	private getAnimePage(params: AnimeRoutingQueryParams): Observable<AnimePagination> {
		return this.animeService.getAnimes({
			pageSize: params.pageSize,
			pageNumber: params.pageNumber,
			ordering: {
				field: params.field,
				direction: params.direction,
			},
			search: params.search,
			typeIn: params.type,
		});
	}

	/**
	 * Fill out the form with params.
	 * @param params Anime routing query params.
	 */
	private setFormValues(params: AnimeRoutingQueryParams): void {
		this.form.patchValue({
			search: params.search,
			filters: params.type,
		});
	}
}
