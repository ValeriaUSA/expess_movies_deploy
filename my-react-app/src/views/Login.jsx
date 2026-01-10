import { useContext } from "react"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { GlobalContext } from "../contexts/GlobalContext"
import { Link } from "react-router-dom";
import axios from "../axios.config"

export default function Login() {
    const { setIsAuthenticated } = useContext(GlobalContext)
    const email = useRef()
    const password = useRef()
    const navigate = useNavigate()


    async function connection(event) {
        event.preventDefault(); // no page refresh

        try {
            const dbreponse = await axios.post("/login/login", {
                email: email.current.value,
                password: password.current.value
            });


            console.log("User info", dbreponse.data);

            if (dbreponse.data.success) {
                setIsAuthenticated(true);
                //Save user infor in local storage (why not in content?)
                localStorage.setItem("role", dbreponse.data.user.role);
                localStorage.setItem("prenom", dbreponse.data.user.prenom);
                localStorage.setItem("email", dbreponse.data.user.email)
                //Redirect to different pages base on user's role

                if (dbreponse.data.user.role === "ADMIN") {
                    navigate("/adminfilms");
                } else {
                    navigate("/films")
                }
            } else {

                alert(dbreponse.data.errors?.join(", ") || "Login failed")
            }

        } catch (err) {
            console.log(err);

            alert("Unexpected error, try later")
        }

    }

    return (
        <div>

            <div className="card shadow-lg p-4 rounded-4 mx-auto" style={{ maxWidth: "400px" }}></div>
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
                        id="email" name="email"
                        placeholder="exemple@email.com" required
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

    )
}