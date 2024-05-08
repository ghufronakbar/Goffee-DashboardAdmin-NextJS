import { HeadAdmin } from "@/components/HeadAdmin";
import { NavbarAdmin } from "@/components/NavbarAdmin";
import { FormMenuEdit } from "@/components/form/FormMenuEdit";
import { Container } from "@chakra-ui/react";

export default function MenuID() {
  return (
    <>
      <HeadAdmin />
      <main>
        <NavbarAdmin />
        <Container maxW="80%">
          <FormMenuEdit />
        </Container>
      </main>
    </>
  );
}
