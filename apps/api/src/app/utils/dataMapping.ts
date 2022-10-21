import { TreatmentPlanDetailsFileAttributes } from '../models/TreatmentPlanDetail';

export function transformToTreatmentPlanDetails(record: string[]): TreatmentPlanDetailsFileAttributes {
  return {
    tp_day: Number(record[0]),
    tp_weekday: record[1],
    week_from_sx: Number(record[2]),
    month_from_sx: Number(record[3]),
    plyo_throw: Number(record[4]),
    max_distance: Number(record[5]),
    max_velocity_percent: Number(record[6].substring(0, record[6].indexOf('%'))),
    max_velocity_absolute: Number(record[7]),
    num_throws_at_max_distance: Number(record[8]),
    post_max_distance_flat_ground: Number(record[9]),
    post_max_distance_flat_ground_velocity: Number(record[10]),
    post_max_flat_ground_pitches: record[11],
    bullpen: Number(record[12]),
    bullpen_max_velocity: Number(record[13]),
    bullpen_pitches: record[14],
    live_simulated_game: Number(record[15]),
    innings: Number(record[16]),
  };
}
