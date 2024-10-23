import { Metadata } from "next";
import { db } from "@/lib/db";

interface Props {
    params: {
        id: string;
    };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const franchise = await db
        .selectFrom('franchise')
        .selectAll()
        .where('franchiseId', '=', parseInt(params.id))
        .executeTakeFirst()
        .catch((error) => {
            console.error('Error fetching franchise:', error);
            return null;
        });

    return { title: `Franchise profile of ${franchise?.franchiseName}` };
}

export default async function FranchiseProfile({ params }: Props) {
    const franchise = await db
        .selectFrom('franchise')
        .selectAll()
        .where('franchiseId', '=', parseInt(params.id))
        .executeTakeFirst()
        .catch((error) => {
            console.error('Error fetching franchise:', error);
            return null;
        });

    if (!franchise) {
        return <div>Franchise not found.</div>;
    }

    const {
        franchiseName,
        headquartersAddress,
        phoneNumber,
        createdAt,
        updatedAt
    } = franchise;

    return (
        <div>
            <h1 className='text-3xl font-medium mb-2'>{franchiseName}</h1>
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