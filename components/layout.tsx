import { NextComponentType } from "next";
import NavbarLayout from "./navbar";

type Props = {
    children: NextComponentType
}

const Layout: NextComponentType<Props> = ({ children }) => (
    <>
        <NavbarLayout />
        <main>{children}</main>
    </>
)

export default Layout;