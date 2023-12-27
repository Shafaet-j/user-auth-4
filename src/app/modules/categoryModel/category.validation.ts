import { z } from "zod";
const categoryValidationSchema = z.object({
  name: z.string().min(1).max(255),
});
export default categoryValidationSchema;
