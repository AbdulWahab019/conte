import moment = require('moment');
import { TreatmentPlanDetailsFileAttributes } from '../models/TreatmentPlanDetail';
import { UserTreatmentPlanDetailDefinedAttributes } from '../models/UserTreatmentPlanDetail';

export function transformToTreatmentPlanDetails(record: string[]): TreatmentPlanDetailsFileAttributes {
  return {
    tp_day: Number(record[0]),
    tp_weekday: record[1],
    week_from_sx: Number(record[2]) || 0,
    month_from_sx: Number(record[3]) || 0,
    week_of_throwing: Number(record[4]) || 0,
    month_of_throwing: Number(record[5]) || 0,
    plyo_throw: Number(record[6]) || 0,
    max_distance: Number(record[7]) || 0,
    max_velocity_percent: Number(record[8].substring(0, record[8].indexOf('%'))) || 0,
    max_velocity_absolute: Number(record[9]) || 0,
    num_throws_at_max_distance: Number(record[10]) || 0,
    post_max_distance_flat_ground: Number(record[11]) || 0,
    post_max_distance_flat_ground_velocity_percent: Number(record[12].substring(0, record[12].indexOf('%'))) || 0,
    post_max_distance_flat_ground_velocity_absolute: Number(record[13]) || 0,
    post_max_flat_ground_pitches: record[14],
    bullpen: Number(record[15]) || 0,
    bullpen_max_velocity_percent: Number(record[16].substring(0, record[16].indexOf('%'))) || 0,
    bullpen_max_velocity_absolute: Number(record[17]) || 0,
    bullpen_pitches: record[18],
    live_simulated_game: Number(record[19]) || 0,
    innings: Number(record[20]) || 0,
    video_url: record[21],
  };
}

export function getTasksFromTPDay(detail: UserTreatmentPlanDetailDefinedAttributes) {
  const tasks = [];

  // Update Strings
  if (detail.plyo_throw) {
    tasks.push({ type: 1, title: `Throw Plyo ball ${detail.plyo_throw} times.` });
  }
  if (detail.max_distance && detail.max_velocity_absolute && detail.num_throws_at_max_distance) {
    tasks.push({
      type: 2,
      title: `Do ${detail.num_throws_at_max_distance} throws at ${detail.max_distance} feet with ${detail.max_velocity_absolute} velocity.`,
    });
  }
  if (
    detail.post_max_distance_flat_ground &&
    detail.post_max_distance_flat_ground_velocity_absolute &&
    detail.post_max_flat_ground_pitches
  ) {
    if (detail.post_max_flat_ground_pitches === 'FB')
      tasks.push({
        type: 3,
        title: `Throw Forkball at ${detail.post_max_distance_flat_ground} feet with ${detail.post_max_distance_flat_ground_velocity_absolute} velocity.`,
      });
    else if (detail.post_max_flat_ground_pitches === 'CH')
      tasks.push({
        type: 3,
        title: `Throw Changeup at ${detail.post_max_distance_flat_ground} feet with ${detail.post_max_distance_flat_ground_velocity_absolute} velocity.`,
      });
    else
      tasks.push({
        type: 3,
        title: `Throw any type of pitches at ${detail.post_max_distance_flat_ground} feet with ${detail.post_max_distance_flat_ground_velocity_absolute} velocity.`,
      });
  }
  if (detail.bullpen && detail.bullpen_max_velocity_absolute && detail.bullpen_pitches) {
    if (detail.bullpen_pitches === 'FB')
      tasks.push({
        type: 4,
        title: `Throw Forkball bullpen pitches ${detail.bullpen} times with ${detail.bullpen_max_velocity_absolute} velocity.`,
      });
    else if (detail.bullpen_pitches === 'CH')
      tasks.push({
        type: 4,
        title: `Throw Changeup bullpen pitches ${detail.bullpen} times with ${detail.bullpen_max_velocity_absolute} velocity.`,
      });
    else
      tasks.push({
        type: 4,
        title: `Throw any type of bullpen pitches ${detail.bullpen} times with ${detail.bullpen_max_velocity_absolute} velocity.`,
      });
  }
  if (detail.live_simulated_game && detail.innings) {
    tasks.push({
      type: 5,
      title: `Play ${detail.live_simulated_game} pitches per innings in live/simulated game. Play ${detail.innings} innings.`,
    });
  }

  return tasks;
}

export function getUserTreatmentPlanDayByDate(date: string | Date, treatmentPlanDate: string) {
  const formattedDate = moment(date).format('YYYY-MM-DD');
  const formattedTpDate = moment(treatmentPlanDate).format('YYYY-MM-DD');

  const tp_day = moment(formattedDate).diff(moment(formattedTpDate), 'days') + 1;
  return { tp_day, formattedDate, formattedTpDate };
}
