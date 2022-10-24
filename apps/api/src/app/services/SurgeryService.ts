import { Surgery } from '../models/Surgery';

async function surgeryList(doctor_id: number) {
  const surgeries = await Surgery.findAll({ where: { doctor_id }, attributes: ['id', ['name', 'surgery_name']] });

  return surgeries;
}

export { surgeryList };
