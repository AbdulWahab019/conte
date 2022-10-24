import { Request, Response } from 'express';

import { sendResponse } from '../utils/appUtils';
import { getDoctors } from '../services/DoctorService';
import { SUCCESS } from '../utils/constants';

export async function getAllDoctors(req: Request, res: Response) {
  const doctors = await getDoctors();

  return sendResponse(res, 200, SUCCESS, doctors);
}
