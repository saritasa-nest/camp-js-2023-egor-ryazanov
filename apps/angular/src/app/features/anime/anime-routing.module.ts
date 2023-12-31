import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authorizedGuard } from '@js-camp/angular/core/guards/authorized.guard';

import { BasePageComponent } from '../base-page/base-page.component';

import { AnimesPageComponent } from './animes-page/animes-page.component';
import { AnimeDetailsPageComponent } from './anime-details-page/anime-details-page.component';
import { AnimeCreatePageComponent } from './manage-anime/anime-create-page/anime-create-page.component';
import { AnimeEditPageComponent } from './manage-anime/anime-edit-page/anime-edit-page.component';

const routes: Routes = [
	{
		path: '',
		title: 'Animes',
		component: BasePageComponent,
		children: [
			{
				path: '',
				component: AnimesPageComponent,
			},
		],
	},
	{
		path: 'create',
		title: 'Create Anime',
		component: BasePageComponent,
		canActivate: [authorizedGuard],
		children: [
			{
				path: '',
				component: AnimeCreatePageComponent,
			},
		],
	},
	{
		path: ':id',
		title: 'Anime',
		component: BasePageComponent,
		canActivate: [authorizedGuard],
		children: [
			{
				path: '',
				component: AnimeDetailsPageComponent,
			},
			{
				path: 'edit',
				title: 'Edit anime',
				component: AnimeEditPageComponent,
			},
		],
	},
];

/** Anime routing module. */
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AnimeRoutingModule {}
