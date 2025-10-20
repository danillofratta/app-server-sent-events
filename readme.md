# Server-Sent Events (SSE) Client in Angular and Next.js

This project demonstrates how to consume **Server-Sent Events (SSE)**
from a `.NET` backend using two different front-end clients: **Angular**
and **Next.js**.

## 📌 Overview

Server-Sent Events (SSE) provide a simple way for a server to push
real-time updates to the browser over HTTP. Unlike WebSockets, SSE is
one-way (server → client) and built into modern browsers via the
`EventSource` API.

In this repository, we have: - **Backend (.NET)** → SSE endpoint
streaming notifications - **Frontend (Angular)** → SSE client that
listens and displays messages - **Frontend (Next.js)** → SSE client that
listens and displays messages

------------------------------------------------------------------------

## ⚙️ Technologies Used

-   **.NET 8 API** with SSE
-   **Angular 17** for the first client
-   **Next.js 14 (React)** for the second client
-   **TypeScript** in both frontends

------------------------------------------------------------------------

## 🚀 How to Run the Backend (.NET)

1.  Navigate to the backend folder

2.  Run:

    ``` bash
    dotnet restore
    dotnet run
    ```

3.  Your SSE endpoint should be available at:

        https://localhost:7073/api/v1/Notifications/getstream

Ensure **CORS** is enabled in `.NET` so clients can connect:

``` csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", b =>
    {
        b.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});
app.UseCors("AllowAll");
```

------------------------------------------------------------------------

## 🎨 Angular Client Setup

1.  Go to the Angular project folder:

    ``` bash
    cd angular-client
    ```

2.  Install dependencies:

    ``` bash
    npm install
    ```

3.  Start the dev server:

    ``` bash
    ng serve
    ```

4.  Open:

        http://localhost:4200

Angular `NotificationService` example:

``` typescript
getServerEvents() {
  const source = new EventSource('https://localhost:7073/api/v1/Notifications/getstream');
  source.onmessage = event => {
    this.messages.push(event.data);
  };
  source.onerror = error => {
    console.error('SSE Error:', error);
    source.close();
  };
}
```

------------------------------------------------------------------------

## 🎨 Next.js Client Setup

1.  Go to the Next.js project folder:

    ``` bash
    cd nextjs-client
    ```

2.  Install dependencies:

    ``` bash
    npm install
    ```

3.  Start the dev server:

    ``` bash
    npm run dev
    ```

4.  Open:

        http://localhost:3000

Next.js SSE example (`app/page.tsx`):

``` tsx
"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const source = new EventSource("https://localhost:7073/api/v1/Notifications/getstream");

    source.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    source.onerror = (err) => {
      console.error("SSE error:", err);
      source.close();
    };

    return () => {
      source.close();
    };
  }, []);

  return (
    <div style={{ color: "#000", background: "#fff", padding: "1rem" }}>
      <h2>Notificações</h2>
      {messages.map((msg, index) => (
        <div key={index}>{msg}</div>
      ))}
    </div>
  );
}
```

------------------------------------------------------------------------

## 📷 SSE Flow Diagram

![SSE Flow](A_flowchart_in_the_image_illustrates_a_Server-Sent.png)

------------------------------------------------------------------------

## 📜 License

This project is licensed under the MIT License.
