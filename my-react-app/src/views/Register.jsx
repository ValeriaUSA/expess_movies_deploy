import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios.config"

export default function Register() {
  const prenomRef = useRef();
  const nomRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const password2Ref = useRef();
//   const roleRef = useRef("ABONNE");

  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const registrationFormMessages = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccess("");

    const registrationData = {
      prenom: prenomRef.current.value,
      nom: nomRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      role: "ABONNE",
    };

    if (registrationData.password !== password2Ref.current.value) {
      setErrors(["Passwords do not match"]);
      return;
    }

    try {
      const dbRes = await axios.post("/register", registrationData);

      if (dbRes.status === 201) {
        setSuccess("You are registered! Redirecting to login...");
        navigate("/login")
      }
    } catch (err) {
        console.log(err);
        
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors([err.message]);
      }
    }
  };

  return (
    <main className="container d-flex justify-content-center align-items-center flex-grow-1">
      <div className="card shadow-lg p-4 rounded-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4 text-success">
          <i className="bi bi-person-plus"></i> Créer un compte
        </h2>

        {errors.length > 0 && (
          <div className="alert alert-danger">
            <ul className="mb-0">
              {errors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={registrationFormMessages}>
          <div className="mb-3">
            <label htmlFor="prenom" className="form-label">Prénom</label>
            <input type="text" className="form-control" id="prenom" ref={prenomRef} required />
          </div>

          <div className="mb-3">
            <label htmlFor="nom" className="form-label">Nom</label>
            <input type="text" className="form-control" id="nom" ref={nomRef} required />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Adresse email</label>
            <input type="email" className="form-control" id="email" ref={emailRef} required />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Mot de passe</label>
            <input type="password" className="form-control" id="password" ref={passwordRef} required />
          </div>

          <div className="mb-3">
            <label htmlFor="password2" className="form-label">Confirmer le mot de passe</label>
            <input type="password" className="form-control" id="password2" ref={password2Ref} required />
          </div>

          {/* <input type="hidden" value="ABONNE" ref={roleRef} /> */}

          <button type="submit" className="btn btn-success w-100">
            <i className="bi bi-check-circle"></i> S'inscrire
          </button>
        </form>
      </div>
    </main>
  );
}
