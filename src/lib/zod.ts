import { object, string } from "zod";

export const signInSchema = object({
  email: string({ required_error: "Email must be include @" })
    .min(1, "Email is required")
    .email(),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const signUpSchema = object({
  name: string({ required_error: "Name is required " }),
  email: string({ required_error: "Email must be include @" })
    .min(1, "Email is required")
    .email(),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const storiesSchema = object({
  id: string({ required_error: "Not Valid" }).optional(),
  user_id: string({ required_error: "Not valid Form" }),
  title: string({ required_error: "Title is required" }).min(
    3,
    "Title must be more than 3 charaters"
  ),
  summary: string({ required_error: "Summary is required" }).min(
    1,
    "Username is required"
  ),
  content: string({ required_error: "Content is required" }).min(
    1,
    "Content must be more than 1000 worlds"
  ),
  category_id: string({ required_error: "Required Category" }).min(
    1,
    "Required Category"
  ),
});
