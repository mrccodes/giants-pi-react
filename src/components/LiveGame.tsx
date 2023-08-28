import { Game } from 'mlb-api'
import { useState } from 'react'

import { findOpposingTeam } from '../utils'
import { GameScore, MLBTeam } from '../models'
import getCurrentScore from '../utils/getCurrentScore';
import abbreviateTeam from '../utils/abbreviateTeam';

interface LiveGameProps extends React.HTMLProps<HTMLDivElement> {
    game: Game;
    team: MLBTeam;
}

const LiveGame = ({ game, team, ...rest }: LiveGameProps) => {
    const [opposingTeamName] = useState<string | undefined>(findOpposingTeam(game, team)?.team.name)
    const [currentScore] = useState<GameScore | null>(getCurrentScore(game, team))

    return  <div {...rest}>
                <div className="w-full text-center">
                    {getText(opposingTeamName)}
                </div>
                { currentScore &&
                    <div className='grid-col-1'>
                        <span className="flex mx-auto justify-evenly px-8 max-w-xs text-sm">
                            <p>{abbreviateTeam(currentScore.selected.teamName)}</p>
                            <p>{abbreviateTeam(currentScore.opposing.teamName)}</p>
                        </span>
                        <span className="flex justify-center text-3xl">
                            {currentScore.selected.score}&nbsp;-&nbsp;{currentScore.opposing.score}
                        </span>
                    </div>
                }
            </div> 
}

export default LiveGame

const getText = (teamName: string | undefined): React.ReactNode => teamName ?
        <>
            <p>Currently facing the ${teamName}</p> 
            <p className="text-green-500">Live now!</p>
        </> :
        'Game is live now!'
