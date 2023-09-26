import * as cheerio from "cheerio";
import express from "express";
import Session from "express-session";
import { generateNonce, SiweErrorType, SiweMessage } from "siwe";
var cors = require("cors");

import db from "./db";

const app = express();
app.use(express.json());
app.use(cors());
app.use(
  Session({
    name: "rizzDocs",
    secret: "rizzDocs-secret",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, sameSite: true },
  })
);

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*           SIWE Authentication and Verification            */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

app.get("/", (req, res) => {
  res.send("Welcome to RizzDocs!");
});

app.get("/nonce", async function (req, res) {
  req.session.nonce = generateNonce();
  res.setHeader("Content-Type", "text/plain");
  res.status(200).send(req.session.nonce);
});

app.post("/verify", async function (req, res) {
  try {
    if (!req.body.message) {
      res
        .status(422)
        .json({ message: "Expected prepareMessage object as body." });
      return;
    }

    let SIWEObject = new SiweMessage(req.body.message);
    const { data: message } = await SIWEObject.verify({
      signature: req.body.signature,
      nonce: req.session.nonce,
    });

    req.session.siwe = message;
    req.session.cookie.expires = new Date(message.expirationTime!);
    req.session.save(() => res.status(200).send(true));
  } catch (e) {
    req.session.siwe = undefined;
    req.session.nonce = undefined;
    console.error(e);
    switch (e) {
      case SiweErrorType.EXPIRED_MESSAGE: {
        const error = e as unknown as Error;
        req.session.save(() =>
          res.status(440).json({ message: error.message })
        );
        break;
      }
      case SiweErrorType.INVALID_SIGNATURE: {
        const error = e as unknown as Error;
        req.session.save(() =>
          res.status(422).json({ message: error.message })
        );
        break;
      }
      default: {
        const error = e as unknown as Error;
        req.session.save(() =>
          res.status(500).json({ message: error.message })
        );
        break;
      }
    }
  }
});

app.get("/logout", (req, _) => {
  req.session.destroy((e) => {
    const error = e as unknown as Error;
    console.log(error);
  });
});

app.get("/personal-information", function (req, res) {
  if (!req.session.siwe) {
    res.status(401).json({ message: "You have to first sign_in" });
    return;
  }
  console.log("User is authenticated!");
  res.setHeader("Content-Type", "text/plain");
  res.send(
    `You are authenticated and your address is: ${req.session.siwe.address}`
  );
});

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*      Grants and Doc-Funds Management with SQLite DB       */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

// Store a new user
app.post("/new-user", (req, res) => {
  // Assuming you have a JSON request body with user information
  const { name, address, avatarUrl } = req.body;

  // Insert the new user into the Users table
  const insertQuery = `
    INSERT INTO Users (name, address, avatarUrl)
    VALUES (?, ?, ?)
  `;

  db.run(insertQuery, [name, address, avatarUrl], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json({
      message: "User created successfully",
      userId: this.lastID,
    });
  });
});

// Get all doc-funds with optional filtering by user
app.get("/grants/ecosystem-doc-funds", (req, res) => {
  const { userId } = req.query;
  let query = "SELECT * FROM DocFunds";

  if (userId) {
    query += ` WHERE createdBy = ${userId}`;
  }

  db.all(query, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json(rows);
  });
});

// Get all projects with optional filtering by user
app.get("/grants/ecosystem-projects", (req, res) => {
  const { userId } = req.query;
  let query = "SELECT * FROM Projects";

  if (userId) {
    query += ` WHERE createdBy = ${userId}`;
  }

  db.all(query, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json(rows);
  });
});

// TODO: get fund by id
// TODO: get project by id

// Create a new project
app.post("/grants/ecosystem-projects", (req, res) => {
  const { createdBy, tokensRequested, emoji, description } = req.body;
  const insertQuery = `
    INSERT INTO Projects (createdBy, tokensRequested, emoji, description)
    VALUES (${createdBy}, ${tokensRequested}, '${emoji}', '${description}')
  `;

  db.run(insertQuery, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json({
      message: "Project created successfully",
      projectId: this.lastID,
    });
  });
});

// Create a new docFund
app.post("/grants/ecosystem-doc-funds", (req, res) => {
  const {
    createdBy,
    tokenAmount,
    emoji,
    description,
    registrationEnd,
    allocationEnd,
    createdAt,
  } = req.body;
  const insertQuery = `
    INSERT INTO DocFunds (createdBy, tokenAmount, emoji, description, registrationEnd, allocationEnd, createdAt)
    VALUES (${createdBy}, ${tokenAmount}, '${emoji}', '${description}', ${registrationEnd}, ${allocationEnd}, ${createdAt})
  `;

  db.run(insertQuery, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json({
      message: "DocFund created successfully",
      docFundId: this.lastID,
    });
  });
});

// Add a project to the showcased projects of a doc-fund
app.post(
  "/grants/ecosystem-doc-funds/showcase/:docFundId/:projectId",
  (req, res) => {
    const { docFundId, projectId } = req.params;
    const insertQuery = `
    INSERT INTO ShowcasedProjects (docFundId, projectId)
    VALUES (${docFundId}, ${projectId})
  `;

    db.run(insertQuery, function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      res.json({ message: "Project added to showcased projects successfully" });
    });
  }
);

// Get all project details under a specific doc-fund
app.get("/grants/ecosystem-doc-funds/projects/:docFundId", (req, res) => {
  const { docFundId } = req.params;
  const selectQuery = `
    SELECT P.*
    FROM Projects P
    INNER JOIN ShowcasedProjects SP ON P.projectId = SP.projectId
    WHERE SP.docFundId = ${docFundId}
  `;

  db.all(selectQuery, (err, projects) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json(projects);
  });
});

// Allocate funds to a doc-fund (expecting an array of allocations)
app.put("/grants/ecosystem-doc-funds/allocate/:docFundId", (req, res) => {
  const { docFundId } = req.params;
  const allocations: { amount: number; projectId: string }[] = req.body; // Expecting an array of allocation objects

  if (!Array.isArray(allocations)) {
    res.status(400).json({
      error: "Invalid request body format. Expected an array of allocations.",
    });
    return;
  }

  // Calculate the total amount of all allocations
  const totalAllocation = allocations.reduce((total, allocation) => {
    return total + parseFloat(allocation.amount as any);
  }, 0);

  // Check if the total allocation exceeds the docFund's tokenAmount
  const checkQuery = `SELECT tokenAmount FROM DocFunds WHERE docFundId = ${docFundId}`;
  db.get(checkQuery, (err, docFund: any) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (!docFund) {
      res.status(404).json({ error: "DocFund not found" });
      return;
    }

    if (totalAllocation > docFund.tokenAmount) {
      res
        .status(400)
        .json({ error: "Total allocation exceeds docFund tokenAmount" });
      return;
    }

    // All validations passed, insert the allocations into the database
    const placeholder = allocations
      .map((allocation) => {
        const { projectId, amount } = allocation;
        return `(${"2"}, ${docFundId}, ${projectId}, ${amount})`;
      })
      .join(",");

    const insertQuery = `
    INSERT INTO AllocatedProjects (allocatedBy, docFundId, projectId, amount)
    VALUES ${placeholder}
    ON CONFLICT (allocatedBy, docFundId, projectId)
    DO UPDATE SET amount = excluded.amount
    `;

    db.run(insertQuery, function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: "Allocations updated successfully!" });
    });
  });
});

// Get all allocators and their allocations under a specific doc-fund
app.get("/grants/ecosystem-doc-funds/allocators/:docFundId", (req, res) => {
  const { docFundId } = req.params;
  const selectQuery = `
    SELECT U.name AS allocatorName, U.address AS allocatorAddress,
           AP.projectId AS allocatedProjectId, AP.amount AS allocationAmount
    FROM AllocatedProjects AP
    INNER JOIN Users U ON AP.allocatedBy = U.userId
    WHERE AP.docFundId = ${docFundId}
  `;

  console.log("what?");

  db.all(selectQuery, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.log("what?");
    console.log(results);

    // Organize the results into the desired JSON structure
    const allocatorsMap = new Map(); // Map to group allocators and their allocations
    results.forEach((row) => {
      const {
        allocatorName,
        allocatorAddress,
        allocatedProjectId,
        allocationAmount,
      } = row as any;

      console.log(
        allocatorName,
        " ",
        allocatorAddress,
        " ",
        allocatedProjectId,
        " ",
        allocationAmount
      );

      if (!allocatorsMap.has(allocatorName)) {
        // Create a new allocator entry if it doesn't exist in the map
        allocatorsMap.set(allocatorName, {
          name: allocatorName,
          address: allocatorAddress,
          allocated: [],
        });
      }

      // Add allocation details to the allocator's allocated array
      const allocator = allocatorsMap.get(allocatorName);
      allocator.allocated.push({
        projectId: allocatedProjectId,
        amount: allocationAmount,
      });
    });

    // Convert the map values to an array to match the specified signature
    const allocatorsArray = Array.from(allocatorsMap.values());

    res.json(allocatorsArray);
  });
});

// table helper
app.post("/edit-table", (req, res) => {
  let query = `DROP TABLE table_name`;

  db.all(query, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json(rows);
  });
});

// userAddress | contentCID | rating | reviewerComments | reviewerAddress
app.get("/documentation/suggestEdit", (req, res) => {
  res.send("");
});

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                 EditorJS Link Previewer                   */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

app.get("/fetchUrl", async (req, res) => {
  let url = req.query.url as string;
  let resHTML = await fetch(new URL(url)).catch((e) => console.log(e));

  if (!resHTML) {
    res.status(500).json({
      success: 0,
      meta: {},
    });
    return;
  }

  const html = await resHTML.text();
  const $ = cheerio.load(html);

  // custom meta-tag function
  const getMetaTag = (value: string) => {
    return (
      $(`meta[name=${value}]`).attr("content") ||
      $(`meta[property="og:${value}"]`).attr("content") ||
      $(`meta[property="twitter:${value}"]`).attr("content")
    );
  };

  const metadataObject = {
    success: 1,
    meta: {
      title: $("title").first().text(),
      description: getMetaTag("description"),
      image: {
        url: getMetaTag("image"),
      },
    },
  };
  res.send(metadataObject);
  return;
});

module.exports = app;

declare module "express-session" {
  interface SessionData {
    nonce: string;
    siwe: SiweMessage;
  }
}
