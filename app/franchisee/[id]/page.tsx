import {db} from '@/lib/db';
import {Metadata} from 'next';
import {DB} from "kysely-codegen";
import {Franchisee} from "@/lib/kysely-types";

interface Props {
    params: {
        id: string;
    };
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const franchisee: Franchisee = await db
        .selectFrom('franchisee')
        .selectAll()
        .where('franchiseeId', '=', params.id)
        .executeTakeFirst()
        .catch((error) => {
            console.error('Error fetching franchisee:', error);
            return null;
        });

    return {title: `Franchisee profile of ${franchisee?.franchiseeName}`};
}

export default async function FranchiseeProfile({params}: Props) {
    const franchisee: Franchisee = await db
        .selectFrom('franchisee')
        .selectAll()
        .where('franchiseeId', '=', params.id)
        .executeTakeFirst()
        .catch((error) => {
            console.error('Error fetching franchisee:', error);
            return null;
        });

    if (!franchisee) {
        return <div>Franchisee not found.</div>;
    }

    const {
        franchiseeName,
        franchiseId,
        headquartersAddress,
        phoneNumber,
        createdAt,
        updatedAt
    } = franchisee;

    return (
        <div>
            <h1 className='text-3xl font-medium mb-2'>{franchiseeName}</h1>
            <h3 className='text-2xl mt-2 mb-1'>Details</h3>
            <div>
                <strong>Franchise ID:</strong> {franchiseId ?? 'N/A'}
            </div>
            <div>
                <strong>Headquarters Address:</strong> {headquartersAddress ?? 'N/A'}
            </div>
            <div>
                <strong>Phone Number:</strong> {phoneNumber ?? 'N/A'}
            </div>
            <div>
                <strong>Created At:</strong> {createdAt?.toString() ?? 'N/A'}
            </div>
            <div>
                <strong>Updated At:</strong> {updatedAt?.toString() ?? 'N/A'}
            </div>
        </div>
    );
}
