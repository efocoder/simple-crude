import { useEffect, useState } from 'react';
import { GET, POST } from './util/request';

const empType: any[] = [];

function App() {
	const [employees, setEmployee] = useState(empType);
	const [name, setName] = useState('');
	const [age, setAge] = useState('');
	const [position, setPosition] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			const resp = await GET('/employees');
			if (resp.status === 200) {
				setEmployee(resp.data.data);
			}
		};

		fetchData();
	}, []);

	const submitForm = async (e: any) => {
		e.preventDefault();
		const data = {
			name: name,
			age: age,
			position: position,
		};
		const resp = await POST('/employees', data);
		if (resp.status === 201) {
			setName('');
			setAge('');
			setPosition('');
			employees.push(resp.data.data);
		}
	};

	return (
		<div className="container">
			<div className="row justify-content-center mt-5">
				<div className="col-md-8">
					<div className="row justify-conetent-center mb-5">
						<div className="col-md-4">
							<form onSubmit={submitForm}>
								<div className="form-group mb-3">
									<input
										type="text"
										required
										placeholder="Name"
										className="form-control"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
                  
								</div>
								<div className="form-group mb-3">
									<input
										type="number"
										required
										min={1}
										placeholder="Age"
										className="form-control"
										value={age}
										onChange={(e) => setAge(e.target.value)}
									/>
								</div>
								<div className="form-group mb-3">
									<input
										type="text"
										required
										placeholder="Position"
										className="form-control"
										value={position}
										onChange={(e) => setPosition(e.target.value)}
									/>
								</div>

								<div className="form-group mb-3">
									<button className="btn btn-primary form-control">
										Submit
									</button>
								</div>
							</form>
						</div>
					</div>
					<table className="table table-striped table-">
						<thead>
							<th>#</th>
							<th>Name</th>
							<th>Age</th>
							<th>Position</th>
							<th>Date Created</th>
						</thead>
						<tbody>
							{employees.map((employee: any, index: number) => {
								return (
									<tr key={index}>
										<td>{index + 1}</td>
										<td>{employee.name}</td>
										<td>{employee.age}</td>
										<td>{employee.position}</td>
										<td>{employee.createdAt}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default App;
