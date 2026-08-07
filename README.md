# Pinocchio — Confess

Anonymous confession wall for Shashwat Bulusu's album *Pinocchio* (Aug 21, 2026).

- **Frontend**: `index.html`, static, hosted on GitHub Pages.
- **Backend**: Firebase Firestore, called directly from the browser via the Firebase client SDK. No server to deploy.

## Deploy

### 1. GitHub Pages (frontend)

Repo → **Settings → Pages** → Source: `Deploy from a branch` → Branch: `main`, folder `/ (root)`.
Site will be live at `https://<username>.github.io/<repo>/`.

### 2. Firebase (backend)

1. Go to [console.firebase.google.com](https://console.firebase.google.com) → **Add project** → give it a name (e.g. `pinocchio-confess`) → you can disable Google Analytics for this project → **Create project**.
2. In the left sidebar, go to **Build → Firestore Database** → **Create database** → choose a location close to your audience → start in **production mode** → **Enable**.
3. Go to the **Rules** tab of Firestore, replace the contents with [`firestore.rules`](firestore.rules) from this repo, and click **Publish**. This allows anyone to submit/read confessions but blocks edits and deletes, and validates that submissions are the right shape (text ≤ 200 chars, word from the fixed list).
4. Go to **Project settings** (gear icon, top left) → **General** tab → scroll to **Your apps** → click the **Web** icon (`</>`) → register an app (nickname e.g. `confess-web`, no need for Firebase Hosting) → copy the `firebaseConfig` object it shows you.
5. Paste those values into the `firebaseConfig` object near the top of the `<script type="module">` block in `index.html`.
6. Commit and push — GitHub Pages will pick up the change automatically.

Firebase's free (Spark) tier covers this comfortably at any realistic scale for a confession wall.
