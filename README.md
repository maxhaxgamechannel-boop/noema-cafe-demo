# NOEMA – Café, Brunch, Bar · Website-Entwurf (DEMO)

> **Unverbindlicher Demo-Entwurf.** Dies ist **keine** offizielle Website von NOEMA.
> Der Entwurf soll dem Betrieb vorgestellt werden und darf ohne dessen Zustimmung
> nicht als offizielle Website ausgegeben werden.

Statische Seite ohne Build, Backend, Datenbank, Formulare, Cookies, Tracking oder Nutzereingaben.
Keine externen Schriften, Skripte oder Bilder – alles liegt lokal.

## Lokal ansehen
- `index.html` direkt im Browser öffnen, oder
- in diesem Ordner `npx serve -l 8080` ausführen und http://localhost:8080 öffnen.

## Struktur
| Datei | Inhalt |
|---|---|
| `index.html` | Alle Texte (Abschnitte mit `<!-- ===== … ===== -->` markiert) |
| `css/styles.css` | Gestaltung; Farben und Schrift oben in `:root` |
| `js/app.js` | Mobiles Menü, geschriebener Name, Einblenden und scrollabhängige Deko |
| `fonts/` | Fraunces und DM Sans (woff2) mit Lizenztexten |
| `_headers` | Sicherheits-Header für Netlify/Cloudflare Pages (GitHub Pages ignoriert die Datei) |
| `favicon.svg` | Vorläufiges Symbol (eigene Grafik, kein NOEMA-Logo) |

## Gestaltung
Beige und Schwarz mit Matcha-Grün und Pfirsich als Akzent – eigenständig, passend zum beschriebenen
modernen, gesundheitsbewussten Konzept. Es wurden keine offiziellen Fotos, Logos oder Farben
von NOEMA gefunden; die Grafik im Einstieg (Kreise und Blätter) ist ein abstrakter Platzhalter
(kein Foto) und im Code mit `PLATZHALTER-GRAFIK` markiert.

## Schriften
- **Fraunces** (Überschriften, Name) und **DM Sans** (Fließtext), lokal in `fonts/` – keine Anfrage an Google o. Ä.
- Lizenz: SIL Open Font License 1.1, auch kommerziell nutzbar; Lizenztexte liegen in `fonts/OFL-*.txt`.
- Quelle: npm-Pakete `@fontsource-variable/fraunces` und `@fontsource-variable/dm-sans` (Version 5.3.0).

## Animationen
- Name „noema.“ wird beim Laden **geschrieben**: Kontur jedes Buchstabens zeichnet sich nacheinander, dann füllt sich die Schrift; zum Schluss ein grüner Schwung darunter.
- Hintergrund-Formen (Kreise, Ringe, Blätter, Punkte), das schräge Laufband, der grüne Schein im Abschnitt „Anfahrt“ und der Fortschrittsbalken unter dem Kopf **reagieren aufs Scrollen**.
- Inhalte, Kacheln und Linien blenden beim Scrollen versetzt ein; Kacheln und Karten heben sich beim Hover.
- Navigation schimmert langsam; Unterstrich beim Hover (Desktop); Lichtreflex auf Buttons.
- Ruhige Dauer-Details: pulsierender Punkt bei „Eröffnung“, wandernder Farbrahmen um die Speisekarten-Box, leicht schwingende Blätter.
Animiert werden nur `opacity`, `transform`, `stroke-dashoffset` und `background-position` (kein Layout).
Bei „Bewegung reduzieren“ (`prefers-reduced-motion`) ist alles statisch; ohne JavaScript ist alles sofort sichtbar.
Im Windows-Kontrastmodus ersetzt normale Linkfarbe den Schimmer-Text.

## Anpassen nach Feedback
- **Texte, Speisekarte, Öffnungszeiten, Kontakt:** direkt in `index.html`.
- **Fehlende Angaben** sind als gestrichelte Markierung „noch zu ergänzen“ / „vorläufig“ (`<span class="todo">`) sichtbar.
- **Farben:** `--sand`, `--ink`, `--matcha`, `--matcha-deep`, `--peach` usw. in `css/styles.css`.
- **Hintergrund-Formen:** in `index.html` im Block `.deco`; Tempo über `data-speed`, Drehung über `data-rot`.
- **Foto:** `.hero-art` in `index.html` durch `<img>` mit autorisiertem Foto ersetzen.

## Demo-Hinweis entfernen (erst nach Freigabe durch NOEMA)
Alle Stellen sind mit `DEMO-HINWEIS` kommentiert:
1. `<p class="demo-hinweis">` im Kopfbereich löschen.
2. `<p class="foot-demo">` in der Fußzeile löschen.
3. `<meta name="robots" content="noindex, nofollow">` entfernen.
4. „DEMO-Entwurf“ aus `<title>`, `description`, `og:*` und `twitter:*` entfernen.
5. Optional den Block `DEMO-HINWEIS` in `css/styles.css` löschen.

## Recherche (Stand: 04.11.2026)
| Angabe | Ergebnis | Quelle |
|---|---|---|
| Name / Schreibweise | „noema.“ – Café, Brunch, Bar | Stellenanzeige des Betreibers (Kleinanzeigen, 09.09.2026); Lausitzer Rundschau |
| Adresse | Gerichtsplatz 1, 03046 Cottbus | Google-Maps-Eintrag „noema“; neueroeffnung.info |
| Konzept | Café, Matcha, Trend-Getränke, Fancy & Healthy Food, Kaffeehaus-Events; gesundheitsbewusst und „instagrammable“ | Stellenanzeige; Lausitzer Rundschau, 21.10.2026 (Update 23.10.2026, Rest hinter Bezahlschranke) |
| Eröffnung | **voraussichtlich** Fr., 6. November 2026 – nicht vom Betrieb bestätigt | neueroeffnung.info, bald-in.de |
| Öffnungszeiten | nicht gefunden | Google Maps ohne Angabe |
| Telefon | nicht gefunden | Google Maps ohne Angabe |
| E-Mail | In der Stellenanzeige steht `info@noema-cafe.de`. **Nicht auf der Seite verwendet**, da nur aus einer Stellenanzeige und nicht als Gästekontakt bestätigt. | Kleinanzeigen |
| Website | keine; die Domain `noema-cafe.de` zeigt nur eine Standardseite des Hosters | eigene Prüfung |
| Social Media | kein eindeutig zuordenbares Profil gefunden (`@noema.cafe` existiert, ist aber leer und nicht zuordenbar → nicht verwendet) | Instagram |
| Speisekarte, Preise, Reservierung, Events | nicht veröffentlicht | – |
| Fotos | keine autorisierten Fotos vorhanden | – |

Der in der Presse genannte Inhaber wird auf der Seite bewusst nicht namentlich erwähnt.

URLs:
- https://www.lr-online.de/lausitz/cottbus/cafe-in-cottbus-healthy-und-fancy-neue-location-wirbt-mit-modernem-konzept-79561005.html
- https://www.neueroeffnung.info/cottbus/noema-cafe-brunch-bar
- https://bald-in.de/laden/e831617f-8174-4538-8fce-05ea0d9f8981
- https://www.kleinanzeigen.de/s-anzeige/barista-bar-service-koch-auf-minijob-teilzeit-vollzeit/3507623983-107-7748
- https://www.google.com/maps/search/?api=1&query=Noema+Gerichtsplatz+1+03046+Cottbus

## Offene Punkte vor einer echten Veröffentlichung
- [ ] Zustimmung von NOEMA zu Entwurf, Texten und Gestaltung
- [ ] Eröffnungsdatum bestätigen (bis dahin als „vorläufig“ markiert)
- [ ] Öffnungszeiten
- [ ] Telefon und/oder E-Mail für Gäste; ob reserviert werden kann
- [ ] Speisekarte, Getränke, Preise, Allergene
- [ ] Offizielle Social-Media-Profile
- [ ] Kaffeehaus-Events: Termine
- [ ] Logo, Hausfarben, autorisierte Fotos
- [ ] Impressum und Datenschutzerklärung (vom Betrieb bzw. rechtlich geprüft – nicht erfunden)
- [ ] Domain `noema-cafe.de` verbinden, HTTPS, Sicherheits-Header beim Hoster, Vorschaubild (`og:image`)
- [ ] Demo-Hinweis und `noindex` entfernen (siehe oben)

## Sicherheit – umgesetzt und Grenzen
- Content-Security-Policy (nur eigene Dateien, kein Inline-Code, keine Formulare), `noopener noreferrer` bei externen Links.
- Keine Nutzereingaben, keine Cookies, keine Drittanbieter.
- Grenzen: Auf GitHub Pages lassen sich keine eigenen HTTP-Header setzen (z. B. `frame-ancestors`, `X-Frame-Options`);
  dafür ist `_headers` für andere Hoster vorbereitet. Absolute Sicherheit kann keine Website garantieren.
