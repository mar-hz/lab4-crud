import React, { useState } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Crud.css";
import {
  Table,
  Button,
  Container,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

// initial dataset (copy from original)
const initialData = [
  { id: 1, nombre: "Alexa", apellidos: "Lara Carvajal", fecha_nacimiento: "2004-04-06", correo: "soyalexa@gmail.com", telefono: "1234567890", genero: "Femenino" },
  { id: 2, nombre: "Alex Renato", apellidos: "Peña Herrera", fecha_nacimiento: "2005-11-29", correo: "benato@gmail.com", telefono: "1234567890", genero: "Masculino" },
  { id: 3, nombre: "Diego", apellidos: "García González", fecha_nacimiento: "2004-01-11", correo: "tmbunmail@gmail.com", telefono: "1234567890", genero: "Masculino" },
  { id: 4, nombre: "Abel", apellidos: "Camacho Rodríguez", fecha_nacimiento: "2004-06-06", correo: "unmail@gmail.com", telefono: "1234567890", genero: "Masculino" },
  { id: 5, nombre: "Marián", apellidos: "Hernández Charles", fecha_nacimiento: "2005-05-14", correo: "meee@gmail.com", telefono: "1234567890", genero: "Femenino" },
];

function UsersCrud() {
  const [data, setData] = useState(initialData);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null); // null or record being edited
  const [form, setForm] = useState({
    id: "",
    nombre: "",
    apellidos: "",
    fecha_nacimiento: "",
    correo: "",
    telefono: "",
    genero: "",
  });

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const openNew = () => {
    setEditing(null);
    setForm({
      id: "",
      nombre: "",
      apellidos: "",
      fecha_nacimiento: "",
      correo: "",
      telefono: "",
      genero: "",
    });
    toggleModal();
  };

  const openEdit = (record) => {
    setEditing(record);
    setForm(record);
    toggleModal();
  };

  const saveRecord = () => {
    if (editing) {
      setData((d) => d.map((r) => (r.id === editing.id ? form : r)));
    } else {
      const next = { ...form, id: data.length ? Math.max(...data.map(r => r.id)) + 1 : 1 };
      setData((d) => [...d, next]);
    }
    toggleModal();
  };

  const deleteRecord = (record) => {
    if (window.confirm(`Eliminar usuario ${record.nombre}?`)) {
      setData((d) => d.filter((r) => r.id !== record.id));
    }
  };

  return (
    <Container className="mt-4 ai-crud">
      <h2 className="text-center mb-3">AI‑managed Usuarios</h2>
      <Button color="info" onClick={openNew} className="mb-2">
        {""}
        {editing ? "Editar" : "Agregar"} usuario
      </Button>

      <Table bordered striped hover>
        <thead className="table-secondary">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Género</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre} {u.apellidos}</td>
              <td>{u.correo}</td>
              <td>{u.genero}</td>
              <td className="text-center">
                <Button size="sm" color="warning" onClick={() => openEdit(u)} className="me-1">
                  Editar
                </Button>
                <Button size="sm" color="danger" onClick={() => deleteRecord(u)}>
                  Borrar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          {editing ? "Editar usuario" : "Nuevo usuario"}
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Nombre</label>
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className="form-control"
            />
          </FormGroup>
          <FormGroup>
            <label>Apellidos</label>
            <input
              name="apellidos"
              value={form.apellidos}
              onChange={handleChange}
              className="form-control"
            />
          </FormGroup>
          <FormGroup>
            <label>Correo</label>
            <input
              name="correo"
              type="email"
              value={form.correo}
              onChange={handleChange}
              className="form-control"
            />
          </FormGroup>
          <FormGroup>
            <label>Género</label>
            <select
              name="genero"
              value={form.genero}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">Seleccione…</option>
              <option>Masculino</option>
              <option>Femenino</option>
              <option>Otro</option>
            </select>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={saveRecord}>
            Guardar
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}

export default UsersCrud;
