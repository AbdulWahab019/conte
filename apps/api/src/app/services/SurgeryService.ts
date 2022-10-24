import { Surgery } from '../models/Surgery';

export async function getSurgeriesByDoctor(doctor_id: number) {
  return await Surgery.findAll({ where: { doctor_id }, attributes: ['id', 'name'] });
}
