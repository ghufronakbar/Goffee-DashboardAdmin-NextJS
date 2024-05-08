import {
  Box,
  Button,
  Center,
  FormControl,
  Image,
  Input,
  Spacer,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Tr,
  Textarea,
  useToast,
  Flex,
  FormLabel,
  Stack,
  InputGroup,
  InputLeftElement,
  RadioGroup,
  Radio,
  VStack,
  Spinner,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { axiosInstance } from "../../lib/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../Loading";
import { baseURL } from "@/lib/baseUrl";

export function FormMenuEdit() {
  const router = useRouter();
  const { id: id_menu } = router.query;
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const pictureRef = useRef();
  const menuNameRef = useRef();
  const [variant, setVariant] = useState("");
  const informationRef = useRef();
  const priceRef = useRef();
  const [selectedImage, setSelectedImage] = useState(null);

  // Fungsi untuk menangani perubahan pada input file gambar
  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Mengambil file gambar yang dipilih
    setSelectedImage(URL.createObjectURL(file)); // Membuat URL dari file gambar dan menyimpannya dalam state
  };

  const { data: dataMenu, refetch: refetchDataMenu } = useQuery({
    queryKey: ["menu", id_menu],
    queryFn: async () => {
      const dataResponse = await axiosInstance.get(`/menu/${id_menu}`);
      setLoading(false);
      return dataResponse;
    },
  });

  useEffect(() => {
    if (dataMenu && dataMenu.data.values.length > 0) {
      setVariant(dataMenu.data.values[0].variant);
    }
  }, [dataMenu]);


  const handleUpdate = async (id_menu) => {
    try {
      if (
        !menuNameRef.current.value ||
        !variant ||
        !informationRef.current.value ||
        !priceRef.current.value
      ) {
        toast({
          title: "Complete form to insert menu",
          status: "warning",
          position: "bottom-right",
          isClosable: true,
        });
      } else {
        const formData = {
          menu_name: menuNameRef.current.value,
          variant: variant,
          information: informationRef.current.value,
          price: priceRef.current.value,
        };

        if (pictureRef.current.files.length > 0) {
          formData.picture = pictureRef.current.files[0];
        }

        await axiosInstance.put(`/menu/edit/${id_menu}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast({
          title: "Menu has been updated",
          status: "success",
          position: "bottom-right",
          isClosable: true,
        });
        router.push(`/admin/menu`);
      }
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <form>
        {dataMenu?.data.values.map((item) => (
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
                flex={9}
              >
                <Center>
                  {selectedImage ? (
                    <Image
                      borderRadius="18"
                      boxSize="400"
                      objectFit="cover"
                      src={selectedImage}
                    />
                  ) : (
                    <Image
                      borderRadius="18"
                      boxSize="400"
                      objectFit="cover"
                      src={`${baseURL}/images/menu/${item.picture}`}
                      alt={item.picture}
                    />
                  )}
                </Center>
                <Input
                  mt={4}
                  type="file"
                  name="picture"
                  ref={pictureRef}
                  onChange={handleImageChange}
                />
              </Box>
              <Spacer flex={1} />
              <Box
                p={8}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                mt={4}
                flex={18}
              >
                <Stack>
                  <FormLabel>Menu Name</FormLabel>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" fontSize="1.2em">
                        ☕
                      </InputLeftElement>
                      <Input
                        name="menu_name"
                        ref={menuNameRef}
                        defaultValue={item.menu_name}
                      />
                    </InputGroup>
                  </FormControl>

                  <RadioGroup
                    mt={4}
                    value={variant}
                    onChange={(newValue) => setVariant(newValue)}
                  >
                    <FormLabel>Variant</FormLabel>
                    <Stack spacing={5} direction="row">
                      <Radio colorScheme="orange" value="Hot">
                        🔥 Hot
                      </Radio>
                      <Radio colorScheme="blue" value="Ice">
                        ❄️ Ice
                      </Radio>
                    </Stack>
                  </RadioGroup>

                  <FormControl mt={4}>
                    <FormLabel>Price</FormLabel>
                    <NumberInput defaultValue={item.price} min={0}>
                      <NumberInputField ref={priceRef} />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                  <FormLabel mt={4}>Information</FormLabel>
                  <Textarea
                    name="information"
                    ref={informationRef}
                    defaultValue={item.information}
                  ></Textarea>
                </Stack>
              </Box>
            </Flex>
            <VStack mt={4}>
              <Button
                onClick={() => {
                  handleUpdate(id_menu);
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
