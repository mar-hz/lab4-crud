import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table,Button,Container,FormGroup,
    Modal,ModalHeader,ModalBody,ModalFooter,
} from "reactstrap";

// const data = [
//     { id: 1, nombre: "Jorge Carranza", empresa: "Tec" },
//     { id: 2, nombre: "Ramon Velez", empresa: "Banorte" },
//     { id: 3, nombre: "Hugo Sanchez ", empresa: "Real Madrid" },
//     { id: 4, nombre: "Rafael Marquez", empresa: "Barcelona" },
//     { id: 5, nombre: "Carlos Alcaraz", empresa: "Mallorca" },
//     { id: 6, nombre: "N. Djokovic", empresa: "Serbia" },
//     { id: 7, nombre: "Sergio Perez", empresa: "Cadillac Team"},
//     { id: 8, nombre: "Max Verstapen", empresa: "Oracle Red Bull Racing" },
//     { id: 9, nombre: "Carlos Sainz", empresa: "Williams Racing" },
// ];

// 8:00
const data = [
    { id: 1, nombre: "Alexa", apellidos: "Lara Carvajal", fecha_nacimiento: "2004-04-06", correo: "soyalexa@gmail.com", telefono: "1234567890", genero: "Femenino" },
    { id: 2, nombre: "Alex Renato", apellidos: "Peña Herrera", fecha_nacimiento: "2005-11-29", correo: "benato@gmail.com", telefono: "1234567890", genero: "Masculino" },
    { id: 3, nombre: "Diego", apellidos: "García González", fecha_nacimiento: "2004-01-11", correo: "tmbunmail@gmail.com", telefono: "1234567890", genero: "Masculino" },
    { id: 4, nombre: "Abel", apellidos: "Camacho Rodríguez", fecha_nacimiento: "2004-06-06", correo: "unmail@gmail.com", telefono: "1234567890", genero: "Masculino" },
    { id: 5, nombre: "Marián", apellidos: "Hernández Charles", fecha_nacimiento: "2005-05-14", correo: "meee@gmail.com", telefono: "1234567890", genero: "Femenino" },
    { id: 6, nombre: "Alex", apellidos: "Guajardo Caba", fecha_nacimiento: "2005-02-09", correo: "alexxxx@gmail.com", telefono: "1234567890", genero: "Masculino" },
    { id: 7, nombre: "Ernesto", apellidos: "Garza Berrueto", fecha_nacimiento: "2004-10-19", correo: "swiftliker@gmail.com", telefono: "1234567890", genero: "Masculino" },
    { id: 8, nombre: "Isabel", apellidos: "Ángeles González", fecha_nacimiento: "2005-05-07", correo: "isapisa@gmail.com", telefono: "1234567890", genero: "Femenino" },
]

class App extends React.Component {    
    state = {
        data: data,
        modalActualizar: false,
        modalInsertar: false,
        form: {
            id: "",
            nombre: "",
            apellidos: "",
            fecha_nacimiento: "",
            correo: "",
            telefono: "",
            genero: "",
        },
    };

    mostrarModalActualizar = (dato) => {
        this.setState({
            form: dato,
            modalActualizar: true,
        });
    };

    cerrarModalActualizar = () => {
        this.setState({ modalActualizar: false });
    };

    mostrarModalInsertar = () => {
        this.setState({
            modalInsertar: true,
        });
    };

    cerrarModalInsertar = () => {
        this.setState({ modalInsertar: false });
    };
        
    editar = (dato) => {
        var contador = 0;
        var arreglo = this.state.data;
        arreglo.map((registro) => {
            if (dato.id === registro.id) {
                arreglo[contador].nombre = dato.nombre;
                    arreglo[contador].apellidos = dato.apellidos;
                    arreglo[contador].fecha_nacimiento = dato.fecha_nacimiento;
                    arreglo[contador].correo = dato.correo;
                    arreglo[contador].telefono = dato.telefono;
                    arreglo[contador].genero = dato.genero;
            }
        contador++;
        });
        this.setState({ data: arreglo, modalActualizar: false });
    };

    eliminar = (dato) => {
        var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.id);
        if (opcion === true) {
            var contador = 0;
            var arreglo = this.state.data;
            arreglo.map((registro) => {
                if (dato.id === registro.id) {
                    arreglo.splice(contador, 1);
                }
                contador++;
            });
            this.setState({ data: arreglo, modalActualizar: false });
        }
    };

    insertar= ()=>{
        var valorNuevo= {...this.state.form};
        valorNuevo.id=this.state.data.length+1;
        var lista= this.state.data;
        lista.push(valorNuevo);
        this.setState({ modalInsertar: false, data: lista });
    };

    handleChange = (e) => {
        this.setState({
            form: {...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
    };

    render() {
        return (
            <>
            <Container className="usuarios-container">
                {/* header section */}
                <div className="p-4 mb-4 rounded bg-primary text-white usuarios-header">
                    <h1 className="mb-0">Usuarios</h1>
                    <small className="text-light">Listado de personas registradas</small>
                </div>

                <Button color="success" onClick={()=>this.mostrarModalInsertar()} className="mb-3">
                    <i className="bi bi-person-plus-fill me-1"></i>Agregar usuario
                </Button>

                <Table striped hover responsive className="shadow-sm bg-white rounded">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Fecha de nacimiento</th>
                            <th>Correo</th>
                            <th>Teléfono</th>
                            <th>Género</th>
                            <th>Acción</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.data.map((dato) => (
                            <tr key={dato.id}>
                                <td>{dato.id}</td>
                                <td>{dato.nombre}</td>
                                <td>{dato.apellidos}</td>
                                <td>{dato.fecha_nacimiento}</td>
                                <td>{dato.correo}</td>
                                <td>{dato.telefono}</td>
                                <td>{dato.genero}</td>
                                <td>
                                    <Button size="sm" color="outline-primary" onClick={() => this.mostrarModalActualizar(dato)}>
                                        <i className="bi bi-pencil-fill"></i> Editar
                                    </Button>{" "}
                                    <Button size="sm" color="outline-danger" onClick={()=> this.eliminar(dato)}>
                                        <i className="bi bi-trash-fill"></i> Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>

            <Modal isOpen={this.state.modalInsertar} className="modal-fade">
                <ModalHeader className="bg-success text-white">
                    <div><h3 className="mb-0">Insertar Datos</h3></div>
                </ModalHeader>
                
                <ModalBody>
                    <FormGroup>
                        <label>Id: </label>
                        <input className="form-control" readOnly type="text" value={this.state.data.length+1} />
                    </FormGroup>
                    <FormGroup>
                        <label>Nombre: </label>
                        <input className="form-control" name="nombre" type="text" placeholder="Juan" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <label>Apellidos: </label>
                        <input className="form-control" name="apellidos" type="text" placeholder="Pérez Gómez" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <label>Fecha de nacimiento: </label>
                        <input className="form-control" name="fecha_nacimiento" type="date" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <label>Correo: </label>
                        <input className="form-control" name="correo" type="email" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <label>Teléfono: </label>
                        <input className="form-control" name="telefono" type="text" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <label>Género: </label>
                        <input className="form-control" name="genero" type="text" onChange={this.handleChange} />
                    </FormGroup>
                </ModalBody>
                
                <ModalFooter>
                    <Button color="primary" onClick={() => this.insertar()} >Insertar </Button>
                    <Button className="btn btn-danger" onClick={() => this.cerrarModalInsertar()}
                    >Cancelar</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={this.state.modalActualizar} className="modal-fade">
                <ModalHeader className="bg-primary text-white">
                    <div><h3 className="mb-0">Editar Registro</h3></div>
                </ModalHeader>
                
                <ModalBody>
                <FormGroup>
                        <label>Id: </label>
                        <input className="form-control" readOnly type="text" value={this.state.data.length+1} />
                    </FormGroup>
                    <FormGroup>
                        <label>Nombre: </label>
                        <input className="form-control" name="nombre" type="text" placeholder="Juan" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <label>Apellidos: </label>
                        <input className="form-control" name="apellidos" type="text" placeholder="Pérez Gómez" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <label>Fecha de nacimiento: </label>
                        <input className="form-control" name="fecha_nacimiento" type="date" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <label>Correo: </label>
                        <input className="form-control" name="correo" type="email" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <label>Teléfono: </label>
                        <input className="form-control" name="telefono" type="text" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <label>Género: </label>
                        <input className="form-control" name="genero" type="text" onChange={this.handleChange} />
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button color="primary" onClick={() => this.editar(this.state.form)} >
                    Editar</Button>
                    <Button color="danger" onClick={() => this.cerrarModalActualizar()} >
                    Cancelar</Button>
                </ModalFooter>
            </Modal>
            </>
        )
    }
}

export default App;