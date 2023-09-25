import { createServer } from "http";
import { parse } from "url";
import next from "next";
import backend from "./backend";

const dev = process.env.NODE_ENV !== "production";
const NEXT_PORT = 3001; // Port for the Next.js app
const BACKEND_PORT = 3002; // Port for the Express server

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const nextServer = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url ?? "", true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  });

  nextServer.once("error", (err) => {
    console.error(err);
    process.exit(1);
  });

  nextServer.listen(NEXT_PORT, () => {
    console.log(
      `🔥 [next server]: running at http://localhost:${NEXT_PORT}`
    );
  });

  backend.listen(BACKEND_PORT, () =>
    console.log(
      `🔥 [backend server]: running at http://localhost:${BACKEND_PORT}`
    )
  );
});
