'use client';

import { Fragment, useEffect, useRef } from "react";

import { commands, type CommandDefinition } from "@/data/commands";
import { resume } from "@/data/resume";

import type { TerminalCommandResult } from "./types";

const formatRange = (range: { start: string; end: string; label?: string }) => range.label ?? `${range.start} – ${range.end}`;

function renderOutputNode(command: CommandDefinition, commandString: string): TerminalCommandResult | null {
  switch (command.name) {
    case "help":
      return {
        id: `result-${Date.now()}`,
        command: commandString,
        renderedAt: Date.now(),
        node: (
          <div className="space-y-4 text-sm text-foreground/75">
            <p className="text-foreground/60">
              Available commands. Use `Tab` to autocomplete, `↑` / `↓` for history, and `clear` to reset.
            </p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {commands.map((item) => (
                <li key={item.name} className="rounded-2xl border border-white/5 bg-background/60 p-4">
                  <p className="font-semibold text-foreground">
                    {item.name}
                    {item.aliases ? (
                      <span className="text-foreground/50"> ({item.aliases.join(", ")})</span>
                    ) : null}
                  </p>
                  <p className="text-xs uppercase tracking-[0.3em] text-accent-primary/70">{item.category}</p>
                  <p className="mt-2 text-sm text-foreground/65">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )
      };
    case "about":
      return {
        id: `result-${Date.now()}`,
        command: commandString,
        renderedAt: Date.now(),
        node: (
          <div className="space-y-3 text-sm text-foreground/75">
            {resume.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className="text-xs text-foreground/50">Availability: {resume.meta.availability}</p>
          </div>
        )
      };
    case "experience":
      return {
        id: `result-${Date.now()}`,
        command: commandString,
        renderedAt: Date.now(),
        node: (
          <div className="space-y-4 text-sm text-foreground/75">
            {resume.experience.map((role) => (
              <div key={role.id} className="rounded-2xl border border-white/5 bg-background/60 p-4 shadow-inner shadow-black/10">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <p className="text-base font-semibold text-foreground">
                    {role.title} · {role.organization}
                  </p>
                  <span className="text-xs text-foreground/60">{formatRange(role.range)}</span>
                </div>
                <p className="text-xs uppercase tracking-[0.3em] text-accent-primary/70">{role.location}</p>
                <p className="mt-3 text-sm text-foreground/70">{role.summary}</p>
                <ul className="mt-3 list-disc space-y-1 pl-5">
                  {role.achievements.map((achievement, index) => (
                    <li key={`${role.id}-achievement-${index}`}>{achievement}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )
      };
    case "projects":
      return {
        id: `result-${Date.now()}`,
        command: commandString,
        renderedAt: Date.now(),
        node: (
          <div className="space-y-4 text-sm text-foreground/75">
            {resume.projects.map((project) => (
              <div key={project.id} className="rounded-2xl border border-white/5 bg-background/60 p-4 shadow-inner shadow-black/10">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <p className="text-base font-semibold text-foreground">{project.name}</p>
                  <span className="text-xs text-foreground/60">{project.timeframe}</span>
                </div>
                <p className="mt-2 text-foreground/70">
                  <span className="font-semibold text-foreground">Problem:</span> {project.problem}
                </p>
                <p className="text-foreground/70">
                  <span className="font-semibold text-foreground">Solution:</span> {project.solution}
                </p>
                <p className="text-foreground/70">
                  <span className="font-semibold text-foreground">Impact:</span> {project.impact}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={`${project.id}-tech-${tech}`}
                      className="rounded-full border border-accent-primary/25 px-3 py-1 text-xs text-accent-primary/85"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )
      };
    case "education":
      return {
        id: `result-${Date.now()}`,
        command: commandString,
        renderedAt: Date.now(),
        node: (
          <div className="space-y-2 text-sm text-foreground/75">
            <p className="text-base font-semibold text-foreground">{resume.education.degree}</p>
            <p className="text-xs uppercase tracking-[0.3em] text-accent-primary/70">
              {resume.education.institution} · {resume.education.location}
            </p>
            <p className="text-xs text-foreground/60">{resume.education.range.label}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {resume.education.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
        )
      };
    case "certifications":
      return {
        id: `result-${Date.now()}`,
        command: commandString,
        renderedAt: Date.now(),
        node: (
          <ul className="space-y-3 text-sm text-foreground/75">
            {resume.certifications.map((cert) => (
              <li key={cert.id} className="rounded-2xl border border-white/5 bg-background/60 p-4">
                <p className="text-base font-semibold text-foreground">{cert.name}</p>
                <p className="text-xs uppercase tracking-[0.3em] text-accent-primary/70">
                  {cert.issuer} · {cert.issued}
                </p>
              </li>
            ))}
          </ul>
        )
      };
    case "skills":
      return {
        id: `result-${Date.now()}`,
        command: commandString,
        renderedAt: Date.now(),
        node: (
          <div className="grid gap-4 md:grid-cols-2">
            {resume.skills.map((group) => (
              <div key={group.label} className="rounded-2xl border border-white/5 bg-background/60 p-4">
                <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-accent-primary">{group.label}</h4>
                <ul className="mt-2 space-y-1 text-sm text-foreground/75">
                  {group.items.map((item) => (
                    <li key={`${group.label}-${item}`}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )
      };
    case "contact":
      return {
        id: `result-${Date.now()}`,
        command: commandString,
        renderedAt: Date.now(),
        node: (
          <div className="space-y-3 text-sm text-foreground/75">
            <div className="grid gap-2 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-accent-primary/70">Email</p>
                <a className="text-foreground hover:text-accent-primary" href={`mailto:${resume.contact.email}`}>
                  {resume.contact.email}
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-accent-primary/70">Phone</p>
                <a className="text-foreground hover:text-accent-primary" href={`tel:${resume.contact.phone}`}>
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
                {resume.contact.links.map((link) => (
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
        )
      };
    case "scroll":
    case "toggle":
    case "clear":
      return null;
    default:
      return {
        id: `result-${Date.now()}`,
        command: commandString,
        renderedAt: Date.now(),
        node: <p className="text-sm text-foreground/60">Command acknowledged, functionality coming soon.</p>
      };
  }
}

type CommandOutputProps = {
  command: string;
  commandDefinition: CommandDefinition;
};

export function buildCommandResult(command: string, commandDefinition: CommandDefinition) {
  return renderOutputNode(commandDefinition, command);
}

export function CommandOutput({ command, commandDefinition }: CommandOutputProps) {
  const result = renderOutputNode(commandDefinition, command);
  if (!result) return null;

  return (
    <div className="space-y-2">
      <p className="text-xs uppercase tracking-[0.3em] text-accent-primary/70">
        {command}
      </p>
      <div>{result.node}</div>
    </div>
  );
}

export function CommandResultLog({ results }: { results: TerminalCommandResult[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [results]);

  if (!results.length) {
    return (
      <div className="h-full min-h-[12rem] overflow-y-auto rounded-2xl border border-white/5 bg-background/60 p-6 text-sm text-foreground/60">
        Type `help` to explore commands or select a chip below. New entries appear here.
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="h-full min-h-[12rem] space-y-6 overflow-y-auto pr-2"
      role="log"
      aria-live="polite"
    >
      {results.map((result) => (
        <div key={result.id} className="rounded-2xl border border-white/5 bg-background/60 p-6 shadow-inner shadow-black/10">
          <p className="text-xs uppercase tracking-[0.3em] text-accent-primary/70">{result.command}</p>
      <div className="mt-3 text-sm text-foreground/75 animate-slide-up">{result.node}</div>
        </div>
      ))}
    </div>
  );
}

