import {OpenDotaAPI, apiCall} from '../../../helper/axiosConfig';

export const getMatchDetail = async (matchId: number) => {
  try {
    const match = await apiCall('/matches/{match_id}', 'get', {
      path: {match_id: matchId},
    });

    return match;
  } catch (err) {
    console.error(err);
  }
};

export const getPlayerInMatch = async (matchId: number, playerId: number) => {
  try {
    const match = await getMatchDetail(matchId);
    const player = match?.players?.find(
      (player) => player.account_id === playerId
    );
    return player;
  } catch (err) {
    console.error(err);
  }
};
