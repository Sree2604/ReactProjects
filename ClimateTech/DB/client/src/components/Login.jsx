

const Login = async () => {
  const username = import.meta.env.VITE_UNAME;
  const password = import.meta.env.VITE_UPASS;

  ///fn starts
  try {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem("token", token);
      console.log("Login successful");
    } else {
      console.error("Login failed");
    }
  } catch (error) {
    console.error("Error:", error);
  } //fn ends
};

export default Login;
