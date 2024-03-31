import React ,{useState} from "react";
import { useFormContext } from '../Context/Context.jsx'; 
import {
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBTypography,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import "@fortawesome/fontawesome-free/css/all.min.css";
import PhoneIcon from '@mui/icons-material/Phone';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import "./invoice.css"
import MailIcon from '@mui/icons-material/Mail';
import DownloadIcon from '@mui/icons-material/Download';
export default function Invoice() {
  const { formData } = useFormContext();
  const date = new Date().toLocaleDateString()
  
  const handlePrint = () => {
    window.print();
  };
  const handleExportPDF = () => {
    // Create a new Blob object containing the HTML content of the page
    const content = document.documentElement.outerHTML;
    const blob = new Blob([content], { type: 'text/html' });

    // Create a URL for the Blob object
    const url = URL.createObjectURL(blob);

    // Create a link element and trigger a click event to initiate download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'invoice.html'; // Set the filename for the downloaded file
    document.body.appendChild(a);
    a.click();

    // Clean up by revoking the URL
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    
  

    <MDBContainer className="py-5" >
      <MDBCard className="p-4 card">
        <MDBCardBody >
          <MDBContainer className="mb-2 mt-3">
            <MDBRow className="d-flex align-items-baseline">
              <MDBCol xl="9">
                
              </MDBCol>
              <MDBCol xl="3" className="float-end">
                <MDBBtn
                  color="light"
                  ripple="dark"
                  className="text-capitalize border-0"
                  onClick={handlePrint}


                >
<LocalPrintshopIcon />
                  Print
                </MDBBtn>
                <MDBBtn
                  color="light"
                  ripple="dark"
                  className="text-capitalize border-0 ms-2"
                  onClick={handleExportPDF}

                >
                  <DownloadIcon/>
                  Export
                </MDBBtn>
                <hr />
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          
          <MDBRow>
            <MDBCol xl="8">
              <MDBTypography style={{fontSize:"18px"}} listUnStyled>
              
                  <li className="text-muted">
                  <span style={{ fontWeight:"900",fontSize:"24px" ,color: "#5d9fc5" }}>I-Click Optics</span>
                </li>
                <li className="text-muted">Shop # G-93, Harmain Tower,</li>
                <li className="text-muted">Johar Moar,Karachi</li>
                <li className="text-muted">
                 <PhoneIcon/> 0334-2838283
                
                </li>
                <li className="text-muted">
                  <PhoneIcon/> 0301-2938283 
                
                </li>
                <li className="text-muted">
                  <MailIcon/> aqeel03342838283@gmail.com 
                
                </li>

              </MDBTypography>
            </MDBCol>
            <MDBCol xl="4">
              <p className="text-muted">Invoice</p>
              <MDBTypography listUnStyled>
                <li className="text-muted">
                  <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                  <span className="fw-bold ms-1">Customer Name:</span> Umar Aqeel
                </li>
                <li className="text-muted">
                  <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                  <span className="fw-bold ms-1">Date:</span> {date}
                </li>
                <li className="text-muted">
                  <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                  <span className="fw-bold ms-1">Status:</span>
                  <span className="badge bg-warning text-black fw-bold ms-1">
                    {formData.status === "delivered" ? "Paid" : "Unpaid" }
                  </span>
                </li>
              </MDBTypography>
            </MDBCol>
          </MDBRow>
          <MDBRow className="my-2 mx-1 justify-content-center">
            <MDBTable striped borderless>
              <MDBTableHead
                className="text-white"
                style={{ backgroundColor: "#84B0CA" }}
              >
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Service</th>
                  <th scope="col">Left eye</th>
                  <th scope="col">Right eye</th>
               

                </tr>
              </MDBTableHead>
              <MDBTableBody>
                <tr>
                  <th scope="row">•</th>
                  <td>{formData.type}</td>
                  <td>{formData.leye}</td>
                  <td>{formData.reye}</td>

                </tr>
              
              </MDBTableBody>
            </MDBTable>
          </MDBRow>
          <MDBRow>
            <MDBCol xl="3">
              <MDBTypography listUnStyled>
                <li className="text-muted ms-3">
                  <span className="text-black me-4">SubTotal</span>Rs - / {formData.total}
                </li>
                <li className="text-muted ms-3 mt-2">
                  <span className="text-black me-4">Advance</span>Rs - / {formData.advance}
                </li>
                <li className="text-muted ms-3 mt-2">
                  <span className="text-black me-4">Balance</span>Rs - / {formData.balance}
                </li>
              </MDBTypography>
            
            </MDBCol>
          </MDBRow>
          <hr />
          <MDBRow  >
            <MDBCol  >
              <p style={{textAlign:"center"}}>Your satisfaction is our priority at I-Click Optics.</p>
            </MDBCol>
        
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}