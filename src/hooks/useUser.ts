// import { AxiosResponse } from "axios";
// import { useState } from 'react';
import { useQuery, useQueryClient } from "react-query";

import type { User } from "../../types/types";
// import { axiosInstance, getJWTHeader } from '../../../axiosInstance';
import { queryKeys } from "../react-query/constants";
import { wpgraphqlUserCredential } from "../wpgraphqlApi/cors";
// import {
//   clearStoredUser,
//   getStoredUser,
//   setStoredUser,
// } from '../../../user-storage';

// query function
// async function getUser(user: User | null, signal: AbortSignal): Promise<User> {
//   if (!user) return null;
//   // const { data }: AxiosResponse<{ user: User }> = await axiosInstance.get(
//   //   `/user/${user.id}`,
//   //   {
//   //     signal, // abortSignal from React Query
//   //     headers: getJWTHeader(user),
//   //   },
//   // );

//   return user;
// }

interface UseUser {
  user: User | null;
  userLoading: Boolean;
  userIsError: Boolean;
  userIsSuccess: Boolean;
  userError: {};
  userStatusCode: string;
  updateUser: (user: User) => void;
  updateUserToo: () => void;
  clearUser: () => void;
}

export function useUser(): UseUser {
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading: userLoading,
    isError: userIsError,
    isSuccess: userIsSuccess,
    error: userError,
    status: userStatusCode,
  } = useQuery(
    queryKeys.user,
    // call useQuery to update user data from server
    ({ signal }) => wpgraphqlUserCredential(signal),
    {
      // populate initially with user in localStorage
      // initialData: getStoredUser,

      // note: onSuccess is called on both successful query function completion
      //     *and* on queryClient.setQueryData
      // the `received` argument to onSuccess will be:
      //    - null, if this is called on queryClient.setQueryData in clearUser()
      //    - User, if this is called from queryClient.setQueryData in updateUser()
      //         *or* from the getUser query function call
      onSuccess: (received: null | User) => {
        // if (!received) {
        //   // clearStoredUser();
        // } else {
        //   // setStoredUser(received);
        // }
      },
      // should be length of cookie...,
      staleTime: 1000 * 60 * 3, // 3min
      // r
    }
  );

  // meant to be called from useAuth
  function updateUser(newUser: User): void {
    // update the user
    queryClient.setQueryData(queryKeys.user, newUser);
  }

  // meant to be called from useAuth
  function clearUser() {
    // reset user to null
    queryClient.setQueryData(queryKeys.user, null);

    // remove user appointments query
    queryClient.removeQueries([queryKeys.user]);
  }

  async function updateUserToo() {
    const data = await queryClient.fetchQuery(queryKeys.user);
    console.log(`data`, data);
  }

  return {
    user,
    updateUser,
    clearUser,
    updateUserToo,
    userLoading,
    userIsError,
    userIsSuccess,
    userError,
    userStatusCode,
  };
}

// now returning axiosResponsetype
// async function getUser(user: User | null): Promise<AxiosResponseWithCancel> {
//   const source = axios.CancelToken.source();

//   if (!user) return null;
//   // store axios
//   const axiosResponse: AxiosResponseWithCancel = await axiosInstance.get(
//     `/user/${user.id}`,
//     {
//       headers: getJWTHeader(user),
//       cancelToken: source.token,
//     },
//   );

//   axiosResponse.cancel = () => {
//     // cancel request
//     source.cancel();
//   };

//   return axiosResponse;
// }

// export function useUser(): UseUser {
//   const [user, setUser] = useState<User | null>(getStoredUser());
//   const queryClient = useQueryClient();

//   // TODO: call useQuery to update user data from server
//   useQuery(queryKeys.user, () => getUser(user), {
//     enabled: !!user,
//     // updating onSuccess based on changes in React Query
//     // see https://www.udemy.com/course/learn-react-query/learn/#questions/15581842/ for more details
//     // onSuccess: (axiosResponse) => setUser(axiosResponse?.data?.user)
//     onSuccess: (data: User) => setUser(data),
//   });

//   // meant to be called from useAuth
//   function updateUser(newUser: User): void {
//     // set user in state
//     setUser(newUser);

//     // update user in localstorage
//     setStoredUser(newUser);

//     // TODO: pre-populate user profile in React Query client;
//     queryClient.setQueryData(queryKeys.user, newUser);
//   }

//   // meant to be called from useAuth
//   function clearUser() {
//     // update state
//     setUser(null);

//     // remove from localstorage
//     clearStoredUser();

//     // reset user to null in query client
//     queryClient.setQueryData(queryKeys.user, null);
//     // remove
//     queryClient.removeQueries([queryKeys.appointments, queryKeys.user]);
//   }

//   return { user, updateUser, clearUser };
// }
