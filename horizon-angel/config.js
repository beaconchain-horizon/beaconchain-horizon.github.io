// Horizon Angel — Config (auto-detect mode)
const CONFIG = (() => {
  const host = window.location.hostname;
  const isLocal = host === "localhost" || host === "127.0.0.1";
  const isLiara = host.includes("liara.run") || host.includes("liara.ir");
  const isGitHubPages = host.includes("github.io");
  const params = new URLSearchParams(window.location.search);
  const forced = params.get("mode");
  let mode = "demo";
  let backend = null;
  if (isLocal) { mode = "local"; backend = "http://127.0.0.1:8080/api/v1"; }
  else if (isLiara) { mode = "production"; backend = "https://horizon-switch.liara.run/api/v1"; }
  if (forced === "demo") { mode = "demo"; backend = null; }
  if (forced === "live" && backend) mode = "production";
  return {
    MODE: mode,
    DEMO_MODE: mode === "demo",
    BACKEND_URL: backend,
    SWITCH_URL: backend,
    POLL_INTERVAL_MS: 5000,
    TIMEOUT_MS: 10000,
    APP_NAME: "Horizon Angel",
    APP_VERSION: "1.0.0"
  };
})();
if (CONFIG.DEMO_MODE === false) console.log("[Horizon] Mode:", CONFIG.MODE, "Backend:", CONFIG.BACKEND_URL);
const HorizonAPI = {
  async fetch(endpoint, options = {}) {
    if (CONFIG.DEMO_MODE) return this._mock(endpoint);
    const url = CONFIG.BACKEND_URL + endpoint;
    const token = localStorage.getItem("horizon_admin_token") || "";
    const r = await fetch(url, { ...options, headers: { "Content-Type": "application/json", "X-Admin-Token": token, ...(options.headers||{}) } });
    if (!r.ok) throw new Error("HTTP " + r.status);
    return r.json();
  },
  _mock(endpoint) {
    const db = {
      "/industrial/dashboard": { alerts: [], readings_count: 10001, sensors: [{id:"tps-001",type:"temperature",status:"active"}], sites: [{id:"tps",name:"TPS Refinery"}], tamper_count: 0 },
      "/block/list": { blocks: [{num:0,hash:"9b1976dd..."},{num:1,hash:"8b16d391..."},{num:2,hash:"4e42afe4..."}] },
      "/tx/list": { transactions: [{id:"tx_001",from:"bank_markazi",to:"bank_melli",amount:1000000,status:"confirmed"}] }
    };
    return Promise.resolve(db[endpoint] || {});
  }
};
