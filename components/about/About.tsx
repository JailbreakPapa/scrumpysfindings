import DotPattern from '../ui/dot-pattern';
import { skills } from '@/constants/skills';
import SkillCard from './SkillCard';

const About = () => {
  return (
    <section className="relative flex items-center justify-center px-6 py-24">
      <div className="z-10">
        <div className="space-y-8 md:text-center">
          <h2 className="h2-bold">About me</h2>
          <p className="regular-paragraph mx-auto max-w-[835px]">
            Hi 👋, I&apos;m{' '}
            <span className="text-code text-yellow-600">Mikael Aboagye</span>, Im
            a passionate c++ software engineer with a knack for creating scalable,
            high-performance software and amazingly rendered graphics. With a strong
            foundation in <span className="text-green-700">Graphics Programming</span> and
            <span className="text-blue-600"> Consoles</span>, I
            have the experience, and the knowledge to deliver amazing worlds to people around the world.{' '}
            
          </p>
        </div>

        <div className="mt-16 flex flex-wrap gap-8 md:mt-24">
          {skills.map((skill) => {
            const Icon = skill.asset.icon;
            return (
              <SkillCard
                key={skill.id}
                gradientColor={skill.gradientColor}
                assetBackground={skill.asset.background}
                titleBackground={skill.title.background}
                titleLabel={skill.title.label}
                content={skill.content}
              >
                <Icon className="size-4" />
              </SkillCard>
            );
          })}
        </div>
      </div>

      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className="dot-pattern opacity-50"
      />
    </section>
  );
};

export default About;
