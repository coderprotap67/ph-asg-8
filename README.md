# ☀️ SunCart – Summer Essentials Store

A modern and responsive summer eCommerce platform built with **Next.js 15 (App Router)** and **Tailwind CSS**. Users can easily browse seasonal products, view deep product analytics/details, manage their profile data, and secure their credentials via robust multi-method authentication.

## 🚀 Live Deployment
🔗 **Live URL:

---

## 🌟 Key Features
### 1. Unified Layout Structure
* **Dynamic Navbar:** Adapts smoothly based on authentication state. 
  * *Logged In:* Displays customized user avatar with a persistent **Logout** trigger.
  * *Logged Out:* Shows intuitive **Login** / **Register** action thresholds.
* **Semantic Footer:** Structured data featuring rich contact grids, absolute social redirects (Facebook, Instagram, GitHub, LinkedIn), and privacy frameworks.

### 2. Static Content Delivery (JSON Hydration)
* Built-in file-system integration using Node `fs` and `path` to hydrate product schemas safely without breaking on dynamic rendering environments.

### 3. Responsive Architectural Hubs
* **Immersive Hero Section:** Dedicated interactive banners highlighting current summer promotions (e.g., *"Summer Sale 50% OFF"*).
* **Curated Content Grids:** Showcases high-demand seasonal items mapping explicit details like dynamic pricing structures, customer satisfaction ratings, and rapid routing links.
* **Value-Added Content Zones:** Custom blocks for *Summer Care Tips* and *Top Brands* to enhance user session value.

### 4. Enterprise-Grade Guarded Routing 🔒
* Strict Server-Side Validation using state headers to secure the dynamic Product Details Page (`/products/[id]`). 
* Unauthorized access triggers an instantaneous redirect schema keeping the structural integrity safe.

### 5. Multi-Channel Security Configuration
* Custom integration via **Better-Auth** supporting isolated Email/Password pipelines alongside Google Social Federated single-sign-on (SSO).

### 6. Dynamic Profiling (Bonus Implementation) 🧩
* Live access to user metadata (Name, Email, Profile Picture).
* Seamless inline profile updating interface modifying client identity state efficiently.

---

## 📦 Core NPM Packages Used

| Package Name | Purpose |
| :--- | :--- |
| **next** | Core Next.js Framework (App Router Engine) |
| **react / react-dom** | Declarative Component Rendering Layers |
| **better-auth** | Multi-adapter authentication server and route managers |
| **mongodb** | Native official driver managing underlying cloud connections |
| **tailwindcss** | Utility-first cascading framework optimizing layout aesthetics |
| **daisyui** | Semantic UI element layers providing cohesive modern styling |
| **react-icons** | Universal vector iconography integration (Fa, Fc sets) |
| **animate.css** | Hardware-accelerated presentation animations |
| **react-hot-toast** | Asynchronous status event notices |
