
import { HeadAdmin } from "@/components/HeadAdmin";
import { NavbarAdmin } from "@/components/NavbarAdmin";
import { TableMenu } from "@/components/table/TableMenu";
import {
    Container,
    Heading,
} from "@chakra-ui/react";



export default function InformasiDesa() {
    return (
        <>
            <HeadAdmin />
            <main>
                <NavbarAdmin />
                <Container maxW="80%">
                    <Heading marginBottom="8" marginTop="8">
                        Data Menu
                    </Heading>
                    <TableMenu/>
                </Container>
            </main>
        </>
    );
}

