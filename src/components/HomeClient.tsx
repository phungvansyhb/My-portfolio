"use client";

import React, { useState } from "react";
import { BentoHero } from "./BentoHero";
import { ProjectsBento } from "./ProjectsBento";
import { StackExperienceBento } from "./StackExperienceBento";
import { ContactBento } from "./ContactBento";

export function HomeClient() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [highlightedSlugs, setHighlightedSlugs] = useState<string[] | null>(null);

  const handleSelectSkill = (name: string | null, slugs: string[] | null) => {
    setActiveSkill(name);
    setHighlightedSlugs(slugs);
  };

  return (
    <main className="page-shell">
      <BentoHero />
      <ProjectsBento highlightedSlugs={highlightedSlugs} />
      <StackExperienceBento
        activeSkill={activeSkill}
        onSelectSkill={handleSelectSkill}
      />
      <ContactBento />
    </main>
  );
}
