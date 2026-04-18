# BVWA1-SemestralniPrace-Loucka
StudyPlanner – webová aplikace pro plánování studia a denních úkolů

1) Co přesně bude aplikace dělat

Aplikace umožní uživateli:

plánovat úkoly na konkrétní den
vytvářet studijní bloky (např. „Matika 2h“)
ukládat poznámky
sledovat splněné úkoly
mít přehled dne na jednom místě

→ to jasně splňuje „aplikace dává smysl“


2) Struktura stránek (HTML5 + UX)

Použij sémantické elementy:

Hlavní stránky:

Home / Dashboard
dnešní úkoly
rychlé přidání úkolu
Planner (kalendář / seznam dní)
Notes (poznámky)
About / info


3) Funkce (důležité pro zápočet)

Povinné (aby to prošlo)
přidání úkolu
smazání úkolu
označení jako splněný
ukládání do localStorage
načtení dat po refreshi
Pokročilé (zvedne hodnocení)
filtrování (dnes / splněné / nesplněné)
editace úkolu
deadline (datum)
priorita (low / medium / high)
drag & drop (bonus)


4) JavaScript – co tam MUSÍ být

Aby splnila „pokročilou práci“:

manipulace s DOM (createElement, appendChild)
eventy (click, submit)
práce s polem objektů
localStorage:
localStorage.setItem("tasks", JSON.stringify(tasks));
localStorage.getItem("tasks");
práce s JSON


5) CSS framework

👉 Tailwind
ideální na:
pastel (cute)
neon (dark)


6) Design (vyber si styl)
🎀 Varianta 1 – Cozy / Cute
pastelové barvy (růžová, béžová, světle modrá)
kulaté rohy
jemné stíny
fonty: „soft“

→ působí jako self-care planner

🖤 Varianta 2 – Dark / Neon
černé pozadí
neonové akcenty (modrá, fialová, zelená)
glow efekty

→ působí moderně, „IT vibe“


7) API (volitelné, ale doporučené)

Můžeš přidat:

motivační citáty
nebo třeba počasí


8) Kde budou data

Jednoduchá varianta:

pouze localStorage
žádný backend

→ úplně v pohodě pro tento předmět


9) Jak to popsat u obhajoby

Struktura odpovědi:

Problém
    studenti si potřebují organizovat čas
Řešení
    moje aplikace umožňuje plánování dne
Technologie
    HTML5 (sémantika)
    Tailwind / Bootstrap
    JavaScript (DOM, localStorage)
UX
    jednoduché ovládání
    přehlednost
    responzivita
    Možná rozšíření
    backend
    přihlášení
    sdílení


10) Minimum, které musíš mít (aby to prošlo)

Pokud nestíháš, udělej alespoň:

1 stránku (dashboard)
přidání + mazání úkolů
localStorage
pěkný design
Tailwind/Bootstrap
Shrnutí

Tohle téma je dobré, protože:

splní všechny body zadání
dá se dobře obhájit
není extrémně složité
můžeš ho udělat vizuálně hezké