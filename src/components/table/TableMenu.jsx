import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { axiosInstance } from "../../lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Loading } from "../Loading";
import { useState } from "react";
import { baseURL } from "@/lib/baseUrl";

export function TableMenu() {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(true);

  let i = 1;
  const { data: dataMenu, refetch: refetchDataMenu } = useQuery({
    queryKey: ["menus"],
    queryFn: async () => {
      const dataResponse = await axiosInstance.get("/menus");
      setLoading(false);
      return dataResponse;
    },
  });

  const handleDelete = async (id_menu) => {
    try {
      await axiosInstance.delete(`/menu/delete/${id_menu}`);
      toast({
        title: "Menu has been deleted",
        status: "warning",
        position: "bottom-right",
        isClosable: true,
      });
      refetchDataMenu();
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  const handleActive = async (id_menu) => {
    try {
      await axiosInstance.put(`/menu/setstock/${id_menu}`, { status: 0 });

      toast({
        title: "Stock has been set to sold out",
        status: "info",
        position: "bottom-right",
        isClosable: true,
      });
      refetchDataMenu();
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  const handleNotActive = async (id_menu) => {
    try {
      await axiosInstance.put(`/menu/setstock/${id_menu}`, { status: 1 });

      toast({
        title: "Stock has been set to available",
        status: "success",
        position: "bottom-right",
        isClosable: true,
      });
      refetchDataMenu();
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  const handleDetail = (id) => {
    router.push(`/admin/menu/${id}`);
  };

  const goToAdd = () => {
    router.push(`/admin/menu/add`);
  };

  if (loading) return <Loading />;

  return (
    <>
      <Button borderRadius="md" bg="#48BB78" color="white" px={4} my={4} onClick={()=>{goToAdd()}}>
        Add Menu
      </Button>
      <Box p={8} borderWidth="1px" borderRadius="lg" overflow="hidden">
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th></Th>
                <Th>Menu Name</Th>
                <Th>
                  <Center>Variant</Center>
                </Th>
                <Th>
                  <Center>Status</Center>
                </Th>{" "}
                <Th>Price</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {dataMenu?.data.values.map((item) => (
                <Tr key={item.berita_id}>
                  <Td>{i++}</Td>
                  <Td>
                    <Image
                      borderRadius="18"
                      boxSize="60px"
                      objectFit="cover"
                      src={`${baseURL}/images/menu/${item.picture}`}
                      alt={item.picture}
                    />
                  </Td>
                  <Td>
                    <Text as="b">{item.menu_name}</Text>
                  </Td>
                  <Td>
                    <Center>
                      {item.variant == "Hot" && (
                        <Box
                          as="button"
                          borderRadius="md"
                          bg="orange"
                          color="white"
                          px={2}
                          h={8}
                        >
                          🔥 HOT
                        </Box>
                      )}
                      {item.variant == "Ice" && (
                        <Box
                          as="button"
                          borderRadius="md"
                          bg="teal"
                          color="white"
                          px={3}
                          h={8}
                        >
                          ❄️ ICE
                        </Box>
                      )}
                    </Center>
                  </Td>
                  <Td>
                    <Center>
                      {item.status == 1 && (
                        <Box
                          as="button"
                          borderRadius="md"
                          bg="#48BB78"
                          color="white"
                          px={4}
                          h={8}
                          onClick={() => {
                            handleActive(item.id_menu);
                          }}
                        >
                          Available
                        </Box>
                      )}
                      {item.status == 0 && (
                        <Box
                          as="button"
                          borderRadius="md"
                          bg="#E53E3E"
                          color="white"
                          px={4}
                          h={8}
                          onClick={() => {
                            handleNotActive(item.id_menu);
                          }}
                        >
                          Sold Out
                        </Box>
                      )}
                    </Center>
                  </Td>
                  <Td>Rp {item.price},00</Td>{" "}
                  <Td>
                    {" "}
                    <Center>
                      <Button
                        variant="outline"
                        colorScheme="grey"
                        onClick={() => handleDetail(item.id_menu)}
                      >
                        <Text as="b">Detail</Text>
                      </Button>
                    </Center>
                    <Center marginTop={1}>
                      <Button
                        colorScheme="red"
                        onClick={() => handleDelete(item.id_menu)}
                      >
                        Delete
                      </Button>
                    </Center>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
