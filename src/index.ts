import { Hono } from 'hono';
import { basicAuth } from 'hono/basic-auth'
import { z } from 'zod'
import { signIn, signUp } from './templates';

const app = new Hono<{ Bindings: CloudflareBindings }>();

const validationSchema = z.object({
  email: z.string().email("Must be a valid email"),
  password: z.string().min(5, "Password must be more than five characters").regex(RegExp('^(?=.*[A-Z])(?=.*\\d).+$'), "Password should have atleast 1 uppercase and lowecase"),
  confirmPass: z.string().min(5).regex(RegExp('^(?=.*[A-Z])(?=.*\\d).+$'))
}).refine((value) => {
  return value.password === value.confirmPass;
}, {
  message: "Passwords do not match",
  path: ["confirm_pass"]
});

// Serve the homepage
app.get('/', (c) => {
  return c.html(`<p>Hello, World! This is my Cloudflare signup page</p>
  <a href="/signup">Proceed to signup</a>`);
});

app.get('/signup', (c) => {
  return c.html(signUp);
});

app.get('/signin', (c) => {
  return c.html(signIn)
})

app.post('/signup',  async (c) => {
  const rawFormData = await(c.req.parseBody())
  const formStatus = validationSchema.safeParse(rawFormData)
  if(formStatus.success)  {
    
    return c.html(`<h1>${formStatus.data}</h1>`);
  }
  else {
    console.log(formStatus.error.issues);
    return c.redirect('/signup')
  }

  
});

// Catch-all for 404 errors
app.notFound((c) => {
  return c.html('<h1>404 Error: Page Not Found</h1>');
});

export default app;
