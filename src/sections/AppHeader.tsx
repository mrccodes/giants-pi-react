import { STLComponent } from '../components';
import { MLBTeam } from '../models';
import { useScreenDimensions } from '../hooks';

interface AppHeaderProps {
  team: MLBTeam;
}

const AppHeader = ({ team }: AppHeaderProps) => {
  const logoPath = team.logo.logoPath;
  const defaultLogoHeightWidth = 100;
  const { width } = useScreenDimensions();

  return (
    <section id="header" className="flex flex-col">
      {logoPath && (
        <STLComponent
          cameraOptions={team.camera}
          logoOptions={team.logo}
          height={defaultLogoHeightWidth}
          width={width}
          fileUrl={logoPath}
          className="relative w-full mb-2"
        />
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
