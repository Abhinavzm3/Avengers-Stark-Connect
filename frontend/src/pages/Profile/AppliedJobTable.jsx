import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Popover,PopoverContent,PopoverTrigger } from '@radix-ui/react-popover';
import Chat from '../messenger/ChatRecruiter';
import store from '@/redux/store';
import axios from 'axios';
import { USER_API_END_POINT } from '@/lib/utils/constant';
const AppliedJobTable = () => {
    const {user}=useSelector((store)=>store.auth)
   
    const [recriter,setRec]=useState('')

    const getrec=async(id)=>{
        try {
            const res=await axios.post(`${USER_API_END_POINT}/getuser`,{id})
            setRec(res.data.user.fullname)
            
        } catch (error) {
    
            console.log(error)
            
        }
    }

  
   
    const {allAppliedJobs} = useSelector(store=>store.job);
    return (
        <div>
            <Table>
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Chat</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length <= 0 ? <span>You haven't applied any job yet.</span> : allAppliedJobs.map((appliedJob) => (
                            appliedJob?.job && (
                            <TableRow key={appliedJob._id}>

                                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell>{appliedJob.job?.title}</TableCell>
                                <TableCell>{appliedJob.job?.company?.name}</TableCell>
                                <TableCell>   <Popover >
                    <PopoverTrigger>
                      
                    <button  onClick={()=>{
                        getrec(appliedJob.job?.created_by)
                    }} className="border-fuchsia-700 border-2 rounded-full p-1"
                  
                  >Message</button>
                      
                    </PopoverTrigger>
                    <PopoverContent className="w-96 p-6  absolute left-1/2 transform -translate-x-96 top-1/2 -translate-y-3/4  shadow-lg rounded-lg z-50 items-center">
                     <Chat sen={user.fullname} rec={recriter} ></Chat>
                    </PopoverContent>
                  </Popover></TableCell>
                                <TableCell className="text-right"><Badge className={`${appliedJob?.status === "rejected" ? 'bg-red-400' : appliedJob.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>{appliedJob.status.toUpperCase()}</Badge></TableCell>
                            </TableRow>)
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable