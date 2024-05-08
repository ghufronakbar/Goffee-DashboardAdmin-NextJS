import { HeadAdmin } from "@/components/HeadAdmin";
import { NavbarAdmin } from "@/components/NavbarAdmin";
import { FormMenuAdd } from "@/components/form/FormMenuAdd";
import { Container } from "@chakra-ui/react";

export default function MenuAdd() {
  return (
    <>
      <HeadAdmin />
      <main>
        <NavbarAdmin />
        <Container maxW="80%">
          <FormMenuAdd />
        </Container>
      </main>
    </>
  );
}
