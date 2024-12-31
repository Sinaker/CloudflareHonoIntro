import bcryptjs from "bcryptjs";

import { Hono } from 'hono';
import { z } from 'zod'
import { signIn, signUp } from './templates';

import { drizzle } from "drizzle-orm/d1";
import { users } from './db/schema';
import { eq, count, } from 'drizzle-orm';

export interface Env {
  DB: D1Database
}
const app = new Hono<{ Bindings: Env }>();

const signUpValidation = z.object({
  email: z.string().email("Must be a valid email"),
  password: z.string().min(5, "Password must be more than five characters").regex(RegExp('^(?=.*[A-Z])(?=.*\\d).+$'), "Password should have atleast 1 uppercase and lowecase"),
  confirmPass: z.string().min(5).regex(RegExp('^(?=.*[A-Z])(?=.*\\d).+$'))
}).refine((value) => {
  return value.password === value.confirmPass;
}, {
  message: "Passwords do not match",
  path: ["confirm_pass"]
});

const logInValidation = z.object({
  email: z.string().email("Must be a valid email"),
  password: z.string().min(5, "Password must be more than five characters").regex(RegExp('^(?=.*[A-Z])(?=.*\\d).+$'), "Password should have atleast 1 uppercase and lowecase")
})

// Serve the homepage
app.get('/', (c) => {
  return c.html(`<p>Hello, World! This is my Cloudflare signup page</p>
  <a href="/signup">Proceed to signup</a>`);
});

app.get('/signup', (c) => {
  return c.html(signUp);
});

app.get('/login', (c) => {
  return c.html(signIn)
})

app.post('/signup', async (c) => {
  const rawFormData = await (c.req.parseBody())
  const formStatus = signUpValidation.safeParse(rawFormData)
  if (formStatus.success) {
    const { email, password } = formStatus.data;

    // Hashing

    const db = drizzle(c.env.DB);

    try {
      // First check if any account exists
      const Result = await db.select({ count: count() }).from(users).where(eq(users.email, email));
      const userCount = Result[0]?.count ?? 0;
      if (userCount > 0)
        throw new Error("User already exists");

      // Else insert it in database
      const hashPassword = await bcryptjs.hash(password, 12);

      await db.insert(users).values({
        email,
        password: hashPassword
      });
    } catch (err) {
      console.error(err);
      return c.redirect('/signup');
    }
    return c.redirect('/login');
  }
  else {
    return c.redirect('/signup')
  }
});

app.post('/login', async (c) => {
  const rawFormData = await c.req.parseBody();
  const formStatus = logInValidation.safeParse(rawFormData);


  if (formStatus.success) {
    const { email, password } = formStatus.data;

    const db = drizzle(c.env.DB);
    try {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email));

      if (user === null) throw new Error("User already exists");

      const isMatching = await bcryptjs.compare(password, user.password);

      if (isMatching)
        return c.html(`<h1>You logged in successfully!</h1><p>Email: ${email}</p>`);
      else throw new Error("Invalid Credentials");
    } catch (err) {
      console.error(err);
      return c.redirect('/login');
    }
  } else {
    console.log("Validation failed");
    return c.redirect('/login');
  }
});

// Catch-all for 404 errors
app.notFound((c) => {
  return c.html('<h1>404 Error: Page Not Found</h1>');
});

export default app;
