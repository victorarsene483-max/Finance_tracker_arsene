import {useState} from "react";
function Login(){
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[error,setError]=useState("");

function handleLogin(){
    setError("");
    if(!email || !password){
        setError("please enter both email and password,");
        return;
    }
    const users = JSON.parse(localStorage.getItem("fintrack_users")) || [];
    const matchedUser = users.find(
      (user) => user.email === email.trim().toLowerCase() && user.password === password
    );
    if(!matchedUser){
        setError("Incorrect email or password");
        return;
    }
    localStorage.setItem("fintrack_current_user", JSON.stringify(matchedUser));
    console.log("Logged in as:", matchedUser.fullName);
}
<div className="login-card">
    <div>
        <h1 className="login-header">Login</h1>
    </div>
    {error && <p className="login-error">{error}</p>}
    <input type="password" placeholder="Enter your password"  value={password} onChange={(e)=>setPassword(e.target.value)}/>
    <button onClick={handleLogin}>Login</button>

</div>
}
export default Login