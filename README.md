# 🦉 Buho - AI Blockchain Agent

Agente de IA para consultas sobre blockchain, direcciones, tokens y transacciones.

## 🏗 Arquitectura

- **Frontend**: Next.js 15, App Router, TypeScript, TailwindCSS
- **Backend**: Next.js API Route (`/api/agent`)
- **Workflow Engine**: n8n (ejecuta el agente de IA)

## 🚀 Instalación

1. **Instalar dependencias:**
```bash
npm install
```

2. **Configurar variables de entorno:**

Edita el archivo `.env.local` y agrega tu URL del webhook de n8n:

```bash
N8N_WEBHOOK_URL=https://tu-n8n-instance.com/webhook/tu-webhook-id
```

## 🎯 Uso

1. **Iniciar el servidor de desarrollo:**
```bash
npm run dev
```

2. **Abrir en el navegador:**
```
http://localhost:3000
```

3. **Hacer preguntas al agente:**
- Escribe una consulta en el chat
- Ejemplo: "¿Qué transacciones tiene esta wallet?"
- El agente procesará tu consulta a través de n8n y te responderá

## 📁 Estructura del Proyecto

```
buho/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── agent/
│   │   │       └── route.ts       # API route que comunica con n8n
│   │   ├── components/
│   │   │   ├── ChatInput.tsx      # Input del chat
│   │   │   └── ChatMessage.tsx    # Mensaje del chat
│   │   ├── page.tsx               # Página principal del chat
│   │   └── layout.tsx             # Layout raíz
│   └── lib/
│       └── utils.ts               # Utilidades
├── .env.local                      # Variables de entorno
└── package.json
```

## 🔌 API Route

La API recibe mensajes y los reenvía a n8n:

**Endpoint:** `POST /api/agent`

**Request:**
```json
{
  "message": "¿Qué transacciones tiene esta wallet?",
  "sessionId": "session-1234567890-abc123"
}
```

**Response:**
```json
{
  "reply": "Respuesta procesada por n8n..."
}
```

## 🧩 Componentes

### ChatInput
- Input de texto con botón de envío
- Soporte para Enter (enviar) y Shift+Enter (nueva línea)
- Estado de loading

### ChatMessage
- Mensaje estilo bubble
- Usuario: azul (`bg-blue-600`)
- Agente: gris oscuro (`bg-neutral-800`)

## 📦 n8n Workflow

El webhook de n8n debe recibir:

```json
{
  "chatInput": "texto del usuario",
  "sessionId": "session-1234567890-abc123"
}
```

Y devolver:

```json
{
  "reply": "respuesta procesada"
}
```

**Nota:** El `sessionId` se genera automáticamente al cargar la página y se mantiene durante toda la sesión del usuario. Es necesario para que funcione el nodo de memoria (Simple Memory) en n8n.

## 🛠 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build producción
npm run build

# Iniciar producción
npm start

# Linter
npm run lint
```

## 📝 Notas Importantes

- ❌ NO uses `OPENAI_API_KEY` en el frontend/backend
- ✅ TODO el procesamiento de IA ocurre en n8n
- ✅ Next.js solo maneja la UI y redirige a n8n
- ✅ Mobile-first design
- ✅ Dark mode compatible

## 🦉 Happy coding!
