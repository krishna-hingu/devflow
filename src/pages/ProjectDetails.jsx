import { useParams } from "react-router-dom";
function ProjectDetails() {
    const {projectId} = useParams()
    return (
        <>
            <h1>URL: /projects/{projectId}</h1>
            <h2>Project Details Page</h2>
            <p>Project ID: {projectId}</p>
        </>
    )
}
export default ProjectDetails;