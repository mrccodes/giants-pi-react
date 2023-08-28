import { STLComponent } from '../../components';
import { MLBTeam } from '../../models';

interface TopSectionProps {
  team: MLBTeam;
}

export const TopSection = ({ team }: TopSectionProps) => {
  const logoPath = team.logo.logoPath;
  const defaultLogoHeightWidth = 100;

  return (
    <section id="header" className="flex flex-col">
      {logoPath && (
        <STLComponent
          cameraOptions={team.camera}
          logoOptions={team.logo}
          height={defaultLogoHeightWidth}
          width={window.innerWidth}
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
