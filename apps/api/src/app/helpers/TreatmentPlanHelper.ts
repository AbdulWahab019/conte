import { TreatmentPlanDetailsFileAttributes } from '../models/TreatmentPlanDetail';
import { UserTreatmentPlanDetailDefinedAttributes } from '../models/UserTreatmentPlanDetail';

export function transformToTreatmentPlanDetails(record: string[]): TreatmentPlanDetailsFileAttributes {
  return {
    tp_day: Number(record[0]),
    tp_weekday: record[1],
    week_from_sx: Number(record[2]) || 0,
    month_from_sx: Number(record[3]) || 0,
    plyo_throw: Number(record[4]) || 0,
    max_distance: Number(record[5]) || 0,
    max_velocity_percent: Number(record[6].substring(0, record[6].indexOf('%'))) || 0,
    max_velocity_absolute: Number(record[7]) || 0,
    num_throws_at_max_distance: Number(record[8]) || 0,
    post_max_distance_flat_ground: Number(record[9]) || 0,
    post_max_distance_flat_ground_velocity_percent: Number(record[10].substring(0, record[10].indexOf('%'))) || 0,
    post_max_distance_flat_ground_velocity_absolute: Number(record[11]) || 0,
    post_max_flat_ground_pitches: record[12],
    bullpen: Number(record[13]) || 0,
    bullpen_max_velocity_percent: Number(record[14].substring(0, record[14].indexOf('%'))) || 0,
    bullpen_max_velocity_absolute: Number(record[15]) || 0,
    bullpen_pitches: record[16],
    live_simulated_game: Number(record[17]) || 0,
    innings: Number(record[18]) || 0,
  };
}

export function getTasksFromTPDay(detail: UserTreatmentPlanDetailDefinedAttributes) {
  const tasks = [];

  // Update Strings
  if (detail.plyo_throw) {
    tasks.push('plyo_throw');
  }
  if (detail.max_distance && detail.max_velocity_absolute && detail.num_throws_at_max_distance) {
    tasks.push('Throws At Max Distance');
  }
  if (
    detail.post_max_flat_ground_pitches &&
    detail.post_max_distance_flat_ground_velocity_absolute &&
    detail.post_max_flat_ground_pitches
  ) {
    tasks.push('Flat Ground Pitches');
  }
  if (detail.bullpen && detail.bullpen_max_velocity_absolute && detail.bullpen_pitches) {
    tasks.push('Bull Pen');
  }
  if (detail.live_simulated_game && detail.innings) {
    tasks.push('Line Simulated Game & Innings');
  }

  return tasks;
}
