import styles from "./Project.module.css";
import Loading from "../layout/Loading";
import Container from "../layout/Container";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Project() {
  const { id } = useParams();

  const [project, setProject] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "appliction/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProject(data);
        })
        .catch((err) => console.log(err));
    }, 3000);
  }, [id]);

  function toggleProjectForm() {
    setShowProjectForm = !showProjectForm;
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            <div className={styles.details_container}>
              <h1>Projeto: {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? "Editar Projeto" : "Fechar"}
              </button>
              {!showProjectForm ? (
                <div className={styles.project_info}>
                  <p>
                      <span>Categoria: </span> {project.category.name}
                  </p>
                  <p>
                      <span>Total de Orçamento: </span> R$ {project.budget}
                  </p>
                  <p>
                      <span>Total utilizado: </span> R$ {project.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <p>formulario do projeto</p>
                </div>
              )}
            </div>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Project;
