import { HeadAdmin } from "@/components/HeadAdmin";
import { FormMenuEdit } from "@/components/form/FormMenuEdit";
import { Container, Flex } from "@chakra-ui/react";
import Menu from ".";
import { withAuth } from "@/lib/authorization";
import { SidebarMenu } from "@/components/SidebarMenu";

function MenuID() {
  return (
    <>
      <HeadAdmin />
      <main>
        <Flex>
          <SidebarMenu flex={1} />
          <Container maxW="80%">
            <FormMenuEdit />
          </Container>
        </Flex>
      </main>
    </>
  );
}

export default withAuth(MenuID);
