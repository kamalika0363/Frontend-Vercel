import { db } from '@/lib/db';
import Link from 'next/link';
import {Simplify} from "kysely";
import {ExtractTableAlias} from "kysely/dist/cjs/parser/table-parser";
import {DB} from "kysely-codegen";
import {AllSelection} from "kysely/dist/cjs/parser/select-parser";


export default async function Page() {
    const franchises: Simplify<{} & AllSelection<DB, ExtractTableAlias<DB, "franchise">>>[] = await db
        .selectFrom('franchise')
        .selectAll()
        .execute();

    const franchisees: Simplify<{} & AllSelection<DB, ExtractTableAlias<DB, "franchisee">>>[] = await db
        .selectFrom('franchisee')
        .selectAll()
        .execute();

    return (
        <div className="flex flex-col">
            <h1 className="text-3xl font-bold mb-4">Franchises</h1>
            <div className="mb-4">
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

            <h1 className="text-3xl font-bold mb-4">Franchisees</h1>
            <div>
                {franchisees.map(franchisee => (
                    <div key={franchisee.franchiseeId} className="mb-2">
                        <Link href={`/franchisee/${franchisee.franchiseeId}`}>
                            <div className="text-lg text-blue-600 hover:underline">
                                {franchisee.franchiseeName}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
