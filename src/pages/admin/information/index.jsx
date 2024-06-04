import { HeadAdmin } from "@/components/HeadAdmin";
import { Container, Flex } from "@chakra-ui/react";
import { withAuth } from "@/lib/authorization";
import { SidebarMenu } from "@/components/SidebarMenu";
import { FormInformation } from "@/components/form/FormInformation";

function Information() {
  return (
    <>
      <HeadAdmin />
      <main>
        <Flex>
          <SidebarMenu flex={1} />
          <Container maxW="80%">
            <FormInformation/>
          </Container>
        </Flex>
      </main>
    </>
  );
}

export default withAuth(Information);
