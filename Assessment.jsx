import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { questions } from "../questions";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function AssessmentCartoon() {

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleAnswer = (value) => {

    const updated = { ...answers, [questions[current].id]: value };
    setAnswers(updated);

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      calculateResult(updated);
    }
  };

  const calculateResult = (finalAnswers) => {

    let social = 0;
    let language = 0;
    let behavior = 0;

    questions.forEach((q) => {
      const score = finalAnswers[q.id] || 0;

      if (q.category === "social") social += score;
      if (q.category === "language") language += score;
      if (q.category === "behavior") behavior += score;
    });

    const total = social + language + behavior;

    setResult({ social, language, behavior, total });
  };

  const progress = (current / questions.length) * 100;

  const chartData = result
    ? [
        { name: "التفاعل", value: result.social },
        { name: "اللغة", value: result.language },
        { name: "السلوك", value: result.behavior }
      ]
    : [];

  return (
    <div style={container}>
      <div style={card}>

        {!result ? (

          <>
            <h2 style={title}>🧸 استبيان تقييم سلوك الطفل</h2>

            <div style={progressBar}>
              <motion.div
                style={progressFill}
                animate={`{ width: ${progress}% }`}
              />
            </div>

            <AnimatePresence mode="wait">

              <motion.div
                key={current}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.3 }}
              >

                <div style={questionCard}>

                  <p style={questionText}>
                    {questions[current].text}
                  </p>

            <div style={buttonGroup}>

  <div style={emojiRow}>
    <span>😟</span>
    <span>😐</span>
    <span>😊</span>
  </div>

  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    style={{ ...answerBtn, background: "#FFCDD2" , color:"#444" }}
    onClick={() => handleAnswer(2)}
  >
    غالباً
  </motion.button>

  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    style={{ ...answerBtn, background: "#f7eea4", color:"#444" }}
    onClick={() => handleAnswer(1)}
  >
    أحياناً
  </motion.button>

  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    style={{ ...answerBtn, background: "#C8E6C9", color:"#444" }}
    onClick={() => handleAnswer(0)}
  >
    نادراً
  </motion.button>

</div>

                </div>

              </motion.div>

            </AnimatePresence>

          </>

        ) : (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >

            <h2 style={resultTitle}>📊 نتيجة التقييم</h2>

            <div style={{ width: "100%", height: 250 }}>

              <ResponsiveContainer>

                <BarChart data={chartData}>

                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />

                  <Bar
                    dataKey="value"
                    fill="#42A5F5"
                    radius={[10, 10, 0, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

            <div style={{ marginTop: 20 }}>

              {result.total <= 12 && (
                <p style={low}>المؤشرات منخفضة 👌</p>
              )}

              {result.total > 12 && result.total <= 24 && (
                <p style={medium}>مؤشرات متوسطة ⚠️</p>
              )}{result.total > 24 && (
                <p style={high}>
                  مؤشرات مرتفعة 🔴 يفضل استشارة مختص
                </p>
              )}

            </div>

            <p style={disclaimer}>
              هذا الاستبيان للتقييم الأولي فقط وليس تشخيصاً طبياً.
            </p>

            <button
              style={{ ...answerBtn, marginTop: 20, background: "#29B6F6" }}
              onClick={() => window.location.reload()}
            >
             🔄 إعادة الاختبار
            </button>

          </motion.div>

        )}

      </div>
    </div>
  );
}

export default AssessmentCartoon;


/* ===== Styles ===== */

const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg,#E3F2FD,#BBDEFB)",
  padding: "20px"
};

const card = {
  background: "#fff",
  padding: "40px",
  borderRadius: "25px",
  width: "100%",
  maxWidth: "650px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
};

const title = {
  textAlign: "center",
  fontSize: "26px",
  marginBottom: "25px",
  color: "#1976D2"
};

const progressBar = {
  height: "12px",
  background: "#E0E0E0",
  borderRadius: "10px",
  overflow: "hidden",
  marginBottom: "30px"
};

const progressFill = {
  height: "100%",
  background: "#42A5F5"
};

const questionCard = {
  background: "#E3F2FD",
  borderRadius: "20px",
  padding: "30px",
  textAlign: "center"
};

const questionText = {
  fontSize: "20px",
  fontWeight: "600",
  marginBottom: "20px"
};

const buttonGroup = {
  display: "flex",
  flexDirection: "column",
  gap: "12px"
};

const answerBtn = {
  padding: "15px",
  border: "none",
  borderRadius: "18px",
  color: "#fff",
  fontSize: "17px",
  cursor: "pointer",
  fontWeight: "700"
};

const resultTitle = {
  textAlign: "center",
  fontSize: "24px",
  color: "#1976D2"
};

const low = {
  color: "green",
  fontWeight: "700",
  fontSize: "18px"
};

const medium = {
  color: "orange",
  fontWeight: "700",
  fontSize: "18px"
};

const high = {
  color: "red",
  fontWeight: "700",
  fontSize: "18px"
};

const disclaimer = {
  fontSize: "14px",
  marginTop: "15px",
  color: "#555",
  textAlign: "center"
};
const emojiRow = {
  display: "flex",
  justifyContent: "center",
  gap: "30px",
  fontSize: "28px",
  marginBottom: "10px"
};