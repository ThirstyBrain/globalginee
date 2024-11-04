import { Box, Typography } from '@mui/material'
import Layout from '../../props/layout/layout'
import InvoicePage from './components/InvoicePage'
import { Invoice } from './data/types'
import './scss/main.scss'


function InvoiceGenerate() {
  const savedInvoice = window.localStorage.getItem('invoiceData')
  let data = null

  try {
    if (savedInvoice) {
      data = JSON.parse(savedInvoice)
    }
  } catch (_e) {}

  const onInvoiceUpdated = (invoice: Invoice) => {
    window.localStorage.setItem('invoiceData', JSON.stringify(invoice))
  }

  return (
    <Layout>
    {/* Breadcrumbs */}
    <Box sx={{borderRadius: 2,borderColor:"#4caf50"}}>
      <Box py={0} px={4} sx={{backgroundColor: "#fff",
                              borderRadius: 2,
                              borderBottomLeftRadius:0,
                              borderBottomRightRadius:0,
                              borderColor:"#cddc39"}}>
          <Box width="100%">
            <Box width="100%">
              <Typography variant="h5" component="h1" my={1} fontWeight={400} sx={{color:'#2BBBAD'}}>
                 Invoice Generator
              </Typography>
            </Box>
          </Box>
      </Box>
     {/* widgets */}
     {/* //orange */}
    <Box  px={3} sx={{backgroundColor: ""}}>
      <Box width="100%">
      <div className="app">
      <InvoicePage data={data} onChange={onInvoiceUpdated} />
    </div>
      </Box>
    </Box>
    {/* grey */}
    <Box py={20} px={3} sx={{backgroundColor: ""}}>
      <Box width="100%">

      </Box>
    </Box>
    
  </Box>
</Layout>

   
  )
}

export default InvoiceGenerate
