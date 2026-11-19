import type { Chapter } from "@/lib/content";
import { groupSkills } from "@/lib/format";

interface Skill {
  id: string;
  name: string;
  category: string;
}

interface SkillsProps {
  chapter: Chapter;
  skills: Skill[];
}

/** Practice: each discipline reads as a sentence, not a cloud of pills. */
export default function Skills({ chapter, skills }: SkillsProps) {
  const groups = groupSkills(skills);

  return (
    <section
      id={chapter.id}
      aria-labelledby={`${chapter.id}-title`}
      className="wrap pb-24 md:pb-36"
    >
      <div className="folio gap-y-8 border-t border-rule pt-7">
        <h2 id={`${chapter.id}-title`} className="folio-label sc text-muted">
          {chapter.numeral} — {chapter.label}
        </h2>
        <div className="folio-wide grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {groups.map((group) => (
            <div key={group.category} className="rise">
              <h3 className="sc mb-2.5 text-muted">{group.category}</h3>
              <p className="text-[21px] leading-[1.45] md:text-[23px]">
                {group.items.map((skill) => skill.name).join(", ")}.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
