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

export function validateTreatmentPlanFile(keys: string[]) {
  const record = Object.keys(keys);

  if (!record[0].toLowerCase().includes('tp day')) throw new Error('Tp Day should be at column 1');
  if (!record[1].toLowerCase().includes('week day')) throw new Error('Week Day column not found');
  if (!record[2].toLowerCase().includes('week from sx')) throw new Error('Week from sx not found');
  if (!record[3].toLowerCase().includes('month from sx')) throw new Error('Month From Sx not found');
  if (!record[4].toLowerCase().includes('week of throwing')) throw new Error('Week of throwing not found');
  if (!record[5].toLowerCase().includes('month of throwing')) throw new Error('Month Of Throwing not found');
  if (!record[6].toLowerCase().includes('plyo throw')) throw new Error('Plyo throw not found');
  if (!record[7].toLowerCase().includes('max distance')) throw new Error('Max Distance (Feet) not found');
  if (!record[8].toLowerCase().includes('% max velocity')) throw new Error('& Max Velocity not found');
  if (!record[9].toLowerCase().includes('max velocity*')) throw new Error('Max Velocity (Absolute) not found');
  if (!record[10].toLowerCase().includes('number throws at max distance'))
    throw new Error('Number Throws at Max Distance ** not found');
  if (!record[11].toLowerCase().includes('post max dist flat ground 60'))
    throw new Error('Post Max Dist Flat Ground 60 not found');
  if (!record[12].toLowerCase().includes('post max distance flat ground % max velocity'))
    throw new Error('Post Max Distance Flat Ground % Max Velocity not found');
  if (!record[13].toLowerCase().includes('post max distance flat ground velocity'))
    throw new Error('Post Max Distance Flat Ground Velocity not found');
  if (!record[14].toLowerCase().includes('post max flat ground pitches'))
    throw new Error('Post Max Flat Ground Pitches not found');
  if (!record[15].toLowerCase().includes('bullpen')) throw new Error('Bullpen not found');
  if (!record[16].toLowerCase().includes('bullpen % max velocity')) throw new Error('Bullpen % Max Velocity not found');
  if (!record[17].toLowerCase().includes('bullpen max velocity')) throw new Error('Bullpen Max Velocity not found');
  if (!record[18].toLowerCase().includes('bullpen pitches')) throw new Error('Bullpen Pitches not found');
  if (!record[19].toLowerCase().includes('live/simulated game pitches'))
    throw new Error('Live/Simulated Game Pitches not found');
  if (!record[20].toLowerCase().includes('innings')) throw new Error('Innings not found');
  if (!record[21].toLowerCase().includes('video url')) throw new Error('Video Url not found');

  return true;
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
