import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

/* ─────────────────────────────────────────
   GLOBAL STYLES  (injected once via <style>)
───────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --ink:     #0d0d0d;
      --paper:   #f5f1eb;
      --accent:  #e85d26;
      --accent2: #2660e8;
      --card-bg: #ffffff;
      --border:  #d6cfc4;
      --success: #1a8c5b;
      --error:   #c0392b;
      --radius:  12px;
      --shadow:  0 4px 24px rgba(13,13,13,.09);
    }

    html, body, #root { height: 100%; }

    body {
      font-family: 'DM Sans', sans-serif;
      background: var(--paper);
      color: var(--ink);
      min-height: 100vh;
    }

    /* ── Navbar ── */
    .navbar {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 0 40px;
      height: 64px;
      background: var(--ink);
      position: sticky;
      top: 0;
      z-index: 100;
      border-bottom: 3px solid var(--accent);
    }
    .navbar-brand {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 1.25rem;
      color: var(--paper);
      letter-spacing: -0.5px;
      margin-right: auto;
    }
    .navbar a {
      font-family: 'Syne', sans-serif;
      font-weight: 600;
      font-size: .85rem;
      letter-spacing: .5px;
      text-transform: uppercase;
      text-decoration: none;
      color: #a09a92;
      padding: 6px 14px;
      border-radius: 6px;
      transition: color .2s, background .2s;
    }
    .navbar a:hover { color: var(--paper); background: rgba(255,255,255,.07); }
    .navbar a.active { color: var(--paper); background: var(--accent); }

    /* ── Page wrapper ── */
    .page { max-width: 960px; margin: 0 auto; padding: 48px 24px; }

    /* ── Home ── */
    .home-hero { text-align: center; padding: 48px 0 32px; }
    .home-hero h1 {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: clamp(2.4rem, 6vw, 4rem);
      letter-spacing: -2px;
      line-height: 1;
      color: var(--ink);
    }
    .home-hero h1 span { color: var(--accent); }
    .home-stat {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      margin-top: 32px;
      background: var(--card-bg);
      border: 2px solid var(--border);
      border-radius: var(--radius);
      padding: 20px 32px;
      box-shadow: var(--shadow);
    }
    .home-stat .num {
      font-family: 'Syne', sans-serif;
      font-size: 3rem;
      font-weight: 800;
      color: var(--accent2);
      line-height: 1;
    }
    .home-stat .label { font-size: .9rem; color: #666; }
    .home-empty { margin-top: 24px; color: #888; font-size: .95rem; }

    /* ── Students ── */
    .section-title {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 2rem;
      letter-spacing: -1px;
      margin-bottom: 32px;
    }
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 20px;
    }
    .user-card {
      background: var(--card-bg);
      border: 1.5px solid var(--border);
      border-radius: var(--radius);
      padding: 24px;
      box-shadow: var(--shadow);
      transition: transform .2s, box-shadow .2s;
    }
    .user-card:hover { transform: translateY(-4px); box-shadow: 0 10px 32px rgba(13,13,13,.12); }
    .user-card-avatar {
      width: 48px; height: 48px;
      border-radius: 50%;
      background: var(--accent);
      color: #fff;
      display: flex; align-items: center; justify-content: center;
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 1.2rem;
      margin-bottom: 16px;
    }
    .user-card h3 { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1rem; margin-bottom: 8px; }
    .user-card p { font-size: .83rem; color: #666; margin-bottom: 4px; display: flex; align-items: center; gap: 6px; }
    .user-card p svg { flex-shrink: 0; }

    .loading-state, .error-state {
      text-align: center;
      padding: 80px 0;
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: 1.2rem;
    }
    .error-state { color: var(--error); }
    .spinner {
      width: 40px; height: 40px;
      border: 4px solid var(--border);
      border-top-color: var(--accent);
      border-radius: 50%;
      animation: spin .7s linear infinite;
      margin: 0 auto 16px;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* ── Form ── */
    .form-card {
      background: var(--card-bg);
      border: 1.5px solid var(--border);
      border-radius: var(--radius);
      padding: 40px;
      box-shadow: var(--shadow);
      max-width: 560px;
    }
    .form-group { margin-bottom: 22px; }
    .form-group label {
      display: block;
      font-family: 'Syne', sans-serif;
      font-weight: 600;
      font-size: .82rem;
      text-transform: uppercase;
      letter-spacing: .6px;
      margin-bottom: 7px;
    }
    .form-group input[type="text"],
    .form-group input[type="email"],
    .form-group input[type="tel"] {
      width: 100%;
      padding: 11px 14px;
      border: 1.5px solid var(--border);
      border-radius: 8px;
      font-family: 'DM Sans', sans-serif;
      font-size: .95rem;
      background: var(--paper);
      transition: border-color .2s;
      outline: none;
    }
    .form-group input:focus { border-color: var(--accent2); }
    .form-group input.has-error { border-color: var(--error); }
    .field-error { font-size: .8rem; color: var(--error); margin-top: 5px; }

    .radio-group { display: flex; gap: 24px; margin-top: 4px; }
    .radio-group label {
      display: flex; align-items: center; gap: 6px;
      font-size: .95rem; font-family: 'DM Sans', sans-serif;
      text-transform: none; letter-spacing: 0; font-weight: 400;
      cursor: pointer;
    }

    .btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 12px 28px;
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: .88rem;
      letter-spacing: .4px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: transform .15s, opacity .15s;
    }
    .btn:hover { opacity: .88; transform: translateY(-1px); }
    .btn-primary { background: var(--accent); color: #fff; }
    .btn-success { background: var(--success); color: #fff; }
    .btn-danger  { background: var(--error); color: #fff; }
    .btn-neutral { background: var(--ink); color: #fff; }

    .success-msg {
      background: #d4edda;
      border: 1.5px solid #a8d5b5;
      color: var(--success);
      border-radius: 8px;
      padding: 14px 18px;
      margin-top: 20px;
      font-weight: 500;
    }

    /* newly added student preview */
    .student-preview {
      margin-top: 32px;
      background: #f0f7ff;
      border: 1.5px solid #bdd4f5;
      border-radius: var(--radius);
      padding: 20px 24px;
    }
    .student-preview h4 {
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      margin-bottom: 10px;
      color: var(--accent2);
    }
    .student-preview p { font-size: .88rem; color: #444; margin-bottom: 4px; }

    /* ── Counter ── */
    .counter-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 32px;
      padding: 64px 0;
    }
    .counter-value {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 7rem;
      line-height: 1;
      transition: color .3s;
    }
    .counter-value.zero  { color: var(--error); }
    .counter-value.pos   { color: var(--success); }
    .counter-btns { display: flex; gap: 16px; }
  `}</style>
);

/* ─────────────────────────────────────────
   NAVBAR
───────────────────────────────────────── */
function Navbar() {
  return (
    <nav className="navbar">
      <span className="navbar-brand">📚 EduPortal</span>
      <NavLink to="/"         end>Home</NavLink>
      <NavLink to="/students">Students</NavLink>
      <NavLink to="/add">Add Student</NavLink>
      <NavLink to="/counter">Counter</NavLink>
    </nav>
  );
}

/* ─────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────── */
function Home() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("students") || "[]");
    setStudents(data);
  }, []);

  return (
    <div className="page">
      <div className="home-hero">
        <h1>Student <span>Portal</span></h1>
        {students.length === 0 ? (
          <p className="home-empty">No students added yet.</p>
        ) : (
          <div className="home-stat">
            <span className="num">{students.length}</span>
            <span className="label">Student{students.length !== 1 ? "s" : ""} registered</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   STUDENTS PAGE
───────────────────────────────────────── */
function Students() {
  const [users, setUsers]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((r) => { if (!r.ok) throw new Error("Failed to fetch"); return r.json(); })
      .then((data) => { setUsers(data.slice(0, 6)); setLoading(false); })
      .catch((e) => { setError(e.message); setLoading(false); });
  }, []);

  if (loading)
    return (
      <div className="page loading-state">
        <div className="spinner" />
        Loading students…
      </div>
    );

  if (error)
    return <div className="page error-state">⚠️ {error}</div>;

  return (
    <div className="page">
      <h2 className="section-title">All Students</h2>
      <div className="cards-grid">
        {users.map((u) => (
          <div className="user-card" key={u.id}>
            <div className="user-card-avatar">{u.name[0]}</div>
            <h3>{u.name}</h3>
            <p>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              {u.email}
            </p>
            <p>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
              {u.phone}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   ADD STUDENT PAGE
───────────────────────────────────────── */
const emptyForm = { name: "", email: "", phone: "", gender: "Male" };

function AddStudent() {
  const [form, setForm]       = useState(emptyForm);
  const [errors, setErrors]   = useState({});
  const [success, setSuccess] = useState(false);
  const [latest, setLatest]   = useState(null);

  const validate = () => {
    const e = {};
    if (!form.name.trim())                     e.name   = "Name cannot be empty.";
    if (!form.email.includes("@"))             e.email  = "Email must contain '@'.";
    if (!/^\d{10}$/.test(form.phone))          e.phone  = "Phone must be exactly 10 digits.";
    return e;
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((err) => ({ ...err, [e.target.name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); setSuccess(false); return; }

    const existing = JSON.parse(localStorage.getItem("students") || "[]");
    const student = { ...form, id: Date.now() };
    localStorage.setItem("students", JSON.stringify([...existing, student]));
    setLatest(student);
    setSuccess(true);
    setForm(emptyForm);
    setErrors({});
  };

  return (
    <div className="page">
      <h2 className="section-title">Add Student</h2>
      <div className="form-card">
        <form onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" value={form.name}
              className={errors.name ? "has-error" : ""}
              onChange={handleChange} placeholder="Full name" />
            {errors.name && <p className="field-error">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={form.email}
              className={errors.email ? "has-error" : ""}
              onChange={handleChange} placeholder="student@example.com" />
            {errors.email && <p className="field-error">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" type="tel" value={form.phone}
              className={errors.phone ? "has-error" : ""}
              onChange={handleChange} placeholder="10-digit number" />
            {errors.phone && <p className="field-error">{errors.phone}</p>}
          </div>

          {/* Gender */}
          <div className="form-group">
            <label>Gender</label>
            <div className="radio-group">
              {["Male", "Female"].map((g) => (
                <label key={g}>
                  <input type="radio" name="gender" value={g}
                    checked={form.gender === g}
                    onChange={handleChange} />
                  {g}
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="btn btn-primary">Submit Student</button>
        </form>

        {success && (
          <div className="success-msg">✅ Student added successfully!</div>
        )}
      </div>

      {latest && (
        <div className="student-preview">
          <h4>Recently Added</h4>
          <p><strong>Name:</strong> {latest.name}</p>
          <p><strong>Email:</strong> {latest.email}</p>
          <p><strong>Phone:</strong> {latest.phone}</p>
          <p><strong>Gender:</strong> {latest.gender}</p>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   COUNTER PAGE
───────────────────────────────────────── */
function Counter() {
  const [value, setValue] = useState(0);

  return (
    <div className="page">
      <h2 className="section-title">Counter</h2>
      <div className="counter-wrap">
        <div className={`counter-value ${value === 0 ? "zero" : "pos"}`}>{value}</div>
        <div className="counter-btns">
          <button className="btn btn-success" onClick={() => setValue((v) => v + 1)}>＋ Increment</button>
          <button className="btn btn-danger"  onClick={() => setValue((v) => Math.max(0, v - 1))}>－ Decrement</button>
          <button className="btn btn-neutral" onClick={() => setValue(0)}>↺ Reset</button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   APP ROOT
───────────────────────────────────────── */
export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Navbar />
      <Routes>
        <Route path="/"         element={<Home />} />
        <Route path="/students" element={<Students />} />
        <Route path="/add"      element={<AddStudent />} />
        <Route path="/counter"  element={<Counter />} />
      </Routes>
    </BrowserRouter>
  );
}
