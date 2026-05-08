import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API } from "./api";

function Register({ onLogin }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // التحقق من الحقول
    if (
      !form.firstName.trim() ||
      !form.lastName.trim() ||
      !form.email.trim() ||
      !form.password.trim() ||
      !form.confirm.trim()
    ) {
      setMessage("جميع الحقول مطلوبة ❌");
      return;
    }

    if (form.password !== form.confirm) {
      setMessage("كلمة المرور غير متطابقة ❌");
      return;
    }

    try {
      const res = await fetch(${API}/register, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          FName: form.firstName.trim(),
          LName: form.lastName.trim(),
          email: form.email.trim(),
          passw: form.password,
        }),
      });

      const data = await res.json();

      if (res.ok && data.status === "success") {
        const newUser = {
          id: data.user.id,
          FName: data.user.FName,
          LName: data.user.LName,
          email: data.user.email,
        };

        if (onLogin) onLogin(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));

        setMessage("تم إنشاء الحساب بنجاح ✅");

        setTimeout(() => navigate("/Page"), 150);
      } else {
        setMessage(data.message || "حدث خطأ أثناء إنشاء الحساب ❌");
      }
    } catch (error) {
      console.error(error);
      setMessage("تعذر الاتصال بالسيرفر ❌");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#EAF4FC",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "40px",
          borderRadius: "20px",
          width: "380px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          direction: "rtl",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#3A6EA5" }}>إنشاء حساب جديد</h2>

        <label>الاسم الأول</label>
        <input
          type="text"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          style={inputStyle}
        />

        <label>الاسم الأخير</label>
        <input
          type="text"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          style={inputStyle}
        />

        <label>البريد الإلكتروني</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          style={inputStyle}
        />

        <label>كلمة المرور</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          style={inputStyle}
        />

        <label>تأكيد كلمة المرور</label>
        <input
          type="password"
          name="confirm"
          value={form.confirm}
          onChange={handleChange}
          style={inputStyle}
        />

        <button style={buttonStyle} onClick={handleSubmit}>
          إنشاء حساب
        </button>

        {message && (
          <p
            style={{
              color: message.includes("❌") ? "red" : "green",
              textAlign: "center",
              marginTop: "15px",
            }}
          >
            {message}
          </p>
        )}

        <p style={{ textAlign: "center", marginTop: "20px" }}>
