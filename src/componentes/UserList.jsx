import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'

const UserList = () => {
    const [usuarios, setUsuarios] = useState([])
    const [form, setForm] = useState({})

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const getusuarios = () => {
        axios.get(`http://localhost:3000/usuarios`)
            .then(response => setUsuarios(response.data))
            .catch(error => console.error(error))
    }

    const postusuarios = () => {
        axios.post('http://localhost:3000/usuarios', form)
            .then((response) => setForm(response))
            .catch((error) => console.log(error))
    }

    const eliminar = (id) => {
        axios.delete(`http://localhost:3000/usuarios/${form.id}`)
            .then((response) => console.log(response))
            .catch((error) => console.log(error))
    }

    const editar = () => {
        axios.put(`http://localhost:3000/usuarios/${form.id}`, form)
            .then((response) => console.log(response))
            .catch((error) => console.log(error))
    }

    useEffect(() => { getusuarios() }, [])

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <th scope="row">{usuario.name}</th>
                            <td>{usuario.email}</td>
                            <td><button onClick={() => eliminar(usuario.id)}>Eliminar</button></td>
                            <td><button onClick={() => editar(usuario.id)}>Editar</button></td>
                        </tr>

                    ))
                    }
                </tbody>
            </table>

            <form>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    placeholder="Nombre"
                />
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                />
                <button type="submit" onClick={postusuarios}>Crear</button>
            </form>

        </div>
    )
}

export default UserList
