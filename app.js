// Base skills for SB/WB/Review
const SKILLS_BASE = ["Reading","Listening","Speaking","Writing","Grammar","Vocabulary","Pronunciation"];
// OX: remove pronunciation, add everyday_eng
const SKILLS_OX   = ["Reading","Listening","Speaking","Writing","Grammar","Vocabulary","Everyday Eng"];

const SECTIONS = [
  { key:"SB", label:"SB", type:"book" },
  { key:"WB", label:"WB", type:"book" },
  { key:"OX", label:"OX", type:"ox" },
  { key:"PODCAST", label:"Podcast", type:"media_audio" },
  { key:"FILM_SERIES", label:"Film / Series", type:"media_video" },
  { key:"REVIEW", label:"Review", type:"review" },
];

function el(tag, attrs={}, children=[]) {
  const n = document.createElement(tag);
  Object.entries(attrs).forEach(([k,v]) => {
    if (k === "class") n.className = v;
    else if (k === "html") n.innerHTML = v;
    else n.setAttribute(k, v);
  });
  children.forEach(c => n.appendChild(c));
  return n;
}

function setStatus(msg, cls="muted") {
  const s = document.getElementById("status");
  s.className = "status " + cls;
  s.textContent = msg;
}

function todayISO() {
  const d = new Date();
  const pad = (x) => String(x).padStart(2,"0");
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
}

function populateUnits() {
  const unitSel = document.getElementById("unit");
  unitSel.innerHTML = "";
  for (let i=1;i<=12;i++) {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = `Unit ${String(i).padStart(2,"0")}`;
    unitSel.appendChild(opt);
  }
}

function sectionSkills(sec) {
  if (sec.type === "ox") return SKILLS_OX;
  if (sec.type === "book" || sec.type === "review") return SKILLS_BASE;
  return []; // Podcast + Film/Series => no checkboxes
}

function buildSectionsUI() {
  const wrap = document.getElementById("sectionsCard");
  wrap.innerHTML = "";

  SECTIONS.forEach(sec => {
    const card = el("div", { class:"card" });
    card.appendChild(el("h2", { html: sec.label }));

    // Skills (only SB/WB/OX/Review)
    const skillsList = sectionSkills(sec);
    if (skillsList.length) {
      const skillsDiv = el("div", { class:"skills" });
      skillsList.forEach(skill => {
        const id = `${sec.key}_${skill}`;
        const cb = el("input", { type:"checkbox", id });
        const lab = el("label", {}, [cb, document.createTextNode(skill)]);
        skillsDiv.appendChild(lab);
      });
      card.appendChild(skillsDiv);
    }

    // Inputs
    if (sec.key === "SB" || sec.key === "WB" || sec.key === "OX") {
      // Page + Note (same height)
      const grid = el("div", { class:"grid2" });

      const pageBox = el("div", {}, [
        el("div", { class:"small muted", html:"Page" }),
        el("textarea", { id:`${sec.key}_page`, class:"sameheight", placeholder:"P. 6-7" })
      ]);

      const noteBox = el("div", {}, [
        el("div", { class:"small muted", html:"Note" }),
        el("textarea", { id:`${sec.key}_note`, placeholder:"Optional" })
      ]);

      grid.appendChild(pageBox);
      grid.appendChild(noteBox);
      card.appendChild(grid);

    } else if (sec.key === "PODCAST" || sec.key === "FILM_SERIES") {
      // Ref + Min + Note (same height)
      const grid = el("div", { class:"grid3" });

      const refPlaceholder = sec.key === "PODCAST"
        ? "Harry Potter and the Sorcerer's Stone"
        : "The Lord of the Rings: The Fellowship of the Ring";

      const minPlaceholder = sec.key === "PODCAST" ? "30" : "25";

      const refBox = el("div", {}, [
        el("div", { class:"small muted", html:"Ref" }),
        el("textarea", { id:`${sec.key}_ref`, class:"sameheight", placeholder: refPlaceholder })
      ]);

      const minBox = el("div", {}, [
        el("div", { class:"small muted", html:"Min" }),
        el("input", { id:`${sec.key}_min`, type:"number", min:"0", class:"sameheight", placeholder: minPlaceholder })
      ]);

      const noteBox = el("div", {}, [
        el("div", { class:"small muted", html:"Note" }),
        el("textarea", { id:`${sec.key}_note`, placeholder:"Optional" })
      ]);

      grid.appendChild(refBox);
      grid.appendChild(minBox);
      grid.appendChild(noteBox);
      card.appendChild(grid);

    } else {
      // Review: skills + Ref + Note
      const grid = el("div", { class:"grid2" });

      const refBox = el("div", {}, [
        el("div", { class:"small muted", html:"Ref" }),
        el("textarea", { id:`${sec.key}_ref`, class:"sameheight", placeholder:"Unit 01 / Unit 02 ..." })
      ]);

      const noteBox = el("div", {}, [
        el("div", { class:"small muted", html:"Note" }),
        el("textarea", { id:`${sec.key}_note`, placeholder:"Optional" })
      ]);

      grid.appendChild(refBox);
      grid.appendChild(noteBox);
      card.appendChild(grid);
    }

    wrap.appendChild(card);
  });
}

// GitHub config (old style)
function getCfg() {
  return {
    owner: localStorage.getItem("ghOwner") || "",
    repo:  localStorage.getItem("ghRepo") || "",
    token: localStorage.getItem("ghToken") || "",
  };
}

function setCfg(cfg) {
  localStorage.setItem("ghOwner", cfg.owner);
  localStorage.setItem("ghRepo",  cfg.repo);
  localStorage.setItem("ghToken", cfg.token);
}

function loadCfgToInputs() {
  const cfg = getCfg();
  document.getElementById("ghOwner").value = cfg.owner;
  document.getElementById("ghRepo").value  = cfg.repo;
  document.getElementById("ghToken").value = cfg.token;
}

function collectForm() {
  const book = document.getElementById("book").value;
  const unit = parseInt(document.getElementById("unit").value, 10);
  const date = document.getElementById("date").value;

  const sections = {};
  SECTIONS.forEach(sec => {
    const skillsList = sectionSkills(sec);
    const skills = {};
    skillsList.forEach(skill => {
      skills[skill] = document.getElementById(`${sec.key}_${skill}`)?.checked || false;
    });

    if (sec.key === "SB" || sec.key === "WB" || sec.key === "OX") {
      sections[sec.key] = {
        skills,
        page: document.getElementById(`${sec.key}_page`).value.trim(),
        note: document.getElementById(`${sec.key}_note`).value.trim(),
      };
    } else if (sec.key === "PODCAST" || sec.key === "FILM_SERIES") {
      sections[sec.key] = {
        ref: document.getElementById(`${sec.key}_ref`).value.trim(),
        min: document.getElementById(`${sec.key}_min`).value.trim(),
        note: document.getElementById(`${sec.key}_note`).value.trim(),
      };
    } else {
      sections[sec.key] = {
        skills,
        ref: document.getElementById(`${sec.key}_ref`).value.trim(),
        note: document.getElementById(`${sec.key}_note`).value.trim(),
      };
    }
  });

  return { book, unit, date, sections };
}

function skillsLine(arr){ return arr.length ? arr.join(", ") : "-"; }

function toTxt(data) {
  const unitStr = `Unit ${String(data.unit).padStart(2,"0")}`;
  let out = "";
  out += `NEW HEADWAY ${data.book}\n`;
  out += `${unitStr}\n`;
  out += `DATE: ${data.date}\n\n`;

  ["SB","WB","OX"].forEach(key => {
    const s = data.sections[key];
    const checked = Object.entries(s.skills).filter(([,v]) => v).map(([k]) => k);
    out += `${key}:\n`;
    out += `  skills: ${skillsLine(checked)}\n`;
    out += `  page: ${s.page || "-"}\n`;
    out += `  note: ${s.note || "-"}\n\n`;
  });

  // Podcast: fixed skills (no checkboxes)
  {
    const s = data.sections["PODCAST"];
    out += `PODCAST:\n`;
    out += `  skills: listening, pronunciation\n`;
    out += `  ref: ${s.ref || "-"}\n`;
    out += `  min: ${s.min || "-"}\n`;
    out += `  note: ${s.note || "-"}\n\n`;
  }

  // Film/Series: fixed skills (no checkboxes)
  {
    const s = data.sections["FILM_SERIES"];
    out += `FILM_SERIES:\n`;
    out += `  skills: listening, pronunciation\n`;
    out += `  ref: ${s.ref || "-"}\n`;
    out += `  min: ${s.min || "-"}\n`;
    out += `  note: ${s.note || "-"}\n\n`;
  }

  // Review
  {
    const s = data.sections["REVIEW"];
    const checked = Object.entries(s.skills).filter(([,v]) => v).map(([k]) => k);
    out += `REVIEW:\n`;
    out += `  skills: ${skillsLine(checked)}\n`;
    out += `  ref: ${s.ref || "-"}\n`;
    out += `  note: ${s.note || "-"}\n\n`;
  }

  return out;
}

function downloadTextFile(filename, content) {
  const blob = new Blob([content], { type:"text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

async function githubGetFile(owner, repo, path, token) {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`, {
    headers: {
      "Accept": "application/vnd.github+json",
      "Authorization": `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    }
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GET failed (${res.status}): ${await res.text()}`);
  return await res.json();
}

async function githubPutFile(owner, repo, path, contentText, token, message) {
  const existing = await githubGetFile(owner, repo, path, token);
  const body = {
    message,
    content: btoa(unescape(encodeURIComponent(contentText))),
  };
  if (existing && existing.sha) body.sha = existing.sha;

  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`, {
    method: "PUT",
    headers: {
      "Accept": "application/vnd.github+json",
      "Authorization": `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`PUT failed (${res.status}): ${await res.text()}`);
  return await res.json();
}

function buildPath(book, unit, date) {
  const unitFolder = `Unit-${String(unit).padStart(2,"0")}`;
  return `NewHeadway/${book}/${unitFolder}/${date}.txt`;
}

// Events
function bindEvents() {
  document.getElementById("saveCfg").addEventListener("click", () => {
    setCfg({
      owner: document.getElementById("ghOwner").value.trim(),
      repo:  document.getElementById("ghRepo").value.trim(),
      token: document.getElementById("ghToken").value.trim(),
    });
    setStatus("GitHub settings saved (localStorage).", "ok");
  });

  document.getElementById("clearCfg").addEventListener("click", () => {
    localStorage.removeItem("ghToken");
    document.getElementById("ghToken").value = "";
    setStatus("Token cleared. (Owner/Repo kept)", "ok");
  });

  document.getElementById("downloadTxt").addEventListener("click", () => {
    const data = collectForm();
    const txt = toTxt(data);
    const filename = `${data.date}_${data.book}_Unit-${String(data.unit).padStart(2,"0")}.txt`;
    downloadTextFile(filename, txt);
    setStatus("TXT downloaded.", "ok");
  });

  document.getElementById("saveToGitHub").addEventListener("click", async () => {
    try {
      const cfg = getCfg();
      if (!cfg.owner || !cfg.repo || !cfg.token) {
        setStatus("Missing GitHub Owner/Repo/Token. Fill and click 'Save settings'.", "danger");
        return;
      }
      const data = collectForm();
      if (!data.date) {
        setStatus("Date is empty.", "danger");
        return;
      }
      const txt = toTxt(data);
      const path = buildPath(data.book, data.unit, data.date);
      setStatus(`Saving...\npath: ${path}`);
      await githubPutFile(cfg.owner, cfg.repo, path, txt, cfg.token, `Add Headway log: ${data.book} Unit ${data.unit} (${data.date})`);
      setStatus(`Saved ✅\n${path}`, "ok");
    } catch (e) {
      setStatus(String(e), "danger");
    }
  });
}

// init
function init() {
  populateUnits();
  buildSectionsUI();
  loadCfgToInputs();
  document.getElementById("date").value = todayISO();
  bindEvents();
  setStatus("Ready.");
}

document.addEventListener("DOMContentLoaded", init);
