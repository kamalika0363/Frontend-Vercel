import {db} from '@/lib/db';
import {Metadata} from 'next';
import Image from 'next/image';
import {Franchise} from "@/lib/kysely-types";

interface Props {
    params: {
        id: string;
    };
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const franchise: Franchise = await db
        .selectFrom('franchise')
        .selectAll()
        .where('franchiseId', '=', params.id)
        .executeTakeFirst()
        .catch((error) => {
            console.error('Error fetching franchise:', error);
            return null;
        });

    return {title: `Franchise profile of ${franchise?.franchiseName}`};
}

export default async function FranchiseProfile({params}: Props) {
    const franchise: Franchise = await db
        .selectFrom('franchise')
        .selectAll()
        .where('franchiseId', '=', params.id)
        .executeTakeFirst()
        .catch((error) => {
            console.error('Error fetching franchise:', error);
            return null;
        });

    if (!franchise) {
        return <div>Franchise not found.</div>;
    }

    const {franchiseName, description, image, franchiseId, headquartersAddress, phoneNumber} = franchise;

    return (
        <div>
            <h1 className='text-3xl font-medium mb-2'>{franchiseName}</h1>
            <Image
                className='rounded-full'
                width={100}
                height={200}
                src={image ?? 'https://loremflickr.com/640/360'}
                alt={`Profile picture of ${franchiseName}`}
            />

            <h3 className='text-2xl mt-2 mb-1'>Description</h3>
            <p>{description ?? 'No description available.'}</p>
            <div>{headquartersAddress}</div>
            <div>{phoneNumber}</div>

            <button targetUserId={franchiseId!}/>
        </div>
    );
}
