import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { UserService } from '../services/user.service';

export const authorizedGuard: CanActivateFn = () => {
	const userService = inject(UserService);
	const router = inject(Router);

	return userService.isAuthorized$.pipe(map((isAuthorized) => (isAuthorized ? isAuthorized : router.parseUrl('/'))));
};