import React from "react";

const LoginPage = () => {
  return (
    <div className="mt-4 ">
      <h1 className="text-4xl text-center">Login</h1>
      <form className="max-w-md mx-auto border">
        <input type="email" placeholder="your@email.com" />
        <input type="password" placeholder="password" />
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
