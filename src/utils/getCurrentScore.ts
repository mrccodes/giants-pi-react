import { Game } from 'mlb-api'

import { GameScore, MLBTeam } from '../models';


const getCurrentScore = (game: Game, selectedTeam: MLBTeam): GameScore | null => {
    const selected = Object.values(game.teams).find(t => t.team.name === selectedTeam.name);
    const opposing = Object.values(game.teams).find(t => t.team.name !== selectedTeam.name);

    if (selected && opposing) {
        return {
            selected: {
                score: selected.score,
                teamId: selected.team.id,
                teamName: selected.team.name
            },
            opposing: {
                score: opposing.score,
                teamId: opposing.team.id,
                teamName: opposing.team.name
            }
        };
    }
    return null;
}


export default getCurrentScore