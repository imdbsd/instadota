import {OpenDotaAPI, apiCall} from '../../../helper/axiosConfig';

export const getMatchDetail = async (matchId: number) => {
  try {
    console.log(',asuk', matchId);
    const test = await apiCall('/matches/{match_id}', 'get', {
      path: {match_id: matchId},
    });
    console.log('win:" ', test);

    // console.log(res.status);

    return test;
  } catch (err) {
    console.error(err);
  }
};
