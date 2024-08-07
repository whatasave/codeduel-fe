/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/v1/health": {
    get: {
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": components["schemas"]["HealthCheck"];
          };
        };
      };
    };
  };
  "/v1/user/{id}": {
    get: {
      parameters: {
        path: {
          id: number;
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": components["schemas"]["User"];
          };
        };
        /** @description Not Found */
        404: {
          content: never;
        };
      };
    };
  };
  "/v1/user": {
    get: {
      parameters: {
        query: {
          username: string;
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": components["schemas"]["User"];
          };
        };
        /** @description Not Found */
        404: {
          content: never;
        };
      };
    };
  };
  "/v1/user/profile": {
    get: {
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": components["schemas"]["User"];
          };
        };
        /** @description Unauthorized */
        401: {
          content: never;
        };
      };
    };
  };
  "/v1/user/list": {
    get: {
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": components["schemas"]["UserListItem"][];
          };
        };
      };
    };
  };
  "/v1/game": {
    get: {
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": components["schemas"]["GameWithUsersData"][];
          };
        };
      };
    };
    post: {
      requestBody: {
        content: {
          "application/json": components["schemas"]["CreateGame"];
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: never;
        };
        /** @description Unauthorized */
        401: {
          content: never;
        };
      };
    };
  };
  "/v1/game/{uniqueId}": {
    get: {
      parameters: {
        path: {
          uniqueId: string;
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": components["schemas"]["GameWithUsersData"];
          };
        };
        /** @description Not Found */
        404: {
          content: never;
        };
      };
    };
  };
  "/v1/game/{uniqueId}/submit": {
    patch: {
      parameters: {
        path: {
          uniqueId: string;
        };
      };
      requestBody: {
        content: {
          "application/json": components["schemas"]["UpdateSubmission"];
        };
      };
      responses: {
        /** @description No Content */
        204: {
          content: never;
        };
        /** @description Unauthorized */
        401: {
          content: never;
        };
      };
    };
  };
  "/v1/game/{uniqueId}/endgame": {
    patch: {
      parameters: {
        path: {
          uniqueId: string;
        };
      };
      responses: {
        /** @description No Content */
        204: {
          content: never;
        };
        /** @description Unauthorized */
        401: {
          content: never;
        };
      };
    };
  };
  "/v1/game/{uniqueId}/results": {
    get: {
      parameters: {
        path: {
          uniqueId: string;
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": components["schemas"]["GameWithUsersData"];
          };
        };
        /** @description Not Found */
        404: {
          content: never;
        };
      };
    };
  };
  "/v1/game/user/{userId}": {
    get: {
      parameters: {
        path: {
          userId: number;
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": components["schemas"]["GameWithUserData"][];
          };
        };
      };
    };
  };
  "/v1/game/sharecode": {
    patch: {
      requestBody: {
        content: {
          "application/json": components["schemas"]["ShareCodeRequest"];
        };
      };
      responses: {
        /** @description No Content */
        204: {
          content: never;
        };
        /** @description Unauthorized */
        401: {
          content: never;
        };
      };
    };
  };
  "/v1/challenge": {
    get: {
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": components["schemas"]["Challenge"][];
          };
        };
      };
    };
    post: {
      requestBody: {
        content: {
          "application/json": components["schemas"]["CreateChallenge"];
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": components["schemas"]["Challenge"];
          };
        };
        /** @description Unauthorized */
        401: {
          content: never;
        };
      };
    };
  };
  "/v1/challenge/{id}": {
    get: {
      parameters: {
        path: {
          id: number;
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": components["schemas"]["Challenge"];
          };
        };
        /** @description Not Found */
        404: {
          content: never;
        };
      };
    };
    put: {
      parameters: {
        path: {
          id: number;
        };
      };
      requestBody: {
        content: {
          "application/json": components["schemas"]["CreateChallenge"];
        };
      };
      responses: {
        /** @description No Content */
        204: {
          content: never;
        };
        /** @description Unauthorized */
        401: {
          content: never;
        };
        /** @description Not Found */
        404: {
          content: never;
        };
      };
    };
    delete: {
      parameters: {
        path: {
          id: number;
        };
      };
      responses: {
        /** @description No Content */
        204: {
          content: never;
        };
        /** @description Unauthorized */
        401: {
          content: never;
        };
        /** @description Not Found */
        404: {
          content: never;
        };
      };
    };
  };
  "/v1/challenge/random": {
    get: {
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": components["schemas"]["ChallengeDetailed"];
          };
        };
      };
    };
  };
  "/v1/auth/github": {
    get: {
      responses: {
        /** @description OK */
        200: {
          content: never;
        };
      };
    };
  };
  "/v1/auth/github/callback": {
    get: {
      parameters: {
        query: {
          code: string;
          state: string;
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: never;
        };
      };
    };
  };
  "/v1/auth/refresh": {
    get: {
      responses: {
        /** @description OK */
        200: {
          content: never;
        };
      };
    };
  };
  "/v1/auth/logout": {
    get: {
      responses: {
        /** @description OK */
        200: {
          content: never;
        };
      };
    };
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    Challenge: {
      /** Format: int32 */
      id: number;
      owner: components["schemas"]["UserListItem"];
      title: string;
      description: string;
      content: string;
      /** Format: int32 */
      testCases: number;
      /** Format: date-time */
      createdAt: string;
    };
    ChallengeDetailed: {
      /** Format: int32 */
      id: number;
      owner: components["schemas"]["UserListItem"];
      title: string;
      description: string;
      content: string;
      testCases: components["schemas"]["TestCase"][];
      hiddenTestCases: components["schemas"]["TestCase"][];
      /** Format: date-time */
      createdAt: string;
    };
    CreateChallenge: {
      title: string;
      description: string;
      content: string;
    };
    CreateGame: {
      uniqueId: string;
      /** Format: int32 */
      challengeId: number;
      /** Format: int32 */
      ownerId: number;
      ended: boolean;
      /** Format: int32 */
      modeId: number;
      /** Format: int32 */
      maxPlayers: number;
      /** Format: int32 */
      gameDuration: number;
      allowedLanguages: string[];
      users: number[];
    };
    Game: {
      /** Format: int32 */
      id: number;
      uniqueId: string;
      challenge: components["schemas"]["Challenge"];
      /** Format: int32 */
      ownerId: number;
      ended: boolean;
      mode: components["schemas"]["Mode"];
      /** Format: int32 */
      maxPlayers: number;
      /** Format: int32 */
      duration: number;
      allowedLanguages: string[];
      /** Format: date-time */
      createdAt: string;
    };
    GameWithUserData: {
      game: components["schemas"]["Game"];
      userData: components["schemas"]["UserData"];
    };
    GameWithUsersData: {
      game: components["schemas"]["Game"];
      userData: components["schemas"]["UserData"][];
    };
    HealthCheck: {
      status: string;
    };
    Mode: {
      /** Format: int32 */
      id: number;
      name: string;
      description: string;
    };
    ShareCodeRequest: {
      /** Format: int32 */
      lobbyId: number;
      showCode: boolean;
    };
    TestCase: {
      input: string;
      output: string;
    };
    UpdateSubmission: {
      /** Format: int32 */
      userId: number;
      /** Format: int32 */
      gameId: number;
      code: string;
      language: string;
      /** Format: int32 */
      testsPassed: number;
      /** Format: date-time */
      submittedAt: string;
    };
    User: {
      /** Format: int32 */
      id: number;
      username: string;
      name: string;
      /** Format: date-time */
      createdAt: string;
      avatar: string | null;
      backgroundImage: string | null;
      biography: string | null;
    };
    UserData: {
      user: components["schemas"]["UserListItem"];
      code: string | null;
      language: string | null;
      /** Format: int32 */
      testsPassed: number;
      /** Format: date-time */
      submittedAt?: string | null;
      showCode: boolean;
    };
    UserListItem: {
      /** Format: int32 */
      id: number;
      username: string;
      name: string;
      /** Format: date-time */
      createdAt: string;
      avatar: string | null;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export type operations = Record<string, never>;
