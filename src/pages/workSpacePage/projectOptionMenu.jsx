import React from 'react'
import { useDispatch } from 'react-redux'
import { addNewProject, deleteProjectById } from '../../features/projectsSlice'
import './workSpacePage.css'

const ProjectOptionMenu = (props) => {
    const dispatch = useDispatch()
    // const navigate = useNavigate()

    const duplicateProject = (data) => {
        const projectShallow = {
            user_id: data.user_id,
            name: `${data.name} (คัดลอก)`,
            industry_ids: data.industry_ids,
            description: data.description,
            logo_url: data.logo_url,
            created_date: data.created_date,
            modified_date: data.modified_date,
            sale_trends: data.sale_trends,
            business_goals: data.business_goals,
            model_config: data.model_config,
            revenue: data.revenue,
            expense: data.expense,
            miscellaneous: data.miscellaneous
        }
        dispatch(addNewProject(projectShallow))
        props.setProjectOptionState(false)
    }

    const deleteProject = (id) => {
        dispatch(deleteProjectById(id))
        props.setProjectOptionState(false)
    }


    return (
        <div className=''>
            <div className='project-option-top-style'>
                <div className='project-option-style' onClick={() => duplicateProject(props.projectData)}>สร้างโปรเจกก็อปปี้</div>
            </div>
            <div className='delete-project-footer-style'>
                <div className=' delete-project-style' onClick={() => deleteProject(props.projectData._id)}> ลบโปรเจก</div>
            </div>

        </div>
    )
}

export default ProjectOptionMenu