import React, { useState } from "react";
import { motion } from "framer-motion";
import { auth, db } from "../../utils/firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom"; // For redirection
import Swal from "sweetalert2"; // SweetAlert for notifications
import { doc, setDoc } from "firebase/firestore"; // Firestore

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // Switch between login/signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // For navigation after login/signup

  // Toggle between login and signup
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        // Login
        await signInWithEmailAndPassword(auth, email, password);
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Logged in successfully!",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/admin-dashboard"); // Redirect to admin dashboard
      } else {
        // Signup
        if (password !== confirmPassword) {
          setError("Passwords do not match!");
          return;
        }
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // Get the user UID from the created account
        const user = userCredential.user;

        // Save user data to Firestore
        await setDoc(doc(db, "users", user.uid), {
          name: email.split("@")[0], // Use email prefix as name for simplicity
          email: user.email,
          userType: "admin",
        });

        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Account created successfully!",
          showConfirmButton: false,
          timer: 2000,
        });

        navigate("/admin-dashboard"); // Redirect after signup
      }
    } catch (err) {
      setError(err.message);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: err.message,
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <motion.div
        className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-extrabold text-white text-center mb-8">
          {isLogin ? "Admin Login" : "Admin Sign Up"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400">
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 mt-1 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-400">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-3 mt-1 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="absolute top-10 right-3 text-xl text-gray-400 cursor-pointer"
              onClick={handlePasswordVisibility}
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-400">
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-3 mt-1 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            {isLogin
              ? "Don't have an account? "
              : "Already have an account? "}
            <button
              onClick={toggleForm}
              className="text-blue-500 hover:underline"
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
