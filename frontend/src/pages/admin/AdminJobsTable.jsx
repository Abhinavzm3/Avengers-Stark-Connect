
import React, { useEffect, useState } from 'react'
import { Trash } from 'lucide-react'
import { AwardIcon, Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/lib/utils/constant'

const AdminJobsTable = () => { 
    const {allAdminJobs, searchJobByText} = useSelector(store=>store.job);

    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(()=>{ 
        console.log('called');
        const filteredJobs = allAdminJobs.filter((job)=>{
            if(!searchJobByText){
                return true;
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());

        });
        setFilterJobs(filteredJobs);
    },[allAdminJobs,searchJobByText])
    
 


    const deleteHandler=async(jobId)=>{
try {

    const response=await axios.post(`${JOB_API_END_POINT}/delete`,{jobId:jobId},{
        headers: {
            'Content-Type':'application/json' 
        },
        withCredentials: true
    })
    
setFilterJobs(response.data.data)

console.log(response.data.data)
} catch (error) {
    
    console.log(error)
}

}


    return (
        <div>
            <Table>
                <TableCaption>A list of your recent  posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs?.map((job) => (
                            <tr key={job._id}>
                                <TableCell>{job?.company?.name}</TableCell>
                                <TableCell>{job?.title}</TableCell>
                                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div onClick={()=> navigate(`/admin/companies/${job._id}`)} className='flex items-center gap-2 w-fit cursor-pointer  hover:text-amber-600'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>

                                            <div onClick={()=>{
                                                deleteHandler(job._id)
                                            }} className='flex items-center gap-2 w-fit cursor-pointer hover:text-amber-600'>
                                                <Trash className='w-4' />
                                                <span>Delete</span>
                                            </div>
                                            <div onClick={()=> navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2  hover:text-amber-600'>
                                                <Eye className='w-4'/>
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>

                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable
