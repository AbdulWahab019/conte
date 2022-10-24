import { Request, Response } from 'express';

import { sendResponse } from '../utils/appUtils';
import { surgeryList } from '../services/SurgeryService';
import { SUCCESS } from '../utils/constants';

export async function getSurgeriesForDoctor(req: Request, res: Response) {
  const { doctor_id } = req.params;

  const resp = await surgeryList(Number(doctor_id));

  return sendResponse(res, 200, SUCCESS, resp);
}
