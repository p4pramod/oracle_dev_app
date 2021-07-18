import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


function TaskMgmt(props) {

    const [showAddTaskSection, setShowAddTaskSection] = useState(true);
    const [taskDesc, setTaskDesc] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [task, setTask] = useState({});


    async function fetchUserData(id) {
        const response = await fetch("http://localhost:3004/task/1");
        const data = await response.json();
        Object.keys(data.tasks).forEach(key => setTask(prevTask => {
            return {
                ...prevTask,
                [key]: {
                    taskDedscription: data.tasks[key].taskDedscription,
                    date: data.tasks[key].taskDate,
                    done: data.tasks[key].done
                }
            }
        }));

    }

    useEffect(() => {
        fetchUserData(props.id);
    }, [props.id]);

    const addTask = () => {
        if (taskDesc !== '' && taskDate !== "") {
            const k = uuidv4();
            setTask({ ...task, [k]: { taskDedscription: taskDesc, date: taskDate, done: false } });
            setTaskDesc('');
            setTaskDate('');
        }
    }

    const getActiveTask = () => {
        return Object.keys(task).filter((key) => !task[key].done);
    };

    const updateTask = (event, key) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setTask({ ...task, [key]: { ...task[key], done: value } });
        setShowAddTaskSection(false);
    };

    return (
        <Container fluid className="task-mgmt">
            <Row>
                <Row>
                    <Col></Col>
                    <Col><h2> Tasker</h2>
                        <Row className="header" >
                            <Col></Col>
                            <Col md="2">{!showAddTaskSection && <Button variant="primary" onClick={() => setShowAddTaskSection(true)}><i class="bi bi-plus-lg"></i></Button>}
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                {showAddTaskSection &&
                    <Row>
                        <Col></Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Add Task</Card.Title>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control type="text" placeholder="Description" value={taskDesc} onChange={(event) => setTaskDesc(event.target.value)} />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Date</Form.Label>
                                            <Form.Control type="text" placeholder="Date" value={taskDate} onChange={(event) => setTaskDate(event.target.value)} />
                                        </Form.Group>
                                        <Button variant="primary" onClick={addTask} >
                                            Save
                                    </Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col></Col>
                    </Row>
                }
                {getActiveTask().length === 0 && <Row className="top-10px-spacer">
                    <Col></Col>
                    <Col>  <Card>
                        <Card.Body>
                            No Task
                        </Card.Body>
                    </Card>
                    </Col>
                    <Col></Col>
                </Row>}
                {getActiveTask().length > 0 &&
                    <Row className="top-10px-spacer" >
                        <Col></Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    {getActiveTask().map((key) => {
                                        return (<Card className="bottom-10px-spacer" key={key}>
                                            <Card.Body>
                                                <Row>
                                                    <Col>
                                                        <Card.Title>{task[key].taskDedscription}</Card.Title>
                                                        <Card.Text>{task[key].date}</Card.Text></Col>
                                                    <Col></Col>
                                                    <Col md="1">
                                                        <Form.Check className="checkbox-margin" type="checkbox" checked={task[key].done}
                                                            id={key}
                                                            onChange={(event) => updateTask(event, key)} />
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                        )
                                    })
                                    }
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col></Col>
                    </Row>
                }
            </Row>
        </Container >
    );

}

export default TaskMgmt;