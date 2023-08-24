import { string } from "@tensorflow/tfjs-node";

interface TeamLogo {
    filename: string;
    teamId: string;
} 

export const teamLogos: TeamLogo[] = [
    {
        teamId: '137',
        filename: 'sf.stl'
    }
]