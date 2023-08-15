import { ChangeDetectionStrategy, Component, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { BehaviorSubject, debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedModule } from '../../shared.module';
import { DEBOUNCE_TIME } from '@js-camp/angular/core/utils/constants';
import { BaseFormControl } from '../base-form-control/base-form-control';
import { EventEmitter } from '@angular/core';
import { DefaultParams } from '@js-camp/core/models/default-params';

const defaultParams: DefaultParams = {
	name: '',
	pageNumber: 0,
	search: '',
};

@Component({
	selector: 'camp-custom-form-select',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatIconModule,
		MatAutocompleteModule,
		MatChipsModule,
		InfiniteScrollModule,
		SharedModule,
	],
	templateUrl: './custom-form-select.component.html',
	styleUrls: ['./custom-form-select.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{ provide: MatFormFieldControl, useExisting: CustomFormSelectComponent }],
})
export class CustomFormSelectComponent<T extends object> extends BaseFormControl<T[]> implements OnInit {
	private readonly formBuilder = inject(NonNullableFormBuilder);

	protected separatorKeysCodes: number[] = [ENTER, COMMA];

	protected readonly params$ = new BehaviorSubject<DefaultParams>(defaultParams);

	public override innerControl: FormControl = this.formBuilder.control(defaultParams.search);

	public override id = `custom-input-${CustomFormSelectComponent.nextId++}`;

	protected filteredItems = new BehaviorSubject<readonly T[]>([]);

	@Output()
	public getAddedItem = new EventEmitter<DefaultParams>();

	@Input({ required: true })
	public set addedItem(newValueItem: T | null) {
		if (newValueItem != null) {
			this.value = this.value?.concat(newValueItem) ?? [newValueItem];
			this.innerControl.setValue('');
		}
	}

	@Output()
	public getItems = new EventEmitter<DefaultParams>();

	private _items: T[] = [];

	@Input({ required: true })
	public get items(): T[] {
		return this._items;
	}

	public set items(newItems: readonly T[] | null) {
		if (newItems != null && newItems.length > 0) {
			this._items = [...this.items, ...newItems];
		} else if (newItems != null && newItems.length === 0) {
			this._items = [];
		}
		this.filteredItems.next(this._items);
	}

	public ngOnInit(): void {
		this.params$
			.pipe(
				debounceTime(DEBOUNCE_TIME),
				distinctUntilChanged(),
				tap((params) => {
					this.getItems.emit(params);
				})
			)
			.subscribe();

		this.innerControl.valueChanges
			.pipe(
				debounceTime(DEBOUNCE_TIME),
				distinctUntilChanged(),
				tap((search) => {
					this.items = [];
					this.params$.next({
						search,
						pageNumber: defaultParams.pageNumber,
						name: defaultParams.name,
					});
				})
			)
			.subscribe();
	}

	protected onScroll(params: DefaultParams) {
		this.params$.next({ ...params, pageNumber: params.pageNumber + 1 });
	}

	protected add(event: MatChipInputEvent): void {
		const value = event.value;

		if (value == null) {
			return;
		}

		this.getAddedItem.emit({ name: value, pageNumber: defaultParams.pageNumber });
	}

	protected remove(element: T): void {
		const index = this.value?.indexOf(element);

		if (index == null) {
			return;
		}

		if (index >= 0) {
			this.value?.splice(index, 1);
		}

		if (this.value?.length === 0) {
			this.value = null;
		}
	}

	protected selected(element: T): void {
		if (!this.value) {
			this.value = [];
		}

		if (this.value?.indexOf(element) === -1) {
			this.value = this.value.concat(element);
			this.innerControl.setValue('');
		}
	}
}
