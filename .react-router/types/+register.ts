import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/games": {};
  "/games/new": {};
  "/games/:id": {
    "id": string;
  };
};