-- Table for users
CREATE TABLE Users (
    userId INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    avatarUrl TEXT NOT NULL
);

-- Table for docFunds
CREATE TABLE DocFunds (
    docFundId INTEGER PRIMARY KEY,
    createdBy TEXT NOT NULL,
    tokenAmount REAL NOT NULL,
    emoji TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    registrationEnd INTEGER NOT NULL,
    allocationEnd INTEGER NOT NULL,
    createdAt INTEGER NOT NULL,
    FOREIGN KEY (createdBy) REFERENCES Users(userId)
);

-- Table for allocated projects within allocators
CREATE TABLE AllocatedProjects (
    allocationId INTEGER PRIMARY KEY,
    allocatedBy TEXT NOT NULL,
    docFundId INTEGER NOT NULL,
    projectId INTEGER NOT NULL,
    amount REAL NOT NULL,
    FOREIGN KEY (allocatedBy) REFERENCES Users(userId),
    FOREIGN KEY (docFundId) REFERENCES DocFunds(docFundId),
    FOREIGN KEY (projectId) REFERENCES Projects(projectId),
    UNIQUE (allocatedBy, docFundId, projectId)
);


-- Table for projects
CREATE TABLE Projects (
    projectId INTEGER PRIMARY KEY,
    createdBy TEXT NOT NULL,
    tokensRequested REAL NOT NULL,
    emoji TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    FOREIGN KEY (createdBy) REFERENCES Users(userId)
);

-- Table for projects showcase
CREATE TABLE ShowcasedProjects (
  showcaseId INTEGER PRIMARY KEY,
  docFundId INTEGER NOT NULL,
  projectId INTEGER NOT NULL,
  FOREIGN KEY (docFundId) REFERENCES DocFunds(docFundId),
  FOREIGN KEY (projectId) REFERENCES Projects(projectId)
);
