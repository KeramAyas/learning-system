import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API } from "./api";

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    // التحقق من الحقول
    if (!form.email || !form.password) {
      setMessage("جميع الحقول مطلوبة ❌");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      console.log("📤 جاري الإرسال:", { email: form.email, passw: form.password });

      const response = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, passw: form.password })
      });

      console.log("📥 Status:", response.status);

      const data = await response.json();
      console.log("✅ البيانات:", data);

      if (data.success) {
        // ✅ حفظ بيانات المستخدم
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // ✅ تحديث الـ Navbar
        if (onLogin) {
          onLogin(data.user);
        }
        
        // ✅ التوجيه للصفحة الرئيسية
        navigate("/Page");
      } else {
        setMessage(data.message || "فشل تسجيل الدخول ❌");
      }
    } catch (error) {
      console.error("❌ خطأ:", error);
      setMessage("تعذر الاتصال بالسيرفر ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#EAF4FC", paddingTop: "80px" }}>
      <div style={{ backgroundColor: "#fff", padding: "40px", borderRadius: "20px", width: "380px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", direction: "rtl" }}>
        <h2 style={{ color: "#3A6EA5", textAlign: "center" }}>تسجيل الدخول</h2>
        
        <label>البريد الإلكتروني</label>
        <input 
          type="email" 
          name="email" 
          value={form.email} 
          onChange={handleChange} 
          style={inputStyle} 
          disabled={loading}
        />
        
        <label>كلمة المرور</label>
        <input 
          type="password" 
          name="password" 
          value={form.password} 
          onChange={handleChange} 
          style={inputStyle} 
          disabled={loading}
        />
        
        <button 
          style={{...buttonStyle, opacity: loading ? 0.7 : 1}} 
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "جاري التسجيل..." : "دخول"}
        </button>
        
        {message && <p style={{ color: message.includes("✅") ? "green" : "red", textAlign: "center", marginTop: "10px" }}>{message}</p>}
        
        <p style={{ textAlign: "center", marginTop: "15px" }}>
          ليس لدي حساب؟ <Link to="/Register">أنشئ حساب جديد</Link>
        </p>
      </div>
    </div>
  );
}

const inputStyle = { 
  width: "100%", 
  padding: "12px", 
  marginBottom: "18px", 
  borderRadius: "10px", 
  border: "1px solid #ccc", 
  fontSize: "16px",
  boxSizing: "border-box"
};

const buttonStyle = { 
  width: "100%", 
  padding: "14px", 
  marginTop: "10px", 
  backgroundColor: "#3A6EA5", 
  color: "#fff", 
  border: "none", 
  borderRadius: "10px", 
  fontSize: "18px", 
  fontWeight: "bold", 
  cursor: "pointer" 
};

export default Login;