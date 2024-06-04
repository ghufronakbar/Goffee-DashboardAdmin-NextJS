import {
  Box,
  Button,
  FormControl,
  Input,
  useToast,
  Flex,
  FormLabel,
  Stack,
  InputGroup,
  VStack,
} from "@chakra-ui/react";
import { axiosInstance } from "../../lib/axios";
import { useState } from "react";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../Loading";

export function FormInformation() {  
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const bankNameRef = useRef();
  const bankAccountRef = useRef();

  const { data: dataPayment, refetch: refetchDataPayment } = useQuery({
    queryKey: ["information"],
    queryFn: async () => {
      const dataResponse = await axiosInstance.get(`/information`);
      setLoading(false);
      return dataResponse;
    },
  });

  const handleUpdate = async () => {
    try {
      if (!bankNameRef.current.value || !bankAccountRef.current.value) {
        toast({
          title: "Complete form to update payment information",
          status: "warning",
          position: "bottom-right",
          isClosable: true,
        });
      } else {
        await axiosInstance.put(`/information/edit/`, {
          bank_name: bankNameRef.current.value,
          bank_account: bankAccountRef.current.value,
        });
        toast({
          title: "Information payment has been updated",
          status: "success",
          position: "bottom-right",
          isClosable: true,
        });
        refetchDataPayment();
      }
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <form>
        {dataPayment?.data.rows.map((item) => (
          <Box
            p={8}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            mt={4}
          >
            <Flex>
              <Box
                p={8}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                mt={4}
                flex={18}
              >
                <Flex>
                  <FormLabel flex={1}>Bank Name</FormLabel>
                  <FormLabel flex={1}>Bank Account</FormLabel>
                </Flex>
                <Stack direction="row">
                  <FormControl>
                    <InputGroup>
                      <Input
                        name="bank_name"
                        ref={bankNameRef}
                        defaultValue={item.bank_name}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <Input
                        name="bank_account"
                        ref={bankAccountRef}
                        defaultValue={item.bank_account}
                      />
                    </InputGroup>
                  </FormControl>
                </Stack>
              </Box>
            </Flex>
            <VStack mt={4}>
              <Button
                onClick={() => {
                  handleUpdate();
                }}
              >
                Update
              </Button>
            </VStack>
          </Box>
        ))}
      </form>
    </>
  );
}
