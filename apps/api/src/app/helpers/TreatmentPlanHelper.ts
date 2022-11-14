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
    video_url: record[19],
  };
}

export function getTasksFromTPDay(detail: UserTreatmentPlanDetailDefinedAttributes) {
  const tasks = [];

  // Update Strings
  if (detail.plyo_throw) {
    tasks.push(`Throw Plyo ball ${detail.plyo_throw} times.`);
  }
  if (detail.max_distance && detail.max_velocity_absolute && detail.num_throws_at_max_distance) {
    tasks.push(
      `Do ${detail.num_throws_at_max_distance} throws at ${detail.max_distance} feet with ${detail.max_velocity_absolute} velocity.`
    );
  }
  if (
    detail.post_max_distance_flat_ground &&
    detail.post_max_distance_flat_ground_velocity_absolute &&
    detail.post_max_flat_ground_pitches
  ) {
    if (detail.post_max_flat_ground_pitches === 'FB')
      tasks.push(
        `Throw Forkball at ${detail.post_max_distance_flat_ground} feet with ${detail.post_max_distance_flat_ground_velocity_absolute} velocity.`
      );
    else if (detail.post_max_flat_ground_pitches === 'CH')
      tasks.push(
        `Throw Changeup at ${detail.post_max_distance_flat_ground} feet with ${detail.post_max_distance_flat_ground_velocity_absolute} velocity.`
      );
    else
      tasks.push(
        `Throw any type of pitches at ${detail.post_max_distance_flat_ground} feet with ${detail.post_max_distance_flat_ground_velocity_absolute} velocity.`
      );
  }
  if (detail.bullpen && detail.bullpen_max_velocity_absolute && detail.bullpen_pitches) {
    if (detail.bullpen_pitches === 'FB')
      tasks.push(
        `Throw Forkball bullpen pitches ${detail.bullpen} times with ${detail.bullpen_max_velocity_absolute} velocity.`
      );
    else if (detail.bullpen_pitches === 'CH')
      tasks.push(
        `Throw Changeup bullpen pitches ${detail.bullpen} times with ${detail.bullpen_max_velocity_absolute} velocity.`
      );
    else
      tasks.push(
        `Throw any type of bullpen pitches ${detail.bullpen} times with ${detail.bullpen_max_velocity_absolute} velocity.`
      );
  }
  if (detail.live_simulated_game && detail.innings) {
    tasks.push(
      `Play ${detail.live_simulated_game} pitches per innings in live/simulated game. Play ${detail.innings} innings.`
    );
  }

  return tasks;
}
