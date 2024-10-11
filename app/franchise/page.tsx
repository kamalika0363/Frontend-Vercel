import { db } from '@/lib/db';
import Link from 'next/link';
import {Simplify} from "kysely";
import {AllSelection} from "kysely/dist/cjs/parser/select-parser";
import {ExtractTableAlias} from "kysely/dist/cjs/parser/table-parser";
import {DB} from "kysely-codegen";

export default async function FranchiseList() {
    const franchises: Simplify<{} & AllSelection<DB, ExtractTableAlias<DB, "franchise">>>[] = await db
        .selectFrom('franchise')
        .selectAll()
        .execute();

    return (
        <div className="flex flex-col px-24">
            <h1 className="text-3xl font-bold mb-4">Franchise List</h1>
            <div>
                {franchises.map(franchise => (
                    <div key={franchise.franchiseId} className="mb-2">
                        <Link href={`/franchise/${franchise.franchiseId}`}>
                            <div className="text-lg text-blue-600 hover:underline">
                                {franchise.franchiseName}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
