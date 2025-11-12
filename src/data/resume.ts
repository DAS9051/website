import rawResume from "../../content/resume.json";
import { z } from "zod";

const dateRangeSchema = z.object({
  start: z.string(),
  end: z.string(),
  label: z.string().optional()
});

const contactLinkSchema = z.object({
  label: z.string(),
  href: z.string().url()
});

const contactSchema = z.object({
  email: z.string().email(),
  phone: z.string(),
  location: z.string(),
  links: z.array(contactLinkSchema)
});

const aboutSchema = z.object({
  headline: z.string(),
  paragraphs: z.array(z.string())
});

const educationSchema = z.object({
  institution: z.string(),
  location: z.string(),
  degree: z.string(),
  range: dateRangeSchema,
  highlights: z.array(z.string())
});

const experienceEntrySchema = z.object({
  id: z.string(),
  title: z.string(),
  organization: z.string(),
  location: z.string(),
  range: dateRangeSchema,
  summary: z.string(),
  achievements: z.array(z.string()),
  tags: z.array(z.string())
});

const projectEntrySchema = z.object({
  id: z.string(),
  name: z.string(),
  timeframe: z.string(),
  problem: z.string(),
  solution: z.string(),
  impact: z.string(),
  tech: z.array(z.string())
});

const certificationSchema = z.object({
  id: z.string(),
  name: z.string(),
  issuer: z.string(),
  issued: z.string(),
  credentialId: z.string().optional()
});

const skillCategorySchema = z.object({
  label: z.string(),
  items: z.array(z.string())
});

const resumeMetaSchema = z.object({
  tagline: z.string(),
  location: z.string(),
  availability: z.string(),
  lastUpdated: z.string()
});

export const resumeSchema = z.object({
  contact: contactSchema,
  about: aboutSchema,
  education: educationSchema,
  experience: z.array(experienceEntrySchema),
  projects: z.array(projectEntrySchema),
  certifications: z.array(certificationSchema),
  skills: z.array(skillCategorySchema),
  meta: resumeMetaSchema
});

export type Resume = z.infer<typeof resumeSchema>;
export type DateRange = z.infer<typeof dateRangeSchema>;
export type ExperienceEntry = z.infer<typeof experienceEntrySchema>;
export type ProjectEntry = z.infer<typeof projectEntrySchema>;
export type Certification = z.infer<typeof certificationSchema>;
export type SkillCategory = z.infer<typeof skillCategorySchema>;
export type ContactLink = z.infer<typeof contactLinkSchema>;

const parsedResume: Resume = resumeSchema.parse(rawResume);

export const contact: Resume["contact"] = parsedResume.contact;
export const about: Resume["about"] = parsedResume.about;
export const education: Resume["education"] = parsedResume.education;
export const experience: Resume["experience"] = parsedResume.experience;
export const projects: Resume["projects"] = parsedResume.projects;
export const certifications: Resume["certifications"] = parsedResume.certifications;
export const skills: Resume["skills"] = parsedResume.skills;
export const resumeMeta: Resume["meta"] = parsedResume.meta;

export const resume: Resume = parsedResume;

