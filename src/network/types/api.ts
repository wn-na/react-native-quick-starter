/* eslint-disable @typescript-eslint/ban-types */

/**
 * @description change this interface for your api format
 */
export interface ApiMap {
	GET: {
		"api/health_check": {
			payload: {
				detail: boolean;
			};
			response: {
				health: {
					server: boolean;
					database: boolean;
				};
			};
		};
	};
	POST: {};
	DELETE: {};
	PUT: {};
	PATCH: {};
}
