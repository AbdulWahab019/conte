import { Request, Response } from 'express';

import { sendResponse } from '../utils/appUtils';
import { getSurgeriesByDoctor } from '../services/SurgeryService';
import { SUCCESS } from '../utils/constants';

export async function getAllSurgeriesByDoctor(req: Request, res: Response) {
  const { doctor_id } = req.params;

  const surgeries = await getSurgeriesByDoctor(Number(doctor_id));
  return sendResponse(res, 200, SUCCESS, surgeries);
}
