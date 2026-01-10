import { useContext, useRef } from "react"
import { useNavigate, Link } from "react-router-dom"
import { GlobalContext } from "../contexts/GlobalContext"
import axios from "../axios.config"

export default function Login() {
    const { setIsAuthenticated } = useContext(GlobalContext)
    const email = useRef()
    const password = useRef()
    const navigate = useNavigate()

    // Submit handler
    async function connection(event) {
        event.preventDefault(); // prevent page refresh

        try {
            const dbreponse = await axios.post("/login", {
                email: email.current.value,
                password: password.current.value,
            });

            console.log("User info:", dbreponse.data);

            if (dbreponse.data.success) {
                // Save user info in context or storage
                setIsAuthenticated(true);

                // Example: store role in localStorage
                localStorage.setItem("role", dbreponse.data.user.role);

                // Redirect based on role
                if (dbreponse.data.user.role === "ADMIN") {
                    navigate("/film");
                } else {
                    navigate("/");
                }
            } else {
                alert(dbreponse.data.errors?.join(", ") || "Login failed");
            }
        } catch (err) {
            console.error("Login error:", err);
            alert("Unexpected error, please try again");
        }
    }

    return (
        <div>
            <div
                className="card shadow-lg p-4 rounded-4 mx-auto"
                style={{ maxWidth: "400px" }}
            >
                <h2 className="text-center mb-4 text-success">
                    <i className="bi bi-box-arrow-in-right"></i> Login
                </h2>

                <form onSubmit={connection}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Adresse email</label>
                        <input
                            ref={email}
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="exemple@email.com"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            ref={password}
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder="********"
                            required
                        />
                    </div>

                    <button className="btn btn-success w-100">Login</button>
                </form>

                <div className="text-center mt-3">
                    <p className="mb-0">
                        Pas de compte ?{" "}
                        <Link to="/register" className="text-success fw-bold">
                            Créer un compte
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}


