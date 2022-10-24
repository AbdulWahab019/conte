import { Request, Response } from 'express';

import { sendResponse } from '../utils/appUtils';
import { doctorsList } from '../services/DoctorService';
import { SUCCESS } from '../utils/constants';

export async function getAllDoctors(req: Request, res: Response) {
  const resp = await doctorsList();

  return sendResponse(res, 200, SUCCESS, resp);
}
