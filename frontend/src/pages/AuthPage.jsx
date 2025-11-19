import LoginForm from "../components/LoginForm.jsx";
import SignupForm from "../components/SignupForm.jsx"
import useState from "react";

function AuthPage () {

    const [mode, setMode] = useState("login")

    return (
        <>
            {mode === "login" ? <LoginForm/> : <SignupForm/>}

            <button 
                onClick = {() => 
                    setMode(mode === "login" ? "signup" : "login")
                }>

                {mode === "login" ? "Create an account" : "Already have an account?"}
            </button>
        </>
    );
}

export default AuthPage;