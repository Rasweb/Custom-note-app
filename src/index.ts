import { serve } from "bun";
import index from "./index.html";
import { databaseRoute } from "./routes/databaseRoute";


const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

      
      ...databaseRoute,
      "/api/hello/:name": async req => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
