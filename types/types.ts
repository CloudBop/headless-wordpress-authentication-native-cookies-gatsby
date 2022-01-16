// export interface Id {
// id: number;
//   id: string;
// }

export interface NewUser {
  // id: string;
  viewer: {
    id: string;
    databaseId: number;
    firstName: string;
    lastName: string;
    email: string;
    capabilities: string[];
    address?: string;
    phone?: string;
    token?: string;
  };
}

export type User = NewUser;

// export type User = Id & NewUser;
