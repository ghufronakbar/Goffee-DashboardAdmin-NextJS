
import { HeadAdmin } from "@/components/HeadAdmin";
import { NavbarAdmin } from "@/components/NavbarAdmin";
import { TableOrders } from "@/components/table/TableOrders";

import {
    Container,
    Heading,
} from "@chakra-ui/react";



export default function Orders() {
    return (
        <>
            <HeadAdmin />
            <main>
                <NavbarAdmin />
                <Container maxW="80%">
                    <Heading marginBottom="8" marginTop="8">
                        Data Orders
                    </Heading>
                   {TableOrders(6)}
                </Container>
            </main>
        </>
    );
}

