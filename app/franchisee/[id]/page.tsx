import {db} from "@/lib/db";
import {Metadata} from "next";

interface Props{
    params:{
        id:string;
    };
}

export async function generateMetadata({params}:Props):Promise<Metadata>{
    const franchisee = await db
        .selectFrom('franchisee')
        .selectAll()
        .where('franchiseeId', '=', parseInt(params.id))
        .executeTakeFirst()
        .catch((error)=>{
            console.error('Error fetching franchisee:', error);
            return null;
        });

    return {title: `Franchisee profile of ${franchisee?.franchiseeName}`};
}

export default async function FranchiseeProfile({params}:Props){
    const franchisee = await db
        .selectFrom('franchisee')
        .selectAll()
        .where('franchiseeId', '=', parseInt(params.id))
        .executeTakeFirst()
        .catch((error)=>{
            console.error('Error fetching franchisee:', error);
            return null;
        });

    if(!franchisee){
        return <div>Franchisee not found.</div>;
    }

    const {
        franchiseeName,
        headquartersAddress,
        phoneNumber,
        updatedAt
    } = franchisee;

    return (
        <div>
            <h1 className='text-3xl font-medium mb-2'>{franchiseeName}</h1>
            <h3 className='text-2xl mt-2 mb-1'>Details</h3>
            <div>
                <strong>Headquarters Address:</strong> {headquartersAddress ?? 'N/A'}
            </div>
            <div>
                <strong>Phone Number:</strong> {phoneNumber ?? 'N/A'}
            </div>
        </div>
    );
}