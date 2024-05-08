import {
  Box,
  Text,
  Stack,
  Tr,
  Table,
  Th,
  Td,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { LoadingComponent } from "../LoadingComponent";

export default function StatisticToday({ flex }) {
  const {
    data: dataMenu,
    isLoading,
    error,
    refetch: refetchDataMenu,
  } = useQuery({
    queryKey: ["order/total/income/today"],
    queryFn: async () => {
      const dataResponse = await axiosInstance.get("/order/total/income/today");
      return dataResponse;
    },
  });

  if (isLoading) return <LoadingComponent flex={flex} />;

  if (error) {
    return (
      <Box
        flex={flex}
        p={8}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        mt={4}
        mx={4}
      >
        <Text>Error fetching data</Text>
      </Box>
    );
  }

  return (
    <Box
      flex={flex}
      p={8}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      mt={4}
      mx={4}
      bg='teal'
      color='white'
    >
      {dataMenu?.data.values.map((item) => (
        <div key={item.total_order}>
          <Text fontSize="3xl" as="b" ml={4}>
            Today
          </Text>
          <Stack mt={6}>
            <Table>
              <Tr>
                <Th color='white'>Total Orders</Th>
                <Td isNumeric>{item.total_order} Orders</Td>
              </Tr>
              <Tr>
                <Th color='white'>Income</Th>
                <Td isNumeric>{item.total_income} Orders</Td>
              </Tr>
            </Table>
          </Stack>
        </div>
      ))}
    </Box>
  );
}
