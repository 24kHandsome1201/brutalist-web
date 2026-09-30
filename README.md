# BETON — 粗野主义建筑档案馆

A web-brutalist single-page site plus the reusable `brutalist-web` skill that produced it.

- Site: `site/` (static, no build). Serve: `python3 -m http.server 8080 -d site`
- Skill: `.agents/skills/brutalist-web/SKILL.md`
- Screenshots (1440/768/390, full page): `npm i && npx playwright install chromium && node scripts/shoot.mjs http://localhost:8080/ shots`
