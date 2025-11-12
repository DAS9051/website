'use client';

import { useEffect, useState } from "react";

import { commands, sectionDescriptors } from "@/data/commands";
import type { CommandDefinition } from "@/data/commands";
import { resume } from "@/data/resume";
import type {
  Certification,
  ContactLink,
  ExperienceEntry,
  ProjectEntry,
  SkillCategory
} from "@/data/resume";
import { Terminal } from "@/components/terminal/Terminal";
import type { TerminalMode } from "@/components/terminal/types";

const onboardingStorageKey = "dylan-terminal-onboarding";

const formatRange = (range: { start: string; end: string; label?: string }) =>
  range.label ?? `${range.start} – ${range.end}`;

const renderSectionContent = (sectionId: string) => {
  switch (sectionId) {
    case "about":
      return (
        <div className="space-y-3 text-sm leading-relaxed text-foreground/75">
          {resume.about.paragraphs.map((paragraph: string) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="text-foreground/60">{resume.meta.availability}</p>
        </div>
      );
    case "experience":
      return (
        <ul className="space-y-6">
          {resume.experience.map((role: ExperienceEntry) => (
            <li
              key={role.id}
              className="rounded-2xl border border-white/5 bg-background/60 p-5 shadow-inner shadow-black/10"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <p className="text-base font-semibold text-foreground">
                    {role.title} · {role.organization}
                  </p>
                  <p className="text-xs uppercase tracking-[0.3em] text-accent-primary/70">{role.location}</p>
                </div>
                <span className="text-xs text-foreground/60">{formatRange(role.range)}</span>
              </div>
              <p className="mt-3 text-sm text-foreground/75">{role.summary}</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-foreground/70">
                {role.achievements.map((achievement: string, index: number) => (
                  <li key={`${role.id}-achievement-${index}`}>{achievement}</li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {role.tags.map((tag: string) => (
                  <span
                    key={`${role.id}-tag-${tag}`}
                    className="rounded-full border border-accent-primary/30 px-3 py-1 text-xs uppercase tracking-[0.2em] text-accent-primary/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      );
    case "projects":
      return (
        <div className="grid gap-5">
          {resume.projects.map((project: ProjectEntry) => (
            <article
              key={project.id}
              className="rounded-2xl border border-white/5 bg-background/60 p-5 shadow-inner shadow-black/10"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <h4 className="text-lg font-semibold text-foreground">{project.name}</h4>
                <span className="text-xs text-foreground/55">{project.timeframe}</span>
              </div>
              <div className="mt-3 space-y-2 text-sm text-foreground/75">
                <p className="text-foreground/65">
                  <strong className="text-foreground">Problem:</strong> {project.problem}
                </p>
                <p>
                  <strong className="text-foreground">Solution:</strong> {project.solution}
                </p>
                <p className="text-foreground/70">
                  <strong className="text-foreground">Impact:</strong> {project.impact}
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((tech: string) => (
                  <span
                    key={`${project.id}-tech-${tech}`}
                    className="rounded-full border border-accent-primary/25 px-3 py-1 text-xs text-accent-primary/85"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      );
    case "education":
      return (
        <div className="space-y-3 text-sm leading-relaxed text-foreground/75">
          <p className="text-base font-semibold text-foreground">{resume.education.degree}</p>
          <p className="text-xs uppercase tracking-[0.3em] text-accent-primary/70">
            {resume.education.institution} · {resume.education.location}
          </p>
          <p className="text-xs text-foreground/60">{resume.education.range.label}</p>
          <ul className="list-disc space-y-2 pl-5">
            {resume.education.highlights.map((highlight: string) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>
      );
    case "certifications":
      return (
        <ul className="space-y-3 text-sm text-foreground/75">
          {resume.certifications.map((cert: Certification) => (
            <li key={cert.id} className="rounded-2xl border border-white/5 bg-background/60 p-5">
              <p className="text-base font-semibold text-foreground">{cert.name}</p>
              <p className="text-xs uppercase tracking-[0.3em] text-accent-primary/70">
                {cert.issuer} · {cert.issued}
              </p>
              {cert.credentialId ? (
                <p className="mt-2 text-xs text-foreground/60">Credential ID: {cert.credentialId}</p>
              ) : null}
            </li>
          ))}
        </ul>
      );
    case "skills":
      return (
        <div className="grid gap-4 md:grid-cols-2">
          {resume.skills.map((group: SkillCategory) => (
            <div key={group.label} className="rounded-2xl border border-white/5 bg-background/60 p-5">
              <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-accent-primary">
                {group.label}
              </h4>
              <ul className="mt-3 space-y-1 text-sm text-foreground/75">
                {group.items.map((item: string) => (
                  <li key={`${group.label}-${item}`}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    case "contact":
      return (
        <div className="space-y-4 text-sm text-foreground/75">
          <div className="grid gap-2 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-accent-primary/70">Email</p>
              <a className="text-foreground hover:text-accent-primary" href={`mailto:${resume.contact.email}`}>
                {resume.contact.email}
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-accent-primary/70">Phone</p>
              <a
                className="text-foreground hover:text-accent-primary"
                href={`tel:${resume.contact.phone.replace(/[\s-]/g, "")}`}
              >
                {resume.contact.phone}
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-accent-primary/70">Location</p>
              <p>{resume.contact.location}</p>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent-primary/70">Links</p>
            <ul className="mt-2 flex flex-wrap gap-3">
              {resume.contact.links.map((link: ContactLink) => (
                <li key={link.href}>
                  <a
                    className="rounded-full border border-accent-primary/25 px-3 py-1 text-xs text-accent-primary/85 transition hover:border-accent-primary hover:bg-accent-primary/10"
                    href={link.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    default:
      return (
        <p className="text-sm text-foreground/60">
          Detailed content for this section will be implemented in subsequent phases.
        </p>
      );
  }
};

export default function Home() {
  const [terminalMode, setTerminalMode] = useState<TerminalMode>("hybrid");
  const [activeSectionId, setActiveSectionId] = useState<string>("about");
  const [showOnboarding, setShowOnboarding] = useState<boolean>(true);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(onboardingStorageKey);
    if (stored === "dismissed") {
      setShowOnboarding(false);
    }
  }, []);

  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState(false);
  const showScrollLayout = terminalMode === "hybrid";

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (!showOnboarding) {
      window.localStorage.setItem(onboardingStorageKey, "dismissed");
    }
  }, [showOnboarding]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = (event: KeyboardEvent) => {
      if (event.shiftKey && (event.key === "?" || event.key === "/")) {
        event.preventDefault();
        setIsCheatSheetOpen((prev) => !prev);
      }
      if (event.key === "Escape") {
        setIsCheatSheetOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleSectionFocus = (sectionId: string) => {
    if (!sectionId) return;
    if (sectionId !== "scroll-start") {
      setActiveSectionId(sectionId);
    }
    const element = document.getElementById(sectionId);
    if (element instanceof HTMLElement) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      element.focus({ preventScroll: true });
    }
  };

  const handleCommandResolved = (_command: string, definition?: CommandDefinition) => {
    if (definition?.relatedSectionId && definition.relatedSectionId !== "scroll-start") {
      setActiveSectionId(definition.relatedSectionId);
    }
  };

  const buildSectionClasses = (sectionId: string) => {
    const base =
      "group rounded-3xl border bg-foreground/5 p-6 shadow-lg shadow-black/20 backdrop-blur-sm transition sm:p-8";
    const active = "border-accent-primary/60 ring-2 ring-accent-primary/30 bg-foreground/10";
    const inactive = "border-accent-primary/10 hover:border-accent-primary/30 hover:bg-foreground/10";
    return `${base} ${activeSectionId === sectionId ? active : inactive}`;
  };

  const dismissOnboarding = () => setShowOnboarding(false);

  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-12 px-6 pb-24 pt-16 sm:px-10 lg:px-16">
      <section aria-labelledby="terminal-heading" className="relative min-h-screen space-y-6">
        {showOnboarding ? (
          <div className="rounded-3xl border border-accent-primary/20 bg-background/80 p-6 text-sm text-foreground/80 shadow-lg shadow-black/30 backdrop-blur">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.4em] text-accent-primary/80">New here?</p>
                <p>
                  Use the command prompt below to explore the résumé (`help` lists everything), or scroll to read each
                  section. Keyboard shortcuts like `Tab` and `Shift+/` keep navigation fast, and the scrollable layout
                  stays in sync.
                </p>
              </div>
              <button
                className="rounded-full border border-accent-primary/40 px-4 py-2 text-xs uppercase tracking-[0.3em] text-accent-primary transition hover:border-accent-primary hover:bg-accent-primary/10"
                onClick={dismissOnboarding}
                type="button"
              >
                Got it
              </button>
            </div>
          </div>
        ) : null}
        <div className="terminal-frame terminal-mode-transition flex h-full flex-col overflow-hidden">
          <div className="window-bar">
            <span className="window-dot red" aria-hidden />
            <span className="window-dot yellow" aria-hidden />
            <span className="window-dot green" aria-hidden />
            <span className="ml-4 text-xs uppercase tracking-[0.3em] text-foreground/60">
              dylan@shell — portfolio
            </span>
          </div>

          <div className="flex flex-1 flex-col gap-6 px-6 pb-8 pt-6 sm:px-8 sm:pt-8">
            <div className="space-y-4">
              <h1
                className="text-lg font-semibold tracking-tight text-accent-primary sm:text-xl"
                id="terminal-heading"
              >
                dylan@shell:~$ welcome
              </h1>
              <div className="space-y-3 text-sm leading-relaxed text-foreground/80 sm:text-base">
                <p>
                  Hi, I&apos;m Dylan Sahota — an infrastructure architect and machine learning developer building
                  resilient automation at scale. This portfolio behaves like a UNIX terminal: type a command, hit
                  enter, and explore.
                </p>
                <p>
                  Prefer to browse visually? Use the command chips below or scroll for a clean, accessible résumé
                  layout. Screen reader users can skip directly to main content with the next heading.
                </p>
              </div>
            </div>
            <div className="terminal-mode-transition rounded-2xl border border-accent-primary/20 bg-background/60 px-4 py-3 text-xs text-foreground/70 shadow-inner shadow-black/40">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span>
                  Mode:{" "}
                  <span className="font-semibold text-accent-primary">
                    {terminalMode === "hybrid" ? "Hybrid (terminal + scroll)" : "Terminal-only"}
                  </span>
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    className="rounded-full border border-accent-primary/40 px-3 py-1 text-xs text-accent-primary transition hover:border-accent-primary hover:bg-accent-primary/10"
                    onClick={() => setShowOnboarding(true)}
                    type="button"
                  >
                    Show tips
                  </button>
                  <button
                    className="rounded-full border border-accent-primary/40 px-3 py-1 text-xs text-accent-primary transition hover:border-accent-primary hover:bg-accent-primary/10"
                    onClick={() => setIsCheatSheetOpen(true)}
                    type="button"
                  >
                    Commands (Shift+/)
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-1 flex-col">
              <Terminal
                className="flex-1"
                onCommandResolved={handleCommandResolved}
                onModeChange={setTerminalMode}
                onScrollToSection={handleSectionFocus}
              />
            </div>
          </div>
        </div>
      </section>

      {showScrollLayout ? (
        <section aria-labelledby="resume-sections-heading" className="space-y-10" id="scroll-start">
          <header className="space-y-3">
            <h2 className="text-sm uppercase tracking-[0.4em] text-accent-primary" id="resume-sections-heading">
              Scrollable Résumé
            </h2>
            <p className="max-w-2xl text-sm text-foreground/70">
              Every command has a matching section below. Executing a command will focus the related card here, so the
              terminal and résumé stay in sync.
            </p>
          </header>

          <div className="grid gap-8">
            {sectionDescriptors.map((section) => {
              const isActive = activeSectionId === section.id;

              return (
                <article
                  key={section.id}
                  aria-current={isActive ? "true" : undefined}
                  aria-labelledby={`${section.id}-heading`}
                  className={buildSectionClasses(section.id)}
                  id={section.id}
                  onFocus={() => setActiveSectionId(section.id)}
                  tabIndex={-1}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-xl font-semibold tracking-tight text-foreground" id={`${section.id}-heading`}>
                      {section.title}
                    </h3>
                    <span className="text-xs uppercase tracking-[0.3em] text-accent-primary/80">
                      Command: {section.command}
                    </span>
                  </div>
                  <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground/75">{section.summary}</p>
                  <div className="mt-6 rounded-2xl border border-white/5 bg-background/50 p-5 text-sm text-foreground/70">
                    {renderSectionContent(section.id)}
                  </div>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-foreground/60">
                    <span>
                      {isActive ? "Active section" : "Scroll or run the command to focus this section."}
                    </span>
                    <button
                      className="rounded-full border border-accent-primary/25 px-3 py-1 text-xs text-accent-primary transition hover:border-accent-primary hover:bg-accent-primary/10"
                      onClick={() => handleSectionFocus(section.id)}
                      type="button"
                    >
                      Focus section
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ) : (
        <section aria-hidden="true" className="terminal-mode-transition space-y-6 text-center text-sm text-foreground/60">
          <div className="rounded-3xl border border-accent-primary/15 bg-background/70 p-10 shadow-lg shadow-black/20">
            <p className="text-base text-foreground/80">Terminal-only mode enabled.</p>
            <p className="mt-2">
              Run <code className="rounded bg-foreground/10 px-2 py-1 text-foreground/80">toggle</code> or click the
              button below to reopen the scrollable résumé view.
            </p>
            <button
              className="mt-6 rounded-full border border-accent-primary/25 px-4 py-2 text-xs uppercase tracking-[0.3em] text-accent-primary transition hover:border-accent-primary hover:bg-accent-primary/10"
              onClick={() => setTerminalMode("hybrid")}
              type="button"
            >
              Return to hybrid view
            </button>
          </div>
        </section>
      )}

      <footer className="border-t border-accent-primary/10 pt-8 text-xs text-foreground/60">
        <p>
          Designed with a terminal twist for accessibility and discovery. Upcoming phases will connect interactive
          commands, structured résumé data, and animations.
        </p>
      </footer>
      {isCheatSheetOpen ? (
        <div
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 px-4 py-12 backdrop-blur"
          role="dialog"
        >
          <div className="max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-accent-primary/20 bg-background/95 p-6 shadow-2xl shadow-black/50">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-accent-primary">Command Cheat Sheet</h2>
              <button
                className="rounded-full border border-accent-primary/40 px-3 py-1 text-xs uppercase tracking-[0.3em] text-accent-primary transition hover:border-accent-primary hover:bg-accent-primary/10"
                onClick={() => setIsCheatSheetOpen(false)}
                type="button"
              >
                Close
              </button>
            </div>
            <p className="mt-2 text-sm text-foreground/70">
              Press <kbd className="rounded border border-white/10 bg-background/60 px-2 py-1 text-foreground/70">Shift</kbd>
              <span className="mx-1 text-foreground/50">+</span>
              <kbd className="rounded border border-white/10 bg-background/60 px-2 py-1 text-foreground/70">/</kbd> to toggle this
              overlay from anywhere.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {commands.map((command) => (
                <div
                  key={command.name}
                  className="rounded-2xl border border-accent-primary/20 bg-background/60 p-4 text-sm text-foreground/75 shadow-inner shadow-black/30"
                >
                  <p className="font-semibold text-foreground">{command.name}</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-accent-primary/70">{command.category}</p>
                  <p className="mt-2 text-foreground/70">{command.description}</p>
                  {command.aliases?.length ? (
                    <p className="mt-2 text-xs text-foreground/50">Aliases: {command.aliases.join(", ")}</p>
                  ) : null}
                  {command.relatedSectionId ? (
                    <p className="mt-2 text-xs text-foreground/50">Links section: {command.relatedSectionId}</p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}

