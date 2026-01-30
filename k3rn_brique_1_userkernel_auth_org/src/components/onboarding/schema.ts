import { z } from "zod";

export const onboardingSchema = z.object({
  organisation_name: z.string().min(2, "Nom trop court."),
  first_name: z.string().min(1, "Requis."),
  last_name: z.string().min(1, "Requis."),
  company_type: z.enum(["solo", "startup", "sme", "enterprise", "agency", "other"]),
  industry: z.string().min(2, "Requis."),
  employee_count_range: z.enum(["1", "2-5", "6-10", "11-50", "51-200", "200+"]),
  budget_range: z.enum(["0", "1-500", "500-2000", "2000-10000", "10000+"]),
  technical_level: z.coerce.number().int().min(0).max(5),
  speed_vs_quality: z.coerce.number().int().min(0).max(10)
});

export type OnboardingInput = z.infer<typeof onboardingSchema>;
