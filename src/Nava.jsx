import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Nava() {
  return (
    <>
    <Navbar expand="xs" fixed="top"  className="text-black" style={{backgroundColor:'rgb(247,246,241)'}}>
      <Container>
        <Navbar.Brand href="#home" className='text-black'>
        <img
              alt=""
              src="../src/assets/flat-design-sc-cs-logo-template.png"
              width="50"
              height="50"
              className="d-inline-block align-center"
            />Simbha Carrers</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="btn btn-light text-light"/>
        {/* <Navbar.Collapse  className='justify-content-between'>
          <Nav className="me-auto justify-content-end">
            <Nav.Link href="#home" className='text-black'>Home</Nav.Link>
            <Nav.Link href="#link" className='text-black'>Link</Nav.Link>
           
          </Nav>
        </Navbar.Collapse> */}
      </Container>
    </Navbar>
    
    </>
  );
}

export default Nava;