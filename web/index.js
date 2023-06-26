// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";

import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import GDPRWebhookHandlers from "./gdpr.js";
import { connect } from "./database/connection.js";
import { Badge } from "./models/User.model.js";

const PORT = parseInt(
  process.env.BACKEND_PORT || process.env.PORT || "3000",
  10
);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
);

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js

app.use("/api/*", shopify.validateAuthenticatedSession());

app.use(express.json());
app.use(express.static("public"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/api/products/count", async (_req, res) => {
  const countData = { count: "hellow" };
  console.log(countData);
  res.status(200).send(countData);
});
app.get("/products/newBunlded.js", async (_req, res) => {
  const countData = "hello";
  console.log(countData);
  res.status(200).send(countData);
});

app.get("/api/products/create", async (_req, res) => {
  const data = { title: "Burton Custom Freestyle 151" };

  console.log(data); // Output the data to the console

  res.status(200).send(data);
});

app.get("/api/badges", async (_req, res) => {
  try {
    const badges = await Badge.find();
    res.json(badges);
    console.log(badges);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/badges", async (req, res) => {
  try {
    const badges = req.body;

    const createdBadges = [];

    for (const key in badges) {
      if (badges.hasOwnProperty(key)) {
        const { name, url, state } = badges[key];
        // Check if a badge with the same name and URL already exists
        const existingBadge = await Badge.findOne({ name, url });
        if (existingBadge) {
          // Update the state if the badge already exists
          existingBadge.state = state;
          // Save the changes to the existing badge
          await existingBadge.save();
          createdBadges.push(existingBadge);
        } else {
          // Create a new badge if it doesn't already exist
          const newBadge = await Badge.create({ name, url, state });
          createdBadges.push(newBadge);
        }
      }
    }

    res.json(createdBadges);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});
connect()
  .then(() => {
    try {
      app.listen(PORT, () => {
        console.log(`Server connected to http://localhost:${PORT}`);
      });
    } catch (error) {
      console.log("Cannot connect to the server");
    }
  })
  .catch((error) => {
    console.log("Invalid database connection...!", error);
  });
