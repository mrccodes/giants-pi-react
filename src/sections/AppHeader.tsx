import { Team } from 'mlb-api/teams';

import { STLComponent } from '../components';
import { useScreenDimensions } from '../hooks';
import { getTeamLogo } from '../utils';

interface AppHeaderProps {
  team: Team;
}

const AppHeader = ({ team }: AppHeaderProps) => {
  const logoData = getTeamLogo(team.id);
  const defaultLogoHeightWidth = 100;
  const { width } = useScreenDimensions();

  return (
    <section id="header" className="flex flex-col">
      {logoData ? (
        <STLComponent
          cameraOptions={logoData.camera}
          logoOptions={logoData.logo}
          height={defaultLogoHeightWidth}
          width={width}
          fileUrl={logoData.logo.logoPath}
          className="relative w-full mb-2"
        />
      ) : (
        <div className="m-6"></div>
      )}
      <div
        style={{ height: defaultLogoHeightWidth + 'px' }}
        className="inset-0 w-full text-center"
      >
        <h1
          style={{ top: '50%', transform: 'translateY(-50%)' }}
          className="inset-0 align-center text-slate-100 text-2xl"
        >
          {team.name}
        </h1>
      </div>
    </section>
  );
};

export default AppHeader;
