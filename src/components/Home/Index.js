import React from "react";
import { getAccount, getData, closeSesion } from "../../utils/globalVariables";
import { Row, Col, CardHeader, CardBody, Card } from "reactstrap";

function Index() {
  return (
    <div className="home-responsive">
      <Row>
        <Col xs={12}>
          {getData() && getData().length !== 0 ? (
            <>
              <h4 className="nav-user">Bienvenido {getAccount().email}</h4>
            </>
          ) : null}
        </Col>
        <Col xs={12}>
          <Card>
            <CardHeader>
              <h1>Inicio</h1>
            </CardHeader>
            <CardBody>
              <img
                src="https://image.freepik.com/vector-gratis/pagina-bienvenida-bienvenida-gradiente-puesta_52683-20479.jpg"
                alt="imagen de bienvenida"
                className="image-home"
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Index;
