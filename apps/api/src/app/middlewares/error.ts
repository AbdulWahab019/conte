import { APIError } from '../utils/apiError';
import { sendResponse } from '../utils/appUtils';

async function error(err: APIError, req: string, res: string, next: any) {
  sendResponse(res, err.code, err.message, undefined, err.error);
}

export { error };
