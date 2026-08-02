// import { useQuery } from "@tanstack/react-query";

// import { getIOCById } from "@/services/ioc.service";

// import { queryKeys } from "@/lib/queryKeys";

// export function useIOC(
//   id: string,
// ) {
//   return useQuery({
//     queryKey: [...queryKeys.iocs, id],

//     queryFn: () =>
//       getIOCById(id),

//     enabled: !!id,

//     staleTime: 60 * 1000,

//     retry: 1,

//     refetchOnWindowFocus: false,
//   });
// }