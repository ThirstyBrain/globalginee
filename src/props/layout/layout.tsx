import { Box } from "@mui/material";
import { ReactNode } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Sidebar1 from "../../components/sidebar/sidebar1";
//import MenuAppBar from "../../components/menu-app-bar/menu-app-bar";

interface LayoutProps{
    children : ReactNode
}

const Layout: React.FC<LayoutProps> = ({children}:LayoutProps) => {
    return (
        <Box sx={{
            backgroundColor: "", // all black color
            display: "flex",
            flexDirection: {
              xs: "column",
              lg: "row",
            },
            color: "white",
            padding: 3,
            gap: 3,
            overflowY: "hidden",
            height: "100vh"
        }}>
          <Sidebar1/>
          <Box sx={{ width: "100%", overflowY: "scroll" , borderColor:""}}>
            {children}
          </Box>
        </Box>
      )

}

export default Layout;