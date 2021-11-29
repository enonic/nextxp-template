import React from "react"
import {APP_NAME} from "../../xpAdapter/enonic-connection-config";
import Footer from "../../components/blocks/Footer";

// fully qualified XP part name:
export const FOOTER_PART_NAME = `${APP_NAME}:footer`;

const FooterPart = () => {
    return <Footer />
};

export default FooterPart;
