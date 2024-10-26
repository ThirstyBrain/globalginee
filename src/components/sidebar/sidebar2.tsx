import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Box, Hidden, Typography } from '@mui/material'
import homeIcon from  '../../assets/icons/icon-home.svg'
import appointmentIcon from  '../../assets/icons/icon-appointment.svg'
import patientIcon from '../../assets/icons/icon-patient.svg';
import receptionIcon from '../../assets/icons/icon-reception.svg';
import doctorIcon from '../../assets/icons/icon-doctor.svg';
import paymentIcon from '../../assets/icons/icon-payment.svg';
import invoiceIcon from '../../assets/icons/icon-invoice.svg';
import serviceIcon from '../../assets/icons/icon-service.svg';
import medicineIcon from '../../assets/icons/icon-medicines.svg';
import compaignIcon from '../../assets/icons/icon-campaign.svg';
import settingIcon from '../../assets/icons/icon-settings.svg';
//import Icon from '../../assets/icons/'
const navLinks = [
    {
      name: "ifsc",
      icon: homeIcon,
      link: "/ifsc",
    },
    {
      name: "blogs",
      icon: invoiceIcon,
      link: "/blogs",
    }
  ];


const Sidebar2: React.FC = () => {
  const {pathname} = useLocation();
  return (
    <Box sx={{
        backgroundColor: "#018786",
        padding: 2,
        borderRadius: 2,
        display: "flex",
        flexDirection: {
          xs: "row",
          lg: "column",
        },
        alignItems: "center",
        justifyContent: "space-between",
        width: {
          sm: "100%",
          lg: 200,
        },
     }}>
        
       {/* //menu   */}
       <Box sx={{
            display: "flex",
            flexDirection: {
                xs: "row",
                lg: "column",
            },
            gap: 5,
            alignItems: {
                xs: "center",
                lg: "start",
            },
            width: "100%",
       }}>
       <Hidden smDown>
          <Typography
            variant="h5"
            component="h1"
            my={2}
            fontWeight={400}
            fontSize={18}
          >
            Doctor
          </Typography>
        </Hidden>

        <Box sx={{
            py: {
                xs: "0px",
                lg: "16px",
            },
            display: "flex",
            flexDirection: {
                xs: "row",
                lg: "column",
            },
            gap: 4,
        }}>
         {navLinks.map((item)=>(
            <Link 
                key={item.name}
                to={item.link}
                style={{ textDecoration: "none" }}
            >
            <Box sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                color: "white",
                textDecoration: "none",
            }}>
            <img
                  src={item.icon}
                  alt={item.name}
                  style={{
                    width: "25px",
                    filter: `${
                      pathname === item.link
                        ? "invert(58%) sepia(14%) saturate(3166%) hue-rotate(215deg) brightness(91%) contrast(87%)"
                        : "invert(84%)"
                    }`,
                  }}
            />
            <Hidden mdDown>
                  <Typography>{item.name}</Typography>
            </Hidden>
            </Box>

             </Link>
         ))}


        </Box>
       </Box>
    </Box>
  )
}

export default Sidebar2;