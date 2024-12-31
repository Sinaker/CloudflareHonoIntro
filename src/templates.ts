export const signIn = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign In</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #fff;
            color: #333;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .container {
            max-width: 400px;
            width: 100%;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .header {
            background-color: #ff4d4d;
            color: white;
            text-align: center;
            padding: 1rem;
        }

        .form {
            padding: 1.5rem;
        }

        .form-group {
            margin-bottom: 1.2rem;
        }

        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: bold;
        }

        .form-group input {
            width: 100%;
            padding: 0.8rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 1rem;
        }

        .form-group input:focus {
            border-color: #ff4d4d;
            outline: none;
        }

        .form-group button {
            width: 100%;
            background-color: #ff4d4d;
            color: white;
            border: none;
            padding: 0.8rem;
            font-size: 1rem;
            border-radius: 4px;
            cursor: pointer;
        }

        .form-group button:hover {
            background-color: #e60000;
        }

        .footer {
            text-align: center;
            margin-top: 1rem;
        }

        .footer a {
            color: #ff4d4d;
            text-decoration: none;
        }

        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h2>Sign In</h2>
        </div>
        <div class="form">
            <form action="/login" method="POST">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" placeholder="Enter your email" name="email" required />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" placeholder="Enter your password" name="password" required />
                </div>
                <div class="form-group">
                    <button type="submit">Sign In</button>
                </div>
            </form>
            <div class="footer">
                <p>Don't have an account? <a href="/signup">Sign up</a></p>
            </div>
        </div>
    </div>
</body>

</html>`

export const signUp = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #fff;
            color: #333;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .container {
            max-width: 400px;
            width: 100%;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .header {
            background-color: #ff4d4d;
            color: white;
            text-align: center;
            padding: 1rem;
        }

        .form {
            padding: 1.5rem;
        }

        .form-group {
            margin-bottom: 1.2rem;
        }

        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: bold;
        }

        .form-group input {
            width: 100%;
            padding: 0.8rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 1rem;
        }

        .form-group input:focus {
            border-color: #ff4d4d;
            outline: none;
        }

        .form-group button {
            width: 100%;
            background-color: #ff4d4d;
            color: white;
            border: none;
            padding: 0.8rem;
            font-size: 1rem;
            border-radius: 4px;
            cursor: pointer;
        }

        .form-group button:hover {
            background-color: #e60000;
        }

        .footer {
            text-align: center;
            margin-top: 1rem;
        }

        .footer a {
            color: #ff4d4d;
            text-decoration: none;
        }

        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h2>Sign Up</h2>
        </div>
        <div class="form">
            <form action="/signup" method="POST">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" placeholder="Enter your email" name="email" required />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" placeholder="Enter your password" name="password" required />
                </div>
                <div class="form-group">
                    <label for="confirm-password">Confirm Password</label>
                    <input type="password" id="confirm-password" placeholder="Confirm your password" name="confirmPass" required />
                </div>
                <div class="form-group">
                    <button type="submit">Sign Up</button>
                </div>
            </form>
            <div class="footer">
                <p>Already have an account? <a href="/login">Sign in</a></p>
            </div>
        </div>
    </div>
</body>

</html>`