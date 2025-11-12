import { resume } from "./resume";

export type CommandCategory = "core" | "section" | "utility" | "contact";

export type CommandDefinition = {
  name: string;
  description: string;
  category: CommandCategory;
  aliases?: string[];
  relatedSectionId?: string;
};

export type SectionDescriptor = {
  id: string;
  title: string;
  command: string;
  summary: string;
};

export const commands: CommandDefinition[] = [
  {
    name: "help",
    description: "List all available commands and keyboard shortcuts.",
    category: "core",
    aliases: ["?"]
  },
  {
    name: "about",
    description: "Read Dylan's background summary and current focus areas.",
    category: "section",
    relatedSectionId: "about"
  },
  {
    name: "experience",
    description: "Review the professional timeline and key achievements.",
    category: "section",
    relatedSectionId: "experience"
  },
  {
    name: "projects",
    description: "Explore highlighted builds with context, impact, and tech stacks.",
    category: "section",
    relatedSectionId: "projects"
  },
  {
    name: "education",
    description: "View academic background and relevant highlights.",
    category: "section",
    relatedSectionId: "education"
  },
  {
    name: "certifications",
    description: "See certifications and credentials with issue dates.",
    category: "section",
    relatedSectionId: "certifications"
  },
  {
    name: "skills",
    description: "Browse technical proficiencies organized by category.",
    category: "section",
    relatedSectionId: "skills"
  },
  {
    name: "contact",
    description: "Retrieve contact details and quick links.",
    category: "contact",
    relatedSectionId: "contact"
  },
  {
    name: "scroll",
    description: "Jump focus to the scrollable résumé layout.",
    category: "utility",
    aliases: ["view"],
    relatedSectionId: "scroll-start"
  },
  {
    name: "clear",
    description: "Clear the terminal output window.",
    category: "utility"
  },
  {
    name: "toggle",
    description: "Switch between terminal-only and hybrid layouts.",
    category: "utility"
  },
  {
    name: "download",
    description: "Instructions to download a PDF copy of the résumé.",
    category: "utility",
    aliases: ["download resume", "resume"]
  }
];

export const sectionDescriptors: SectionDescriptor[] = [
  {
    id: "about",
    title: "About",
    command: "about",
    summary: resume.about.paragraphs[0]
  },
  {
    id: "experience",
    title: "Experience",
    command: "experience",
    summary: "Infrastructure, ML, and leadership roles across SamaritanApps, QAIFS, and Reena Group."
  },
  {
    id: "projects",
    title: "Projects",
    command: "projects",
    summary: "Three flagship builds covering quantitative finance, tournament tooling, and RBAC automation."
  },
  {
    id: "education",
    title: "Education",
    command: "education",
    summary: `${resume.education.degree} at ${resume.education.institution}.`
  },
  {
    id: "certifications",
    title: "Certifications",
    command: "certifications",
    summary: "Industry credentials from CompTIA and Google validating security, Linux, and analytics expertise."
  },
  {
    id: "skills",
    title: "Skills",
    command: "skills",
    summary: "Languages, frameworks, tooling, and libraries tailored for data-intensive systems and automation."
  },
  {
    id: "contact",
    title: "Contact",
    command: "contact",
    summary: "Email, phone, and professional profiles for collaboration."
  }
];

export const primaryCommandNames = [
  "help",
  "about",
  "experience",
  "projects",
  "skills",
  "contact",
  "scroll"
] as const;

export type PrimaryCommandName = (typeof primaryCommandNames)[number];

export const primaryCommands = commands.filter((command) =>
  primaryCommandNames.includes(command.name as PrimaryCommandName)
);

export const commandDictionary = commands.reduce<Record<string, CommandDefinition>>((dict, command) => {
  dict[command.name] = command;
  if (command.aliases) {
    command.aliases.forEach((alias) => {
      dict[alias] = command;
    });
  }
  return dict;
}, {});

