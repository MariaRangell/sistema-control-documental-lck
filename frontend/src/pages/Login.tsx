import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const usernameInput = document.getElementById(
      "username"
    ) as HTMLInputElement;
    if (usernameInput) {
      usernameInput.focus();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setTimeout(() => {
          setLoading(false);
          navigate("/dashboard");
        }, 2000);
      } else {
        setLoading(false);
        setError(data.message || "Usuario o contraseña incorrectos");
        setPassword("");
      }
    } catch (err) {
      setLoading(false);
      setError("Error de conexión con el servidor");
    }
  };

  async function handleForgotPassword() {
    if (!username.trim()) {
      setError("Por favor ingresa tu nombre de usuario primero");
      return;
    }
    setLoading(true);
    setError("");
    setForgotPasswordMessage("");
    setTimeout(() => {
      setLoading(false);
      setForgotPasswordMessage(
        `Se ha enviado una solicitud de recuperación para el usuario "${username}" al administrador.`
      );
    }, 2000);
  }

  // 🎨 Estilos
  const bodyStyle: React.CSSProperties = {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "linear-gradient(135deg, #1a1a1a 0%, #333333 100%)",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    margin: 0,
  };

  const containerStyle: React.CSSProperties = {
    background: "rgba(255, 255, 255, 0.98)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
    padding: "40px",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center" as const,
    border: "2px solid rgba(220, 20, 60, 0.2)",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "15px",
    border: "2px solid #ddd",
    borderRadius: "10px",
    fontSize: "16px",
    transition: "all 0.3s ease",
    background: "#f8f8f8",
    color: "#333",
    boxSizing: "border-box" as const,
  };

  const buttonStyle: React.CSSProperties = {
    width: "100%",
    padding: "15px",
    background: "linear-gradient(135deg, #dc143c, #8b0000)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: "10px",
    boxShadow: "0 4px 15px rgba(220, 20, 60, 0.3)",
  };

  const errorStyle: React.CSSProperties = {
    background: "#ffe6e6",
    color: "#dc143c",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "20px",
    fontSize: "14px",
    border: "1px solid #ffb3b3",
    display: error ? "block" : "none",
  };

  const successStyle: React.CSSProperties = {
    background: "#f0f0f0",
    color: "#141414",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "20px",
    fontSize: "14px",
    border: "1px solid #ddd",
    display: loading ? "block" : "none",
  };

  const forgotPasswordSuccessStyle: React.CSSProperties = {
    background: "#e6ffe6",
    color: "#2d5a2d",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "20px",
    fontSize: "14px",
    border: "1px solid #b3ffb3",
    display: forgotPasswordMessage ? "block" : "none",
  };

  const forgotLinkStyle: React.CSSProperties = {
    color: "#dc143c",
    textDecoration: "none",
    fontSize: "14px",
    transition: "color 0.3s ease",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: 0,
  };

  return (
    <div style={bodyStyle}>
      <div style={containerStyle}>
        {/* Logo */}
        <div style={{ width: "100%", margin: "0 auto 20x", textAlign: "center" }}>
          <img
            src="/logo1.png"
            alt="Logo LCK Consultores"
            style={{
              maxWidth: "180px",
              maxHeight: "80px",
              height: "auto",
              display: "block",
              margin: "0 auto 20px",
            }}
          />
        </div>

        <h1 style={{ color: "#1a1a1a", fontSize: "28px", marginBottom: "10px", fontWeight: 600 }}>
          Control Documental
        </h1>
        <p style={{ color: "#555", marginBottom: "30px", fontSize: "16px" }}>
          Ingresa tus credenciales para acceder
        </p>

        <div style={errorStyle}>{error}</div>
        <div style={successStyle}>Iniciando sesión...</div>
        <div style={forgotPasswordSuccessStyle}>{forgotPasswordMessage}</div>

        <form onSubmit={handleSubmit}>
          {/* Usuario */}
          <div style={{ marginBottom: "20px", textAlign: "left" }}>
            <label
              htmlFor="username"
              style={{ display: "block", marginBottom: "8px", color: "#1a1a1a", fontWeight: 500 }}
            >
              Nombre de Usuario
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputStyle}
              required
            />
          </div>

          {/* Contraseña con ícono centrado */}
          <div style={{ marginBottom: "20px", textAlign: "left" }}>
            <label
              htmlFor="password"
              style={{ display: "block", marginBottom: "8px", color: "#1a1a1a", fontWeight: 500 }}
            >
              Contraseña
            </label>

            {/* Contenedor relativo solo para el input */}
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ ...inputStyle, paddingRight: "45px" }}
                required
              />

              {/* Botón con ícono centrado */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#dc143c",
                  fontSize: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                }}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? "Iniciando Sesión..." : "Iniciar Sesión"}
          </button>
        </form>

        <div style={{ marginTop: "20px" }}>
          <button type="button" onClick={handleForgotPassword} style={forgotLinkStyle}>
            ¿Olvidaste tu contraseña?
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
