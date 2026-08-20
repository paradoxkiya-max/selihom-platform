# Firebase Staff Access

Selihom uses Firebase Authentication with custom claims for the protected CMS route at `/admin`.

| Account | CMS role | Claim |
|---|---|---|
| `natnael@gmail.com` | Administrator | `role: admin` |
| `paradox@gmail.com` | Staff editor | `role: editor` |

Both accounts also receive `staff: true`. The client CMS guard refreshes the Firebase ID token on sign-in so the latest custom claims are available immediately.

Passwords are intentionally not stored in this repository. The Firebase Admin SDK service-account JSON is also excluded from source control. If a password is shared for initial access, change it immediately after the first successful sign-in and enable the strongest available Firebase Auth password policy.

The production web app reads the Firebase web configuration from its client configuration. Account provisioning and custom-claim assignment must be performed through a protected administrative environment; never place the service-account private key in the frontend, `client/public`, or Git history.
