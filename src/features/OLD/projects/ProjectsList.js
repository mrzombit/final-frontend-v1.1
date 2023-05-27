import { useSelector } from "react-redux";
import { selectAllProjects } from "./projectsSlice";
import TimeAgo from "./TimeAgo";
import ProjectCard from "../../../components/projects/projectCard/projectCard";


const ProjectsList = () => {
    const projects = useSelector(selectAllProjects)

    const orderedPojects = projects.slice().sort((a, b) => b.date.localeCompare(a.date))

    const renderedPojects = orderedPojects.map(project => (
        <ProjectCard name={project.name} lastEdit={<TimeAgo timestamp={project.modified_date}/>} />
    ))

    return (
        <section>
            {renderedPojects}
        </section>
    )
}
export default ProjectsList