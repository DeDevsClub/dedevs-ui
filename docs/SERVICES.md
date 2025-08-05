# DeDevs UI Services

## Open Source + Premium Services Model

DeDevs UI remains 100% open source while offering premium services for teams and enterprises.

## 🌟 What Stays Free Forever

### Core Components

* All basic UI components
* CLI tool with full functionality
* Documentation and examples
* Community support
* MIT license for all open source components

### Self-Hosted

* Host your own component registry
* Customize and extend components
* No usage limits or restrictions

## 💼 Premium Services

### 1. Hosted Component Registry

* **What**: Managed component hosting and CDN
* **Why**: Skip the infrastructure setup
* **Pricing**: $19/month for teams

### 2. Premium Support

* **What**: Priority support with guaranteed response times
* **Why**: Get help when you need it most
* **Pricing**: $49/month per team

### 3. Custom Component Development

* **What**: We build custom components for your needs
* **Why**: Save development time and ensure quality
* **Pricing**: Custom quotes starting at $2,500

### 4. Enterprise Consulting

* **What**: Architecture guidance and best practices
* **Why**: Ensure successful implementation at scale
* **Pricing**: $200/hour or retainer packages

### 5. Training & Workshops

* **What**: Team training on DeDevs UI best practices
* **Why**: Get your team up to speed quickly
* **Pricing**: $1,500 per workshop

## 🔧 Self-Hosting Guide

Want to keep everything open source? Here's how to self-host:

### Component Registry

```bash
# Clone the registry
git clone https://github.com/DeDevsClub/dedevs-ui.git
cd dedevs-ui

# Build and serve
npm run build:registry
npx serve public -p 3000

# Configure CLI to use your registry
export DEDEVS_REGISTRY_URL=http://localhost:3000
```

### Custom Components

```bash
# Create your own component package
mkdir packages/my-custom-component
cd packages/my-custom-component

# Follow the component structure
npm init
# Add your component code
# Update registry configuration
```

### Private Registry

```bash
# Set up private registry with authentication
# Use your preferred hosting (Vercel, Netlify, AWS, etc.)
# Configure environment variables for API keys
```

## 🤝 Community vs Premium

| Feature | Community (Free) | Premium Services |
|---------|------------------|------------------|
| Core Components | ✅ | ✅ |
| CLI Tool | ✅ | ✅ |
| Documentation | ✅ | ✅ |
| Self-Hosting | ✅ | ✅ |
| Community Support | ✅ | ✅ |
| Hosted Registry | ❌ | ✅ |
| Priority Support | ❌ | ✅ |
| Custom Development | ❌ | ✅ |
| SLA Guarantees | ❌ | ✅ |
| Training | ❌ | ✅ |

## 🚀 Getting Started

### For Open Source Users

```bash
# Install and use immediately
npx dedevs-ui add snippet
```

### For Premium Service Users

```bash
# Sign up at ui.dedevs.com/services
# Get your service API key
npx dedevs-ui auth login <service-key>
# Access hosted registry and premium support
```

## 📞 Contact

* **Sales**: admin@dedevs.club
* **Support**: buns@dedevs.club
* **Custom Development**: buns@dedevs.club

***

*DeDevs UI: Open source components, premium services.*
