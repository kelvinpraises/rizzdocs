import { useCallback } from "react";

interface User {
  name: string;
  address: string;
  avatarUrl: string;
}

interface Project {
  tokensRequested: number;
  emoji: string;
  description: string;
}

interface DocFund {
  tokenAmount: number;
  emoji: string;
  description: string;
  registrationEnd: string; // You may need to update this to the appropriate data type
  allocationEnd: string; // You may need to update this to the appropriate data type
  createdAt: string; // You may need to update this to the appropriate data type
}

interface Allocation {
  amount: number;
  projectId: string;
}

const useBackendAPI = () => {
  const BACKEND_ADDR = "http://localhost:3002";

  const createUser = useCallback(async (user: User, callback: () => void) => {
    const res = await fetch(`${BACKEND_ADDR}/new-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      credentials: "include",
    });

    if ((await res.json()).userId) {
      callback();
    }
  }, []);

  const getDocFunds = useCallback(async (userId: string) => {
    const res = await fetch(
      `${BACKEND_ADDR}/grants/ecosystem-doc-funds?userId=${userId}`,
      {
        credentials: "include",
      }
    );

    return await res.json();
  }, []);

  const getProjects = useCallback(async (userId: string) => {
    const res = await fetch(
      `${BACKEND_ADDR}/grants/ecosystem-projects?userId=${userId}`,
      {
        credentials: "include",
      }
    );

    return await res.json();
  }, []);

  const createProject = useCallback(
    async (project: Project, callback: () => void) => {
      const res = await fetch(`${BACKEND_ADDR}/grants/ecosystem-projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
        credentials: "include",
      });

      if ((await res.json()).projectId) {
        callback();
      }
    },
    []
  );

  const createDocFund = useCallback(
    async (docFund: DocFund, callback: () => void) => {
      const res = await fetch(`${BACKEND_ADDR}/grants/ecosystem-doc-funds`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(docFund),
        credentials: "include",
      });

      if ((await res.json()).docFundId) {
        callback();
      }
    },
    []
  );

  const addProjectToDocFund = useCallback(
    async (docFundId: string, projectId: string, callback: () => void) => {
      const res = await fetch(
        `${BACKEND_ADDR}/grants/ecosystem-doc-funds/showcase/${docFundId}/${projectId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (res.ok) {
        callback();
      }
    },
    []
  );

  const getDocFundProjects = useCallback(async (docFundId: string) => {
    const res = await fetch(
      `${BACKEND_ADDR}/grants/ecosystem-doc-funds/projects/${docFundId}`,
      {
        credentials: "include",
      }
    );

    return await res.json();
  }, []);

  const allocateFunds = useCallback(
    async (
      docFundId: string,
      allocations: Allocation[],
      callback: () => void
    ) => {
      const res = await fetch(
        `${BACKEND_ADDR}/grants/ecosystem-doc-funds/allocate/${docFundId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(allocations),
          credentials: "include",
        }
      );

      if (res.ok) {
        callback();
      }
    },
    []
  );

  const getAllocators = useCallback(async (docFundId: string) => {
    const res = await fetch(
      `${BACKEND_ADDR}/grants/ecosystem-doc-funds/allocators/${docFundId}`,
      {
        credentials: "include",
      }
    );

    return await res.json();
  }, []);

  const editTable = useCallback(async () => {
    const res = await fetch(`${BACKEND_ADDR}/edit-table`, {
      method: "POST",
      credentials: "include",
    });

    return await res.json();
  }, []);

  const suggestEdit = useCallback(async () => {
    const res = await fetch(`${BACKEND_ADDR}/documentation/suggestEdit`, {
      credentials: "include",
    });

    return await res.json();
  }, []);

  return {
    createUser,
    getDocFunds,
    getProjects,
    createProject,
    createDocFund,
    addProjectToDocFund,
    getDocFundProjects,
    allocateFunds,
    getAllocators,
    editTable,
    suggestEdit,
  };
};

export default useBackendAPI;
