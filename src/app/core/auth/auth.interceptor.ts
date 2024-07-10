import {
	HttpHandlerFn,
	HttpInterceptorFn,
	HttpRequest,
} from '@angular/common/http';
import { finalize, retry, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (
	req: HttpRequest<unknown>,
	next: HttpHandlerFn
) => {
	const token = localStorage.getItem('token');
	console.log(token);

	let cloneReq = req.clone();

	if (token !== null) {
		cloneReq = req.clone({
			headers: req.headers.set('Authorization', 'Bearer ' + token),
		});
		return next(cloneReq);
	}
	return next(req).pipe(
		retry(3),
		catchError((error) => {
			return throwError(error);
		})
	);
};
