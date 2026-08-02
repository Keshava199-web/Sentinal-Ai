// import { useQuery } from "@tanstack/react-query";

// import { getIOCs } from "@/services/ioc.service";

// import { queryKeys } from "@/lib/queryKeys";

// import type {
//   IOCQueryParams,
// } from "@/types/ioc";

// export function useIOCs(
//   params?: IOCQueryParams,
// ) {
//   return useQuery({
//     queryKey: [...queryKeys.iocs, params],

//     queryFn: () =>
//       getIOCs(params),

//     staleTime: 60 * 1000,

//     retry: 1,

//     refetchOnWindowFocus: false,
//   });
// }