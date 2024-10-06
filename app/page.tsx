import {db} from "@/lib/db";
import {Franchise, DB} from "@/lib/kysely-types"; // Adjust the path as necessary

export default async function Home() {

    const franchise: Franchise[] = await db
        .selectFrom("franchise")
        .selectAll()
        .execute();

    console.log(franchise);
}

Home();
