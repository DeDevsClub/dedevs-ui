┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   GitHub Repo   │───▶│  CI/CD Pipeline  │───▶│  Upstash KV       │
│  (Open Source)  │    │  (Auto Sync)     │    │  (Component     │
│                 │    │                  │    │   Serving)      │
└─────────────────┘    └──────────────────┘    └─────────────────┘
│                       │                       │
│                       │                       ▼
│                       │              ┌─────────────────┐
│                       │              │   Registry API  │
│                       │              │  (Hosted Service)│
│                       │              └─────────────────┘
│                       │                       │
▼                       ▼                       ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│  Static Files   │    │   Vercel Deploy  │    │   CLI Users     │
│  (Fallback)     │    │  (Documentation) │    │  (Fast Access)  │
└─────────────────┘    └──────────────────┘    └─────────────────┘
