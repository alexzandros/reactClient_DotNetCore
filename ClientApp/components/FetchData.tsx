import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

interface consumirDatosEstudiantes {
    estudiantes: Estudiante[];
    loading: boolean;
}

export class FetchData extends React.Component<RouteComponentProps<{}>, consumirDatosEstudiantes> {
    constructor() {
        super();
        this.state = { estudiantes: [], loading: true };

        fetch('http://localhost:5823/api/Estudiante/listado')
            .then(response => response.json() as Promise<Estudiante[]>)
            .then(data => {
                this.setState({ estudiantes: data, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchData.renderTablaEstudiantes(this.state.estudiantes);

        return <div>
            <h1>Lista estudiantes</h1>
            <p>This component demonstrates fetching data from the server.</p>
            { contents }
        </div>;
    }

    private static renderTablaEstudiantes(estudiantes: Estudiante[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Crédito</th>
                    <th>Beca</th>
                    <th>Tipo de Pago</th>
                </tr>
            </thead>
            <tbody>
            {estudiantes.map(estudiante =>
                <tr key={ estudiante.nombre }>
                    <td>{ estudiante.nombre }</td>
                    <td>{ estudiante.apellido }</td>
                    <td>{ estudiante.credito }</td>
                    <td>{ estudiante.beca }</td>
                    <td>{ estudiante.tipopago }</td>
                </tr>
            )}
            </tbody>
        </table>;
    }
}

interface Estudiante {
    nombre: string;
    apellido: number;
    beca: boolean;
    credito: string;
    tipopago: string;
}
